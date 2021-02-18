import { getUsers } from "/Data.js";

/*
  onAuthStateChanged(user)
  Observer for Authentication State:
  If the user is logged in and an admin, then the table of all users
  in the system will be populated. Otherwise, go back to the user dashboard
  or back to the login screen if not authenticated
*/

firebase.auth().onAuthStateChanged(user => {
    // If user is not signed in
    if(!user)
    {
      console.log("You are not signed in.");
      window.location = "/login.html";
    }
    });