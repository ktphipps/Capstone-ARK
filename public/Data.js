//File: /Data.js

//Description: Contains all the functions that interact with cloud firestore.

//Includes functions for creating sessions and assignments, and reading users, sessions, and assignments.

//TODO: Research more robust methods of querying firebase(pagination). Develop standard error responses to 'client'
'use strict';

var firestore = firebase.firestore();

//Function: createSession

//Input: string assignmentID: the label of assignment that launched this session. Value is 'Custom Session' if not launched from assignment

//       int bpm: beats per minute

//       int soundOn: time in seconds of game phase where sound was on

//       int soundOff: int,time in seconds of game phase where sound was off

//       int cycles: the amount of times the game cycled. 1 cycle = soundOn + soundOff, 2 cycles = soundOn + soundOff + soundOn + soundOff, etc

//       boolean feedback: true if feedback was enabled, false if not

//       string userID: the userID of the user who completed the session

//       array of TapObjects tapData: the array containing each TapObject in the session

//Output: returns the promise object

//Description: Creates new session upon completion of game. Stores tap objects as an array of TapObjects.
//Also updates the user document with the latest session time
function createSession(assignmentID, world, level, bpm, soundOn, soundOff, cycles, feedback, userID, tapData, score){

    // Create a batch
    var batch = firestore.batch();

    // Build the new session document
    let sessions = firestore.collection('sessions');
    let newSessionRef = sessions.doc()
    let docData = {
        assignmentID: assignmentID,
        world: world,
        level: level,
        parameters: {
            bpm: bpm,
            soundOnTime: soundOn,
            soundOffTime: soundOff,
            cycles: cycles,
            feedback: feedback,
        },
        userID: userID,
        sessionTime: firebase.firestore.Timestamp.now(),
        taps: tapData,
        score: score
    };
    batch.set(newSessionRef, docData);

    //Also update the latest session time in the users/<userID> document
    let userRef = firestore.collection("users").doc(userID);
    batch.update(userRef, {"latestSessionTime": docData.sessionTime})

    //Commit the batch
   return batch.commit().then(function(){
        console.log("New Session successfully written!");
    }).catch(function(error){  
        console.log("Error when writing session!");
    });
}

//Function: getSession

//Input: string sessionID, the id of the requested session document

//Output: returns sessionData, {id: the id of the session document, data: the contents of the session document}

//Description: Returns the requested session document
async function getSession(sessionID){

    var sessionData = {};
    //performs the actual firestore query
    async function getSessionData(sessionID){
        var returnData = {id: null};
        var docRef = firestore.collection("sessions").doc(sessionID);
        let promise = await docRef.get();

        if(promise.exists){
            returnData = {
                id: promise.id,
                data: promise.data()
            }
        }else{
            throw error("Requested session does not exist!");
        }
        return returnData;
    }

    //Calls getSessionData, handles any errors that may occur, returns sessionsData before exit
    try {
        sessionsData = await getSessionData(sessionID);
    } catch(err){
        alert("Unable to display Session!");
    } finally{
          return sessionsData;
    }

}

//Function: getAllSessionsForUser

//Input: string userID, the id of the user tied to the desired sessions

//Output: returns sessionsArray, {dataArray: [{id: the id of the session document, data: the contents of the session document}, {...}, {...}]}

//Description: Gets all sessions tied to passed userID, returns them in an object containing an array of sessions
async function getAllSessionsForUser(userID){

    var sessionsArray = {dataArray: null};

    async function getSessionData(userID){

        //Return data as an array of maps, where each item contains the docID and session data
        
        var returnData = {
            dataArray: []
        }

        var sessions = firestore.collection("sessions").orderBy("sessionTime", "desc");
        
        var query = sessions.where("userID", "==", userID);

        let promise = await query.get();
        for (const sess of promise.docs){
            returnData.dataArray.push(
                {
                    id: sess.id,
                    data: sess.data()
                }
            );
        }
        return returnData;
    }

    try {
        sessionsArray = await getSessionData(userID);
    } catch(err){
        alert("Unable to display Sessions!");
    } finally{
          return sessionsArray;
    }
}

//Function: getUser

//Input: string userID, the id of the requested user

//Output: returns userData = {id: user doc id, data: user doc data}

//Description: Returns the user document of the requested user
async function getUser(userID){

    var userData = {};
    async function getUserData(userID){
        var returnData = {id: null};
        var docRef = firestore.collection("users").doc(userID);
        let promise = await docRef.get();

        if(promise.exists){
            returnData = {
                id: promise.id,
                data: promise.data()
            }
        }else{
            throw error("Requested user does not exist!");
        }

        return returnData;
    }

    try {
        userData = await getUserData(userID);
    } catch(err){
        alert("Unable to display User!");
    } finally{
          return userData;
    }

}
//Function: getUsers

//Input: none

//Output: returns usersArray = {dataArray:[{id: user doc id, data: user doc data},{...},{...}]}

//Description: Returns all the users in the users collection

async function getUsers(){

    var usersArray = {dataArray: null};

    async function getUserData(){
        var users = firestore.collection("users");
        var returnData = {
            dataArray: []
        }
        let promise = await users.orderBy("userID").get();
        for (const user of promise.docs){
            returnData.dataArray.push(
                {
                    id: user.id,
                    data: user.data()
                }
            );
        }
        return returnData;
    }

    try {
        usersArray = await getUserData();
      }catch(err){
        alert("Unable to display Users!");
      }finally{
          return usersArray;
      }
}

//Function: createAssignment

//Input: string assignmentLabel: the name of the assignment

//       int bpm: beats per minute

//       int soundOn: time in seconds of game phase where sound was on

//       int soundOff: int,time in seconds of game phase where sound was off

//       int cycles: the amount of times the game cycled. 1 cycle = soundOn + soundOff, 2 cycles = soundOn + soundOff + soundOn + soundOff, etc

//       boolean feedback: true if feedback was enabled, false if not

//       boolean defaultAssignment: true if the assignment is a default assignment to be assigned to all users

//       string array userIDs: the list of users that are assigned this assignment

//Output: none

//Description: Creates new assignment for listed users based off of passed parameters

function createAssignment(assignmentLabel, bpm, soundOn, soundOff, cycles, feedback, defaultAssignment, userIDs ){
    let assignments = firestore.collection("assignments");
    let docData = {
        assignmentLabel: assignmentLabel,
        world: "N/A",
        level: "N/A",
        parameters: {
            bpm: bpm,
            soundOnTime: soundOn,
            soundOffTime: soundOff,
            cycles: cycles,
            feedback: feedback,
        },
        default: defaultAssignment,
        userIDs: userIDs,
    };
    assignments.add(docData).then(function(){
        alert("New Assignment successfully written!");
    }).catch(function(error) {
        alert("Unable to write new Assignment");
    });
}

//Function: getAssignmentsForUser

//Input: string userID, id of user that is tied to requested assignments

//Output: returns assignmentsArray = {dataArray:[{id: assignment doc id, data: assignment doc data},{...},{...}]}

//Description: Returns all the assignments for the passed userID

async function getAssignmentsForUser(userID){

    var assignmentsArray = {dataArray: null};

    async function getAssignmentData(userID){
        var returnData = {
            dataArray: []
        }
        var assignments = firestore.collection("assignments").orderBy("assignmentLabel");
        var userIdQuery = assignments.where("userIDs", "array-contains", userID);
        var defaultQuery = assignments.where("default", "==", true);

        let userIdPromise = await userIdQuery.get();

        for (const assign of userIdPromise.docs){
            returnData.dataArray.push(
                {
                    id: assign.id,
                    data: assign.data()
                }
            );
        }

        let defaultPromise = await defaultQuery.get();

        for(const assign of defaultPromise.docs) {
            if(!returnData.dataArray.includes(assign)){
                returnData.dataArray.push(
                    {
                        id: assign.id,
                        data:assign.data()
                    }
                )
            }
        }

        return returnData;
    }

    try {
        assignmentsArray = await getAssignmentData(userID);
    } catch(err){
        alert("Unable to display Assignments!");
    } finally{
          return assignmentsArray;
    }
}

async function getAllAssignments(){
  var assignmentsArray = {dataArray: null};

  async function getAssignmentData(){
      var returnData = {
          dataArray: []
      }
      var assignments = firestore.collection("assignments").orderBy("assignmentLabel");

      let promise = await assignments.get();

      for (const assign of promise.docs){
          returnData.dataArray.push(
              {
                  id: assign.id,
                  data: assign.data()
              }
          );
      }
      return returnData;
  }

  try {
      assignmentsArray = await getAssignmentData();
  } catch(err){
    alert("Unable to display Assignments!");
  } finally{
        return assignmentsArray;
  }

}

async function updateHighScoreForUser(userID, score, world, level) {

    // Create a batch
    var batch = firestore.batch();

    // Build the new score document
    let docName = 'World' + world + 'Level' + level;
    let highscoresRef = firestore.collection('users').doc(userID).collection('highscores').doc(docName);
    let docSnapshot = await highscoresRef.get();

    // If the recent score isn't a high score, don't save it
    if (docSnapshot.get("highScore") >= score) {
        console.log('Not a high score');
        return;
    }

    var rating = calculateRating(score);

    // Otherwise get ready to ship it to the database!
    batch.set(highscoresRef, {"highScore": score, "rating": rating})

    //Commit the batch
   return batch.commit().then(function(){
        console.log('Updated high score for World ' + world + ' Level ' + level);
    }).catch(function(error){  
        console.log("Error when updating high score!");
    });
}

function calculateRating(score) {
    const THREE_STAR_SCORE = 85;
    const TWO_STAR_SCORE = 70;
    const ONE_STAR_SCORE = 55;

    var stars = 0;

    if (score >= THREE_STAR_SCORE)
        stars = 3;
    else if (score >= TWO_STAR_SCORE)
        stars = 2;
    else if (score >= ONE_STAR_SCORE)
        stars = 1;

    return stars;
}

async function updateRatingsForUser(userID) {
    var world1Total = 0; var world2Total = 0; var world3Total = 0;
    var world4Total = 0; var world5Total = 0; var world6Total = 0;
    var world7Total = 0; var world8Total = 0; var world9Total = 0;
      for (var w = 1; w <= 9; w++) {
          for (var l = 1; l <= 11; l++) {
              let docName = 'World' + w + 'Level' + l;
              let highscoresRef = firebase.firestore().collection('users').doc(userID).collection('highscores').doc(docName);
              let docSnapshot = await highscoresRef.get();
              
              var rating = docSnapshot.get("rating");
              if (rating == undefined)
                continue;
              if (w == 1)
                world1Total += rating;
              else if (w == 2)
                world2Total += rating;
              else if (w == 3)
                world3Total += rating;
              else if (w == 4)
                world4Total += rating;
              else if (w == 5)
                world5Total += rating;
              else if (w == 6)
                world6Total += rating;
              else if (w == 7)
                world7Total += rating;
              else if (w == 8)
                world8Total += rating;
              else
                world9Total += rating;
          }
      }

    var total = world1Total + world2Total + world3Total + world4Total + world5Total + world6Total + world7Total + world8Total + world9Total;

    firestore.collection('users').doc(userID).collection("ratings").doc("RatingTotals").set({
        "cumulativeTotal": total, 
        "world1Total": world1Total, 
        "world2Total": world2Total, 
        "world3Total": world3Total, 
        "world4Total": world4Total, 
        "world5Total": world5Total, 
        "world6Total": world6Total, 
        "world7Total": world7Total, 
        "world8Total": world8Total, 
        "world9Total": world9Total
    });
}


export {createAssignment, createSession, getAllSessionsForUser, getAssignmentsForUser, getUsers, getSession, getUser,
        getAllAssignments, updateHighScoreForUser, updateRatingsForUser}
