// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/**
 * Method to log in user with Google Sign On
 */
function logIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        window.location.href = "/home";
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        //var details = document.getElementById("details");
        //details.innerHTML = user.displayName;
        // ...
    }).catch(function (error) {
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

/**
 * Method to login for user with email and password
 */
function loginWithEmail() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert("Error : " + errorMessage);

        // ...
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.console.log(user);
            // User is signed in.

            //document.getElementById("user_div").style.display = "block";
            //ocument.getElementById("login_div").style.display = "none";

            var user = firebase.auth().currentUser;

            if (user != null) {
                window.location.href = "/home";
                var email_id = user.email;
                document.getElementById("details").innerHTML = email_id;

            }

        } else {
            // No user is signed in.
            //window.location = "index.html";
            //document.getElementById("user_div").style.display = "none";
            //document.getElementById("login_div").style.display = "block";

        }
    });


}

/**
 * Method to sign out the user
 */
function logOut() {
    //firebase.auth().signOut();
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location.href = "/";
        console.log("Signed out");
    }).catch(function (error) {
        // An error happened.
    });
}

/**
 * Method to get details of current user
 */
function getDetails() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var user = firebase.auth().currentUser;

            if (user != null) {
                var user_id = user.uid;
                var email_id = user.email;
                var name = user.displayName;
                document.getElementById("details").innerHTML = email_id;
                console.log(name);
                console.log(email_id);
                console.log("Signed In");
                readInbox(user_id);
                //        document.getElementsByTagName('body').style.cssText = 'display:block';
            }

        } else {
            // No user is signed in.
            window.location.href = "/";
            console.log("Not signed in");
        }
    });
}

/*function createUserTable(){
//Accessing current user
var user = firebase.auth().currentUser;
var user_id = user.uid;
var name = user.displayName;
var user_email = user.email;

//Storing data in firebase
firebase.database().ref('users/' + user_id).set({
username: name,
email: user_email,
filesUser: false,
totalfiles: 0
});
console.log("Data saved");
}*/

/**
 * Method to store data in firebase
 */
function writeUserData() {

    //Create user data
    //createUserTable();
    //Accessing current user
    var user = firebase.auth().currentUser;
    var user_id = user.uid;
    var name = user.displayName;
    var user_email = user.email;


    //var updatedTotalFileCount = totalFileCount + 1;
    //Storing Files table in firebase
    try {
        firebase.database().ref('users/' + user_id).set({
            username: name,
            email: user_email,
            filesUser: true,
            totalfiles: 1
        });
    } catch (err) {

    }

    //Finding whether user has saved any file or not
    var filesUser = userHasFile(user_id);

    //Finding tota no of files saved by user
    var totalFileCount = totalFilesCount(user_id);
    saveFileContents(user_id);

    //console.log(fileContentsValue);
}

/* Method to check whether user has any file save or not */
function userHasFile(user_id) {
    var fileContentsValue;
    var ref = firebase.database().ref('users/' + user_id);
    ref.once("value", function (snapshot) {
        console.log(snapshot.val());
        fileContentsValue = snapshot.val().filesUser;
        console.log(fileContentsValue);
    }, function (error) {
        console.log("Error: " + error.code);
    });
    if (fileContentsValue) {
        return true;
    } else {
        return false;
    }
}

/**
 * Method to count total no of files user has
 * @param {Current user id} user_id
 */
function totalFilesCount(user_id) {
    var totalFileCount;
    var ref = firebase.database().ref('users/' + user_id);

    ref.once("value", function (snapshot) {
        console.log(snapshot.val());

        totalFileCount = snapshot.val().totalfiles;

        console.log(totalFileCount);
    }, function (error) {
        console.log("Error: " + error.code);
    });

    return totalFileCount;
}

/**
 * Helper method to distinguish between textEditor and codeConvertor
 * @param {Current user id} user_id
 */
function saveFileContents(user_id) {
    if (validateField()) {
        if (window.location.href.includes("codeConvertor.html")) {
            saveFileContentsFromCode(user_id);
        } else {
            saveFileContentsFromText(user_id);
        }
        alert("File Successfully Saved");
        console.log("Data Saved");
    }
}
/**
 * Method to save file contents to firebase
 * @param {Current user id} user_id
 */
function saveFileContentsFromText(user_id) {
    //var fileNo = "/file1";
    //Getting file name
    var fileName = document.getElementById("filename").value;

    /**
     * Getting contents from the editor
     */
    var contents = toGetContents();

    //Storing Files table in firebase
    firebase.database().ref('Files/' + '/TextEditor/' + user_id + "/" + fileName).set({
        filecontent: contents,
        shared: true
    });

}
/**
 * Method to save file contents to firebase
 * @param {Current user id} user_id
 */
function saveFileContentsFromCode(user_id) {
    //var fileNo = "/file1";
    //Getting file name
    var fileName = document.getElementById("filename").value;

    /**
     * Getting contents from the editor
     */
    var contents = toGetContents();

    //Storing Files table in firebase
    firebase.database().ref('Files/' + '/CodeConvertor/' + user_id + "/" + fileName).set({
        filecontent: contents,
        shared: true
    });

}

/**
 * Helper method to fetch data
 */
function setContentInEditor() {
    var user = firebase.auth().currentUser;
    var user_id = user.uid;
    //Getting file name
    var fileName = document.getElementById("filename").value;

    try {
        if (validateField()) {
            if (window.location.href.includes("codeEditor")) {
                //Fetching file contents
                var fetchContent = fetchFileContentsFromCode(user_id, fileName);
                //console.log(fetchContent);
            } else {
                fetchFileContentsFromText(user_id, fileName);
            }
        }
    } catch (err) {

    }
}

/**
 * Method to fetch contents of file from the firebase
 * @param {user id} user_id
 * @param {file which to download} fileNo
 */
function fetchFileContentsFromText(user_id, fileName) {
    var fileContents;
    var ref = firebase.database().ref('Files/' + '/TextEditor/' + user_id + "/" + fileName);

    ref.once("value", function (snapshot) {

        console.log(snapshot.val());
        if (snapshot.val() === null) {
            alert("File does not exists");
        } else {

            fileContents = snapshot.val().filecontent;

            //Temporary fix to display in textEditor
            tinymce.get("textEditor").setContent(fileContents);
            alert("File Successfully loaded.");

            console.log(fileContents);
        }
    }, function (error) {
        alert("File not exists");
        console.log("Error: " + error.code);
    });

    return fileContents;
}

/**
 * Method to fetch contents of file from the firebase
 * @param {user id} user_id
 * @param {file which to download} fileNo
 */
function fetchFileContentsFromCode(user_id, fileName) {
    var fileContents;
    var ref = firebase.database().ref('Files/' + '/CodeConvertor/' + user_id + "/" + fileName);

    ref.once("value", function (snapshot) {

        console.log(snapshot.val());

        if (snapshot.val() === null) {
            alert("File does not exists");
        } else {
            fileContents = snapshot.val().filecontent;

            //Temporary fix to display text in code convertor
            /**
             * Setting the downloaded contents back to editor
             */
            var editor = ace.edit("codeEditor");

            //Setting text back to the editor
            editor.setValue(fileContents);
            alert("File Successfully loaded.");

            console.log(fileContents);
        }

    }, function (error) {
        alert("File does not exists");
        console.log("Error: " + error.code);
    });

    return fileContents;
}

/**
 * Method to get contents from the editor
 */
function toGetContents() {
    var url = window.location.href;
    var text;
    console.log(url);

    if (url.includes("codeEditor")) {
        //Accessing the editor
        var editor = ace.edit("codeEditor");

        //Getting text form the editor
        text = editor.getValue();

        return text;
    } else {
        //var textEditor = document.getElementById('textEditor');
        text = tinymce.get("textEditor").getContent({
            format: 'raw'
        });
        console.log(text);
        return text;
    }
}

function validateField() {
    //#, [, ], *, or ?
    var fileName = document.getElementById("filename").value;
    if (fileName == "") {
        alert("Enter file name");
        return false;
    } else if (fileName.includes(".") || fileName.includes("#") || fileName.includes("[") || fileName.includes("]") || fileName.includes("*") || fileName.includes("?")) {
        alert("Please don't use speacial characters");
        return false;
    } else {
        return true;
    }
}


//Method to get a Users notifications
function readInbox(user_id) {
    var badgeValue = 0;
    var inbox = document.getElementById('inbox');
    var ref = firebase.database().ref('Inbox/' + user_id);
    ref.once("value", function (snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            if (!childData.seen){
                badgeValue += 1;
                console.log(badgeValue);
                document.getElementById("badgeValue").textContent = badgeValue;
            }
        });
    });
    inbox.appendChild(addMessage("Hello"));
    inbox.appendChild(addMessage("Hello2"));
}


function addMessage(msg){
    var message = document.createElement('li');
    message.setAttribute('class',"collection-item");
    var text = document.createElement('p');
    text.appendChild(document.createTextNode(msg));
    message.appendChild(text);
    return message;
}