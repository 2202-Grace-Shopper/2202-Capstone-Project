import React, { useState, useEffect } from "react";
import {token} from "./AuthContext"

//we want to have hook that will let us check if the user is an admin or not
//this will take in a user and check the boolean of isAdmin:
//if true, it will give admin access
//if false, it will let user know that they do not have access

function checkIsAdmin(user) {
    const [userInfo, setUserInfo] = useState({});
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
      try {
        const response = await fetch(`http://localhost:4000/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setUserInfo(data);
      } catch (err) {
        console.error(err);
      }
    }
  );
}
