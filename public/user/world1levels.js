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
        worldTotal = docSnapshot.get("world1Total");
        
      let lvlRatingRef = [];
      let docSnap = [];
      let numStars = [];

      for (let i = 0; i < 11; i++) {
        lvlRatingRef.push(firebase.firestore().collection('users').doc(user.uid).collection("highscores").doc("World1Level"+i));
        docSnap.push(await lvlRatingRef[i].get());
  
        if (docSnap[i].exists) {
          numStars.push(docSnap[i].get("rating"));
        }
      }


      $("#stars").text(function () {
        return $(this).text().replace("...", worldTotal); 
      });
      
      $(".stars").append(function () {
        let levelNum = $(this).attr('id').match(/\d+/)[0];
        let images = []
        
        for (let i = 0; i < 3; i++) {
          if (numStars[levelNum] !== undefined && i < numStars[levelNum]) {
            images.push("<img id='"+i+"' src='./game/assets/star.png'/>")
          } else {
            images.push("<img id='"+i+"' src='./game/assets/emptyStar.png'/>")
          }
        }
        return $(this).html(images[0] + images[1] + images[2])
      })
    }
});