const express = require("express");
const usersRouter = express.Router();
const { createUser, getAllUsers, getUserById, getUser } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const authorizeUser = require("./utils");

//POST /users/register
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await createUser({ username, password });

    //gonna try adding token to see if that fixes the problem...?
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET
    );

    // console.log({ user, token });

    res.send({ user, token });
    // res.send({ token });
  } catch (error) {
    next(error);
  }
});

//POST /users/login
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //getUser already checks for password match
    const user = await getUser({ username, password });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET
    );

    res.send({ user, token });
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

//GET /users/:username/routines
usersRouter.get("/:username/routines", async (req, res, next) => {
  try {
    // lets check the authorization headers
    // for a token
    const auth = req.header("Authorization");
    const token = auth.split(" ")[1];
    let routines;

    // then, lets verify the token with jwt.verify()
    // and get access to the user's username
    const { username } = jwt.verify(token, JWT_SECRET);

    // then, we can compare the username to the username on this route
    // if they match, we'll return getAllRoutinesByUser()
    // if they don't match, we'll return the public routines only
    if (username === req.params.username) {
      routines = await getAllRoutinesByUser({
        username: req.params.username,
      });
    } else {
      routines = await getPublicRoutinesByUser({
        username: req.params.username,
      });
    }

    res.send(routines);
  } catch (error) {
    next(error);
  }
});

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
