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
      
      var worldTotal = 0;

      if (docSnapshot.exists)
        worldTotal = docSnapshot.get("world2Total");
      
      $("#stars").text(function () {
        return $(this).text().replace("...", worldTotal); 
      });
    }
});