import React from "react";
import { useUsersList } from "../custom-hooks";
// import { useAuth } from "../custom-hooks";
// import jwt_decode from "jwt-decode";

//The profile will show the admin every user on the site. Create/Edit/Delete Post functionality will happen on each product's card.

export default function AdminProfile() {
  const { users } = useUsersList();
  // const { token } = useAuth();
  // const userEmail = jwt_decode(token).email;

  return (
    <section>
      <div>Welcome to your profile, admin!</div>

      <section className="listOfAllUsers">
        {users &&
          users.map((user) => {
            const { id, email } = user;

            return (
              <div className="eachUserInList" key={id}>
                <h3>User #{id}</h3>
                <p>Email: {email}</p>
              </div>
            );
          })}
      </section>
    </section>
  );
}
