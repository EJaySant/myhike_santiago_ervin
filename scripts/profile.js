var currentUser;
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    let userName = userDoc.data().name;
                    let userSchool = userDoc.data().school;
                    let userCity = userDoc.data().city;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            userName = document.getElementById("nameInput").value;
            userSchool = document.getElementById("schoolInput").value;
            userCity = document.getElementById("cityInput").value;
            
            currentUser = db.collection("users").doc(user.uid);
            currentUser.update({
                name: userName,
                school: userSchool,
                city: userCity
            })
            .then(() => {
                console.log("Document sucessfully updated!");
            })

            document.getElementById('personalInfoFields').disabled = true;
        } else {
            console.log("No user is signed in");
        }
    });
}