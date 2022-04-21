const express = require("express");
const usersRouter = express.Router();
const { User } = require("../db");
const { createUser, getAllUsers, getUserById, getUser } = User;
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const authorizeUser = require("./utils");

// POST /users/register
//admins will not be created in this route currently
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, isAdmin } = req.body;

    const user = await createUser({ username, password, isAdmin });

    //gonna try adding token to see if that fixes the problem...?
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET
    );

    console.log("You've been registered!:", { user, token, isAdmin });

    res.send({ user, token, isAdmin });
    // res.send({ token });
  } catch (error) {
    next(error);
  }
});
// usersRouter.post("/register", async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await createUser({ email, password });

//     //gonna try adding token to see if that fixes the problem...?
//     const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

//     console.log({ user, token });

//     res.send({ user, token });
//     // res.send({ token });
//   } catch (error) {
//     next(error);
//   }
// });

//POST /users/login
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log("usersRouter.post/login sees:", email, password);

    //getUser already checks for password match
    const user = await getUser(email, password);

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

    console.log("You're logged in!", { user, token });

    res.send({ user, token, isAdmin });
  } catch (error) {
    next(error);
  }
});

// GET /users/me
usersRouter.get("/me", authorizeUser, async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);

    res.send(user);
  } catch (error) {
    next(error);
  }
});

//GET /users/:username/orders
// usersRouter.get("/:username/orders", async (req, res, next) => {
//   try {
//     // lets check the authorization headers
//     // for a token
//     const auth = req.header("Authorization");
//     const token = auth.split(" ")[1];
//     let routines;

//     // then, lets verify the token with jwt.verify()
//     // and get access to the user's username
//     const { username } = jwt.verify(token, JWT_SECRET);

//     // then, we can compare the username to the username on this route
//     // if they match, we'll return getAllRoutinesByUser()
//     // if they don't match, we'll return the public routines only
//     if (username === req.params.username) {
//       routines = await getAllRoutinesByUser({
//         username: req.params.username,
//       });
//     } else {
//       routines = await getPublicRoutinesByUser({
//         username: req.params.username,
//       });
//     }

//     res.send(routines);
//   } catch (error) {
//     next(error);
//   }
// });

//GET /users
///////////////////////may need to add "authorizeAdmin" here because no one else but the admin should be able to see this
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;

//curl requests for testing
//registering
// curl http://localhost:4000/api/users/register -X POST -H 'Content-Type:application/json' -d '{"email":"luckbringer@gmail.com","password":"griffin"}' // :) ... but does give a small error with "secretOrPrivateKey" being undefined

//get all users
// curl http://localhost:4000/api/users -X GET  // :)

//logging in
// curl http://localhost:4000/api/users/login -X POST -H 'Content-Type:application/json' -d '{"email":"luckbringer@gmail.com","password":"griffin"}'  // :) ... but does give a small error with "secretOrPrivateKey" being undefined

//get specific user's information
// curl http://localhost:4000/api/users/me -X GET -H 'Content-Type:application/json, Authorization:Bearer ${token}'
