const button = document.getElementById("run");
const input = document.getElementById("input");
const imgDisplay = document.getElementById("imgDisplay");
const nameDisplay = document.getElementById("nameDisplay");

const heightDisplay = document.getElementById("heightDisplay");
const weightDisplay = document.getElementById("weightDisplay");
const expDisplay = document.getElementById("expDisplay");
const abiList = document.getElementById("abiList");

const moveList = document.getElementById("moveList");
const moveListOne = document.getElementById("move1");
const moveListTwo = document.getElementById("move2");
const moveListThree = document.getElementById("move3");
const moveListFour = document.getElementById("move4");

const evoDisplay = document.getElementById("evoDisplay");

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

        abiList.innerHTML = "";

        // Get sprite from API and display it
        let sprite = data.sprites.front_default;
        console.log(sprite);

        if (sprite === null) {
            imgDisplay.style.background = "red";
        } else {
            //imgDisplay.style.background = "white center center no-repeat";
            imgDisplay.style.backgroundImage = "url('" + sprite + "')";
        }

        // Get name and ID from API and display it
        let name = data.species.name;
        let ID = data.id;
        nameDisplay.innerText = name + ", ID: " + ID;

        // Get moves from API and display 4 at random
        for (let i = 0; i < 4; i++) {
            let random = Math.floor(Math.random() * data.moves.length);
            moveListArray[i].innerText = data.moves[random].move.name;
        }

        // Get a lot of data from API and display
        let height = data.height * 10;
        let weight = Math.round(data.weight * 0.45);
        let experience = data.base_experience;
        let abilities = [];

        for (i = 0; i < data.abilities.length; i++){
            //abilities.push(data.abilities[i].ability.name);
            let item = document.createElement("li");
            item.innerText = data.abilities[i].ability.name;
            abiList.appendChild(item);

        }

        console.log("abilities: ", abilities);

        heightDisplay.innerText = height + " cm";
        weightDisplay.innerText = weight + " kg";
        expDisplay.innerText = experience;


        // Get evolutions from the API and Display them
        fetch(data.species.url)
            .then(function (response) {
                return response.json()
            }).then(function (species) {
            console.log("species: ", species);
            //console.log(evolutions.chain.evolves_to[0].species.name);

            fetch(species.evolution_chain.url)
                .then(function (response) {
                    return response.json();
                }).then(function (evolution) {
                console.log("evo chain: ", evolution);

                let allEvoNames = [];

                allEvoNames.push(evolution.chain.species.name);

                for (i = 0; i < evolution.chain.evolves_to.length; i++) {

                    allEvoNames.push(evolution.chain.evolves_to[i].species.name);
                    console.log(evolution.chain.evolves_to[i].species.name);

                    console.log(evolution.chain.evolves_to[i].evolves_to.length);

                    for (y = 0; y < evolution.chain.evolves_to[i].evolves_to.length; y++) {
                        allEvoNames.push(evolution.chain.evolves_to[i].evolves_to[y].species.name);
                        console.log("ik geraak tot hier");
                    }
                }

                console.log("all evo names:", allEvoNames);


                /*fetch("https://pokeapi.co/api/v2/pokemon/" + firstEvo)
                    .then(function (response) {
                        return response.json();
                    }).then(function (firstEvoArray) {
                        let firstEvoIMG = firstEvoArray.sprites.front_default;

                })*/
            })
        });


    })
}

