// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function logIn(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  window.location = "home.html";
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user.email);
  console.log(user.displayName);
  window.console.log(user);

  //var details = document.getElementById("details");
  //details.innerHTML = user.displayName;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}

function loginWithEmail(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logOut(){
  //firebase.auth().signOut();
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  window.location = "index.html";
  console.log("Signed out");
}).catch(function(error) {
  // An error happened.
});
}

function getDetails(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;

      if(user != null){
        console.log("Signed In");
        var email_id = user.email;
        var name = user.displayName;
        document.getElementById("details").innerHTML = "Welcome User : " + name;
      }

    } else {
      // No user is signed in.
      window.location = "index.html";
      console.log("Not signed in");
    }
  });
}
