
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
  
  
    if (page.id === 'homePage') {
      console.log("homePage");
  
      $("#menubtn").click(function () {
        $("#sidemenu")[0].open();
      });
  
      $("#carousel").empty();
      db.collection("recommended").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {       
          var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
              <div class="thumbnail" style="background-image: url('${doc.data().photoUrl}')">
              </div>
              <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
          </ons-carousel-item>`
          $("#carousel").append(item);
        });
      });
    }
  
    if (page.id === 'menuPage') {
      console.log("menuPage");
  
      $("#login").click(function () {
        $("#content")[0].load("login.html");
        $("#sidemenu")[0].close();
      });
  
      $("#home").click(function () {
        $("#content")[0].load("home.html");
        $("#sidemenu")[0].close();
      });
    }
  
    if (page.id === 'loginPage') { 
      console.log("loginPage");
  
    //   $("#backhomebtn").click(function () {
    //     $("#content")[0].load("home.html");
    //   });

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

    }
  });

//         function facebooklogin() {
//         firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });
//         }

// $("#gmailbtn").click(function () {

// var provider = new firebase.auth.GoogleAuthProvider();

//   firebase.auth().signInWithPopup(provider).then(function(result) {

//     content.load('tabbar.html')
//             .then(menu.close.bind(menu));


//   }).catch(function(error) {
//       console.log(error);
//   });

// })
