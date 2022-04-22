import React, { useState } from "react";
import { useUsersList } from "../custom-hooks";

//The profile will show the admin every user on the site. Create/Edit/Delete Post functionality will happen on each product's card.

export default function AdminProfile() {
  const { users } = useUsersList();

  //   return <div>Welcome to your profile, admin {user.email}</div>;
  return (
    <section>
      <div>Welcome to your profile, admin!</div>

      <list className="listOfAllUsers">
        {users &&
          users.map((user) => {
            const { id, email } = user;

            return (
              <h3>
                User #{id} {email}
              </h3>
            );
          })}
      </list>
    </section>
  );
}
