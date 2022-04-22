import React, { useState, useEffect } from "react";
import {token} from "./AuthContext"


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
