import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useAuth } from "../custom-hooks";

//The profile will hold basic user information on the left. On the right, it'll have a list of orders the user has made. Each order will show the products "inside" them, the total price paid, the total quantity of items and when the order was placed.

export default function Profile() {
  const [profile, setProfile] = useState({});
  // const [orders, setOrders] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`http://localhost:4000/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, [token]);

  // useEffect(() => {
  //   async function fetchOrders() {
  //     try {
  //       const response = await fetch(`http://localhost:4000/api/orders`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const data = await response.json();
  //       setOrders(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   fetchOrders();
  // }, [token]);

  return (
    <section>
      <h2>Welcome to your profile, {profile.email}</h2>
      <div>
        Unfortunately, there isn't much here yet! This area is still under
        construction.
      </div>
      <div>Please come back another time to view your profile page :)</div>
    </section>
  );

  // return <div>Welcome to your profile!</div>;
}
