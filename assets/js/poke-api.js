const pokeApi = {};

function convertPokeApiDetailToPokemon (pokemonDetails) {
    const pokemon = new Pokemon ()
    pokemon.name = pokemonDetails.name;
    pokemon.number = pokemonDetails.id;
    pokemon.types = pokemonDetails.types.map((typeSlot)=> typeSlot.type.name);
    pokemon.type = pokemon.types[0];
    pokemon.img = pokemonDetails.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response)=> response.json())
        .then(convertPokeApiDetailToPokemon)
};

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then((reponse) => reponse.json())  
    .then((jsonBody)=>jsonBody.results)
    .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetails))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetails)=> pokemonDetails)
    .catch((error) => console.log(error))

};