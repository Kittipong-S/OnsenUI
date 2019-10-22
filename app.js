
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

      localStorage.setItem("username",username);
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

    $("#logout").click(function () {
      console.log('logoutbtn pressed');
  
      $("#sidemenu")[0].close();
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
        ons.notification.alert("Logout Sucess !");
        $("#content")[0].load("login.html");
      }).catch(function (error) {
        // An error happened.
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

 $("#tool").click(function () {
      $("#sidemenu")[0].open();
    });


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
    db.collection("menuIcon").orderBy("id", "asc").get().then((querySnapshot) => {
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
    db.collection(category).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
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
                <div class="list-item__subtitle">Min Delivery : $${doc.data().min} / ${doc.data().status}</div>
              </div>
    
              <div class="list-item__right">
                <ons-button modifier="light" onclick="selectMenu('${doc.data().id}')">Menu</ons-button>
              </div>
            </li>
          </ul>
        </div>`
        $("#categ_list").append(item);
        console.log(doc.data().name);
      });
    });


  }

  if (page.id === 'resMenu') {

    $("#tool").click(function () {
      $("#sidemenu")[0].open();
    });
    $("#orderC").click(function () {
      if (getname.length == 0) {
        ons.notification.alert("Can't pass, you have 0 menu in order");
      } else
        $("#content")[0].load("orderconfirmation.html");
    });

    $("#tool").click(function () {
      $("#sidemenu")[0].open();
    });
    var category = localStorage.getItem("selectedCategory");
    var resturantMenu = localStorage.getItem("selectedMenu");
    console.log("categoryPage:" + category);

    db.collection(category).where("id", "==", resturantMenu).get()
      .then(function (querySnapshot) {
        console.log(resturantMenu);
        console.log(category);
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots

          var item = `
    <div>
    <div>
            <li class="list-item">
                <div class="list-item__left">
                    <img class="list-item__thumbnail"
                        src="${doc.data().picUrl}">
                </div>

                <div class="list-item__center">
                    <div class="list-item__title">${doc.data().name}</div>
                    <div class="list-item__subtitle">Min Delivery : $${doc.data().min} / Open</div>
                </div>

            </li>
            </div>
<div>`

          $("#menu_list").append(item);

         
          var menu = doc.data().menus;
          for (let index = 0; index < menu.length; index++) {
            var menus2 = menu[index];
            var item = `
            <ul class="list">
                <div style="text-align: center; margin-top: 20px;">
                <li class="list-item">
                    <div class="list-item__center">
                        <div class="list-item__title">${menus2.mname}</div>
                        <div class="list-item__subtitle">${menus2.detail}</div>
                    </div>

                    <div class="list-item__right">
                        <i class=" list-item__icon">$${menus2.mprice}</i>
                        <ons-button modifier="light" onclick="gettotal('${menus2.mname}','${menus2.mprice}')">+</ons-button>
                    </div>
                </li>
            </div>`
            $("#menu_list2").append(item);
            console.log(doc.data().name);
          }
        });
      });

  }

  if (page.id === 'orderpage') {

    $("#back").click(function () {
      getname = [];
      getprice = [];
      totalprice = 0;
      price = parseInt(0);
      alert("Success!")
      $("#content")[0].load("menu.html");
      $("#sidemenu")[0].close();
    });
  
    $("#back1").click(function () {
      getname = [];
      getprice = [];
      totalprice = 0;
      price = parseInt(0);
      alert("Success!")
      $("#content")[0].load("menu.html");
      $("#sidemenu")[0].close();
    });

    $("#back2").click(function () {
      getname = [];
      getprice = [];
      totalprice = 0;
      price = parseInt(0);
      alert("Success!")
      $("#content")[0].load("menu.html");
      $("#sidemenu")[0].close();
    });

    $("#back3").click(function () {
      getname = [];
      getprice = [];
      totalprice = 0;
      price = parseInt(0);
      alert("Success!")
      $("#content")[0].load("menu.html");
      $("#sidemenu")[0].close();
    });

    $("#tool").click(function () {
      $("#sidemenu")[0].open();
    });

  var category = localStorage.getItem("selectedCategory");
  var resturantMenu = localStorage.getItem("selectedMenu");
  db.collection(category).where("id", "==", resturantMenu).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          var item = `<ons-row>
          <ons-col class="card" id="menu-card" style="width: 150px; height: 130px; text-align: center;">
              <img style="width:50px; height: 50px;"
                  src="${doc.data().picUrl}">
              <div>
                  <div class="list-item__title">${doc.data().name}</div>
                  <div class="list-item__subtitle">Your Order is below</div>
              </div>
          </ons-col>
      </ons-row>`;
          $('#order').append(item);
    
      });
    });

    for (var i = 0; i < getname.length; i++) {
      var show_OrderMenu = `<div >
      <li class="list-item">
          <div class="list-item__center">
              <div class="list-item__title">`+getname[i]+`</div>
          </div>
          <div class="list-item__right">
              <i>$`+getprice[i]+`</i>
          </div>
      </li>`;
      $("#orderMenu").append(show_OrderMenu);
    


  }
  var totalprice = localStorage.getItem("totalprice");
  $("#totalP").append(totalprice);

  


}

});

function selectCategory(cate_name) {
  console.log(cate_name);
  localStorage.setItem("selectedCategory", cate_name);
  $("#content")[0].load("resturant_list.html");

}

function selectMenu(menu_name) {
  console.log(menu_name);
  localStorage.setItem("selectedMenu", menu_name);
  $("#content")[0].load("resturant_menu.html");

}

var getprice = [];
var getname = [];
var price = parseInt(0);



function gettotal(mname, mprice,) {
  console.log(mname);
  console.log(mprice);
  price += parseInt(mprice);
  getname.push(mname);
  getprice.push(mprice);
  console.log("total = " + price);
  // window.alert("Add to cart success!");
  localStorage.setItem("totalprice", price);
  document.getElementById('totalbtn').innerText = "Total = " + price + " $";
  $("#totalbtn").click(function () {
  });
}





;