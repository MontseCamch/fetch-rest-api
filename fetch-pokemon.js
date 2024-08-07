const BASE_URL = 'https://pokeapi.co/api/v2/';

/*fetch(BASE_URL + "pokemon/" + 1)
.then(res => res.json())
.then((data) => console.log(data));*/

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

fetch("https://jsonplaceholder.typicode.com/posts", {
    method: 'POST',
    headers:{
        "Content-type": "application/json; charset= UTF-8",
    },
    body: JSON.stringify({
        title:"title 1",
        body: "Lorem ipsum",
        userId: 1,
    }),
}).then(res => res.json())
.then(data => console.log(data));