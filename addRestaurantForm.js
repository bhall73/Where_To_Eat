// MAY NOT NEED THIS PAGE 
// THIS MAY NEED TO BE DONE IN A GAME.JS TYPE FILE

window.addEventListener("load", function() {
    function sendData() {
            const sendRequest = new XMLHttpRequest();

            const addRestaurantInfo = new URLSearchParams();
            addRestaurantInfo.append("newLocation", document.getElementById("newLocation").value);
            addRestaurantInfo.append("newFoodType", document.getElementById("newFoodType").value);
            addRestaurantInfo.append("newName", document.getElementById("newName").value);
            addRestaurantInfo.addEventListener("load", function(event){
                alert( "New Restaurant Added!" );
            });

            sendRequest.addEventListener("error", function(event) {
                alert( "Submission unsuccessful! Please try again." );
            });

            sendRequest.open("POST", "http://localhost:5000/app/new/user");

            sendRequest.send(addRestaurantInfo);

            const sendRequestasd = new XMLHttpRequest();
            sendRequestasd.open("GET", "http://localhost:5000/app/user/" + localStorage.getItem("id"), false)
            sendRequestasd.send();
            var accountArray = JSON.parse(sendRequest.responseText);
            // If new players are registered before game is loaded, may be no need for a new_game() function;
            // Should be able to just pull newly-initialized DB data for player
            ////////console.log(accountArray);
    }

    myStorage = window.localStorage;

    const form = document.getElementById("addRestaurantForm");
   // const updateButton = document.getElementById("save");
    form.addEventListener("submit", function(event){
            event.preventDefault();

            sendData();
    } );
});