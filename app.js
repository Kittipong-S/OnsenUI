
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
var db = firebase.firestore();

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
        alert("Please enter your email and password!");
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

    $("#tool").click(function () {
      $("#sidemenu")[0].open();
    });

    $("#login").click(function () {
      console.log("logout!");
      firebase.auth().signOut().then(function () {
        $("#content")[0].load("login.html");
        $("#sidemenu")[0].close();
        alert("Logged out!");
      }).catch(function (error) {

      });

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
          alert("Success!");
          $("#content")[0].load("login.html");
          $("#sidemenu")[0].close();

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

  if (page.id === 'menuPage') {



    $("#carousel").empty();
    db.collection("recommended").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
          <div class="thumbnail" style=" background-image: url('${doc.data().picUrl}')">
          </div>
          <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
      </ons-carousel-item>`
        $("#carousel").append(item);
      });
    });

    $("#list").empty();
    db.collection("menuIcon").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item2 = `<ons-col class="card column" onclick="selectCategory('${doc.data().name}')" id="menu-card "
      style="background-color:blueviolet; width: 100px; height: 100px; text-align: center;">
          <img style="width:50px; height: 50px;"
              src="${doc.data().IconUrl}">
          <p style="text-align: center; margin: 6px;">${doc.data().name}</p>
          <ons-col>`
        $("#list").append(item2);
      });
    });
  }



  if (page.id === 'category') {

    $("#tool").click(function () {
      $("#sidemenu")[0].open();
    });
    
    var category = localStorage.getItem("selectedCategory");
    console.log("categoryPage:" + category);

    $("#header").html(category);

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

    $("#categ_list").empty();
    db.collection(category).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          
          var item = `<div class="card column" >
          <ul class="list">
            <li class="list-item" >
              <div class="list-item__center">
                <img class="list-item__thumbnail"
                  src="${doc.data().picUrl}">
              </div>
    
              <div class="list-item__center">
                <div class="list-item__title">${doc.data().name}</div>
                <div class="list-item__subtitle">Min Delivery : $25 / ${doc.data().status}</div>
              </div>
    
              <div class="list-item__right">
                <ons-button modifier="light">Menu</ons-button>
              </div>
            </li>
          </ul>
        </div>`
          $("#categ_list").append(item);
          console.log(doc.data().name);
      });
  });
  

  }


});

function selectCategory(cate_name) {
  console.log(cate_name);
  localStorage.setItem("selectedCategory", cate_name);
  $("#content")[0].load("resturant_list.html");

}