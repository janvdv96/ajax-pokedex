const button = document.getElementById("run");
const input = document.getElementById("input");
const imgDisplay = document.getElementById("imgDisplay");
const nameDisplay = document.getElementById("nameDisplay");

const heightDisplay = document.getElementById("heightDisplay");
const weightDisplay = document.getElementById("weightDisplay");
const expDisplay = document.getElementById("expDisplay");
const abiList = document.getElementById("abiList");

const typesDisplay1 = document.getElementById("typesDisplay1");
const typesDisplay2 = document.getElementById("typesDisplay2");
const flavorDisplay = document.getElementById("flavorDisplay");

const moveList = document.getElementById("moveList");
const moveListOne = document.getElementById("move1");
const moveListTwo = document.getElementById("move2");
const moveListThree = document.getElementById("move3");
const moveListFour = document.getElementById("move4");

const evoDisplay = document.getElementById("evoDisplay");
const evoTarget = document.getElementById("evoTarget");

const moveListArray = [moveListOne, moveListTwo, moveListThree, moveListFour];
const typesDisplayArray = [typesDisplay1, typesDisplay2];


document.body.addEventListener("keyup", function (e) {
    if (e.which === 13) {
        let value = input.value;
        let id = value.toLowerCase();
        init(id);
    }
});

button.addEventListener("click", function () {
    let value = input.value;
    let id = value.toLowerCase();
    init(id);
});

function init(id) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
        console.log(data);

        typesDisplay1.style.backgroundImage = "none";
        typesDisplay2.style.backgroundImage = "none";
        abiList.innerHTML = "";
        evoTarget.innerHTML = "";

        // Get sprite from API and display it
        let sprite = data.sprites.front_default;
        console.log(sprite);

        if (sprite === null) {
            imgDisplay.style.background = "url('src/pokeball.png') center center no-repeat";
        } else {
            imgDisplay.style.backgroundColor = "white";
            imgDisplay.style.backgroundImage = "url('" + sprite + "')";
        }

        // Get name and ID from API and display it
        let name = data.species.name;
        let ID = data.id;
        nameDisplay.innerText = name + ", " + ID;

        // Get moves from API and display 4 at random
        if (data.moves.length <= 4) {
            for (let i = 0; i < data.moves.length; i++) {
                moveListArray[i].innerText = "";
                moveListArray[i].innerText = data.moves[i].move.name;
            }
        } else {
            for (let i = 0; i < 4; i++) {
                let random = Math.floor(Math.random() * data.moves.length);
                moveListArray[i].innerText = data.moves[random].move.name;
            }
        }

        //Get Types and display them
        for (i = 0; i < data.types.length; i++) {
            console.log("type: ", data.types[i].type.name);
            switch (data.types[i].type.name) {
                case "flying":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/flying.png')";
                    break;
                case "bug":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/bug.png')";
                    break;
                case "dark":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/dark.png')";
                    break;
                case "dragon":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/dragon.png')";
                    break;
                case "electric":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/electric.png')";
                    break;
                case "fairy":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/fairy.png')";
                    break;
                case "fighting":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/fighting.png')";
                    break;
                case "fire":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/fire.png')";
                    break;
                case "ghost":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/ghost.png')";
                    break;
                case "grass":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/grass.png')";
                    break;
                case "ground":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/ground.png')";
                    break;
                case "ice":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/ice.png')";
                    break;
                case "normal":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/normal.png')";
                    break;
                case "poison":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/poison.png')";
                    break;
                case "psychic":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/psychic.png')";
                    break;
                case "rock":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/rock.png')";
                    break;
                case "steel":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/steel.png')";
                    break;
                case "water":
                    typesDisplayArray[i].style.backgroundImage = "url('src/icons/water.png')";
                    break;
                default:
                    typesDisplayArray[i].style.backgroundImage = "url('https://via.placeholder.com/64')";
                    break;
            }
        }

        //Get FlavorText from API and Display it
        fetch(data.species.url)
            .then(function (response) {
                return response.json()
            }).then(function (species) {

            let flavorArray = [];
            species.flavor_text_entries.forEach(flavorText => {
                if (flavorText.language.name === "en") {
                    flavorArray.push(flavorText.flavor_text);
                }
            });

            let rand = Math.floor(Math.random() * flavorArray.length);
            flavorDisplay.innerText = flavorArray[rand];

        });

        // Get a lot of data from API and display
        let height = data.height * 10;
        let weight = Math.round(data.weight * 0.45);
        let experience = data.base_experience;
        let abilities = [];

        for (i = 0; i < data.abilities.length; i++) {
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
                    }
                }

                console.log("all evo names:", allEvoNames);

                for (i = 0; i < allEvoNames.length; i++) {
                    fetch("https://pokeapi.co/api/v2/pokemon/" + allEvoNames[i])
                        .then(function (response) {
                            return response.json();
                        }).then(function (evo) {
                        let evoSprite = evo.sprites.front_default;

                        let temp = document.getElementById("evoTemp");
                        let image = temp.content.querySelector(".evoImg");
                        image.style.backgroundImage = "url('" + evoSprite + "')";

                        let clone = temp.content.cloneNode(true);
                        evoTarget.appendChild(clone);
                    })
                }

            })
        });


    })
}

