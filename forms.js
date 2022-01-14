window.addEventListener("load", function() {
    function sendData() {
            const sendRequest = new XMLHttpRequest();

            const signupInfo = new URLSearchParams();
            signupInfo.append("user", document.getElementById("user").value);
            signupInfo.append("pass", document.getElementById("pass").value);
            signupInfo.append("email", document.getElementById("email").value);
            sendRequest.addEventListener("load", function(event){
                alert( "Your account was created!" );
            });

            sendRequest.addEventListener("error", function(event) {
                alert( "Submission unsuccessful! Please try again." );
            });

            sendRequest.open("POST", "http://localhost:5000/app/new/user");

            sendRequest.send(signupInfo);

            const sendRequestasd = new XMLHttpRequest();
            sendRequestasd.open("GET", "http://localhost:5000/app/user/" + localStorage.getItem("id"), false)
            sendRequestasd.send();
            var accountArray = JSON.parse(sendRequest.responseText);
            // If new players are registered before game is loaded, may be no need for a new_game() function;
            // Should be able to just pull newly-initialized DB data for player
            ////////console.log(accountArray);
    }

    function authenticate() {
            const sendRequest = new XMLHttpRequest();

            var user = document.getElementById("user1").value;
            var pass = CryptoJS.MD5(document.getElementById("pass1").value).toString();
            sendRequest.open("GET", "http://localhost:5000/app/users", false)
            
            sendRequest.send();
            //console.log(sendRequest.responseText);
            var x = 0;
            var accountArray = JSON.parse(sendRequest.responseText);
            //console.log(accountArray);
            for (var account of accountArray){
                    //console.log(account);
                    if(account['user'] == user && account['pass'] == pass) {
                      localStorage.setItem("id", account['id']);      
                      localStorage.setItem("user", account['user']);
                      localStorage.setItem("pass", document.getElementById("pass1").value);
                      localStorage.setItem("email", account['email']);
                      x = 1;
                      break;
                    } else {
                      x = 0;
                    }
            }
            if(x == 1) {
             window.location.href = "app.html";
            } else {
             alert("Account information is incorrect! Please check your spelling.")
            }
    }


    myStorage = window.localStorage;

    const form = document.getElementById("signup");
    const loginForm = document.getElementById("loginForm");
   // const updateButton = document.getElementById("save");
    form.addEventListener("submit", function(event){
            event.preventDefault();

            sendData();
    } );

    loginForm.addEventListener("submit", function(event){
            event.preventDefault();

            authenticate();
    });

    // updateButton.addEventListener("submit",function(event){
    //         event.preventDefault();
    //         saveGame(document.getElementById("email4").value)
    // })
});