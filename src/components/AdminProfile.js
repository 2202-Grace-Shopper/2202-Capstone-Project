import React from "react";
import { useUsersList } from "../custom-hooks";

//The profile will show the admin every user on the site. Create/Edit/Delete Post functionality will happen on each product's card.

export default function AdminProfile() {
  const { users } = useUsersList();
  let show = false;

  async function clickShowPassword() {
    show = show !== true;
    console.log(show);
  }

  return (
    <section>
      <div>Welcome to your profile, admin!</div>
      {/* <div>Welcome to your profile, admin {user.email}</div>; */}

      <section className="listOfAllUsers">
        {users &&
          users.map((user) => {
            const { id, email, password } = user;

            return (
              <div className="eachUserInList" key={id}>
                <h3>User #{id}</h3>
                <p>Email: {email}</p>
                <p>Password: {show ? password : "********"}</p>
                <input type="checkbox" onClick={clickShowPassword} />
                Show Password
              </div>
            );
          })}
      </section>
    </section>
  );
}
