
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCjJ2qn8k3f5xuyy2vx0Ujgfdc-k4bzxHY",
  authDomain: "fooddelivery-97a09.firebaseapp.com",
  databaseURL: "https://fooddelivery-97a09.firebaseio.com",
  projectId: "fooddelivery-97a09",
  storageBucket: "fooddelivery-97a09.appspot.com",
  messagingSenderId: "879005611928",
  appId: "1:879005611928:web:1a8678ec14f91016185ded",
  measurementId: "G-VYW6YXH3JE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var provider = new firebase.auth.GoogleAuthProvider();
$('#gmailbtn').click(function () {
  console.log("wasd");

});

document.addEventListener('init', function (event) {

  var page = event.target;

  //<-----------------login----------------->

  if (page.id === 'loginPage') {



    $("#login1").click(function () {
      var username = $("#username").val();
      var password = $("#password").val();
      firebase.auth().signInWithEmailAndPassword(username, password).then(function () {
        $("#content")[0].load("menu.html");
        $("#sidemenu")[0].close();
      }).catch(function (error) {
        console.log(error.message);

      });
      console.log(username);
    });


    $("#gmailbtn").click(function () {

      console.log("Google");

      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        $("#content")[0].load("menu.html");
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
    });

    $("#register").click(function () {
      $("#content")[0].load("register.html");
    });


  }


  if (page.id === 'toolPage') {
    console.log("tooPage");

    $("#login").click(function () {
      $("#content")[0].load("login.html");
      $("#sidemenu")[0].close();
    });

    $("#home").click(function () {
      $("#content")[0].load("menu.html");
      $("#sidemenu")[0].close();
    });

  }




  if (page.id === 'register') {
    console.log("register");
    $("#cancel").click(function () {
      $("#content")[0].load("login.html");
      $("#sidemenu")[0].close();
    });
    
    $("#register1").click(function () {
       db.collection("users").doc().set({
        firstname: document.getElementById('fname').value,
        lastname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        Confirmpassword: document.getElementById('conFpassword').value,
        phonenumber: document.getElementById('phone').value


      })
        .then(function () {
          console.log("Document successfully written!");

        }).catch(function (error) {
          console.log("Error Writing document: ", error);
        });


      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak')
        } else {
          alert(errorMessage);
        }
      });   
     });
  }
});