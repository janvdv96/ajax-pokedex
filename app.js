
const button = document.getElementById("run");
const input = document.getElementById("input");
const imgDisplay = document.getElementById("imgDisplay");
const nameDisplay = document.getElementById("nameDisplay");

const moveList = document.getElementById("moveList");
const moveListOne = document.getElementById("move1");
const moveListTwo = document.getElementById("move2");
const moveListThree = document.getElementById("move3");
const moveListFour = document.getElementById("move4");

const moveListArray = [moveListOne, moveListTwo, moveListThree, moveListFour];

button.addEventListener("click", function () {
    let id = input.value;
    init(id);
});

function init(id) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);

        // Get sprite from API and display it
        let sprite = data.sprites.front_default;
        console.log(sprite);

        if (sprite === null){
            imgDisplay.style.background = "red";
        } else {
            //imgDisplay.style.background = "white center center no-repeat";
            imgDisplay.style.backgroundImage = "url('" + sprite +"')";
        }

        // Get name and ID from API and display it
        let name = data.species.name;
        let ID = data.id;
        console.log(name);
        nameDisplay.innerText = name + ", ID: " + ID;

        // Get moves from API and display 4 at random
        for (let i = 0; i < 4; i++){
            let random = Math.floor(Math.random() * data.moves.length);
            console.log("Random: " + random);
            moveListArray[i].innerText = data.moves[random].move.name;
        }

        // Get evolutions from the API and Display them
    })
}

