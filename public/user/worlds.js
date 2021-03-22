/*
  onAuthStateChanged(user)
  Observer for Authentication State:
  If the user is logged in and an admin, then the table of all users
  in the system will be populated. Otherwise, go back to the user dashboard
  or back to the login screen if not authenticated
*/

firebase.auth().onAuthStateChanged(async function (user) {
    // If user is not signed in
    if(!user)
    {
      console.log("You are not signed in.");
      window.location = "/login.html";
    }
    else // User is signed in 
    {

      let ratingRef = firebase.firestore().collection('users').doc(user.uid).collection("ratings").doc("RatingTotals");
      let docSnapshot = await ratingRef.get();
      
      var total = 0;

      if (docSnapshot.exists)
        total = docSnapshot.get("cumulativeTotal");
      
      $("#stars").text(function () {
        return $(this).text().replace("...", total); 
      });
    }
});