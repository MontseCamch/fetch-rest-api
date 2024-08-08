const BASE_URL = 'https://pokeapi.co/api/v2/';
const cardsContainer = document.getElementsByClassName(".cardsContainer");

const fetchPokemon = async (pokemon) => {
    try{
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
    localStorage.setItem("currentPokemonId", pokemon.id);//Almacena el ID del pokemon en Local storage
    createCard(pokemon);
});

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon.name);
});

document.getElementById("prev-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = Math.max(1, currentPokemonId - 1
    );//Compara el Id-1 con 1 y si es 0 o menos, siempre va a regresar 1. Math.max siempre regresa el número mayor
    const pokemon = await fetchPokemon(newId); //Envía el valor de newId a la función fetchPokemon
    console.log(pokemon.name);
});

document.getElementById("next-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = currentPokemonId + 1;
    const pokemon = await fetchPokemon(newId); 
    console.log(pokemon.name);
});

function createCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <div class = "card-img-container">
            <img src="${pokemon.sprites}" alt="${pokemon.name}">
            </div>
            <div class="card">
                <h3 class="card-title">${pokemon.name}</h3>
                <p>${pokemon.id}</p>
                <p>${pokemon.weight}</p>
            </div>
            
    `;
    
    console.log(card)
    //cardsContainer.appendChild(card);
    return card;
    
}
createCard(50); 
console.log(createCard())