const BASE_URL = 'https://pokeapi.co/api/v2/';
const cardsContainer = document.getElementsByClassName(".cardsContainer");

/*async function fetchPokemon(pokemon){
    const response = await fetch(`${BASE_URL}pokemon/${pokemon}`,{
        method:"GET",
        headers:{
        "Content-type":"application/json"
        }
    });
    
    const parseData=await response.json();
    
    return parseData;
}*/

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        //console.log(response);
        const parseData = await response.json();
        //console.log(parseData);
        return parseData;
    } catch (err) {
        console.error(err);
    }
};





document.getElementById("get-btn").addEventListener('click', async () => {
    const text = document.getElementById("pokemon-name").value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    localStorage.setItem("currentPokemonId", pokemon.id);//Almacena el ID del Pokemon en Local storage
    createCard(pokemon);
});

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
});

document.getElementById("prev-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = Math.max(1, currentPokemonId - 1
    );
    const pokemon = await fetchPokemon(newId); 
    createCard(pokemon);
});

document.getElementById("next-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = currentPokemonId + 1;
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon.name);
    createCard(pokemon);
});

function createCard(element) {
    const pokemonCard = document.querySelector(".pokemon-container");
    const IMAGE_URL = element.sprites.front_default;

    const cardName = document.createElement("h3");
    cardName.classList.add("card-title");
    const cardId = document.createElement("p");
    const cardWeight = document.createElement("p");
    const pokemonImage = document.createElement("img");
    pokemonImage.src = IMAGE_URL;
    pokemonImage.alt = "User profile photo";

    cardName.textContent = element.name;
    cardId.textContent = element.id;
    cardWeight.textContent = element.weight;

    pokemonCard.replaceChildren();
    pokemonCard.append(pokemonImage, cardName, cardId, cardWeight);
}
