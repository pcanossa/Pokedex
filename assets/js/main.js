const pokemonOl = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMore');
const limit = 10;
let offset = 0;

function convertPokemonToHtml(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="img-type">
                    <ol class="types ${pokemon.type}-type">
                        ${pokemon.types.map((type)=> `<li class="${type}">${type}</li>`).join('')}
                    </ol>
                    <div class="img">
                        <img class="img-pokemon" src="${pokemon.img}" alt="${pokemon.name}">
                    </div>    
                </div>
                
            </li> `
}

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = [])=> {
        
        //const novaLista = pokemonList.map(convertPokemonToHtml).join('')

        //const newHtml = novaLista.join('');
        
        
        
        /*const htmlList = [];
            for (let i=0; i<pokemonList.length; i++){
                let pokemon = pokemonList[i];
                htmlList.push(convertPokemonToHtml(pokemon));
            }  
        */
    
            
        
        pokemonOl.innerHTML += pokemonList.map(convertPokemonToHtml).join('');
    })
}    
  
loadPokemons (offset, limit);

loadMoreButton.addEventListener('click', ()=> {
    offset += limit;
    
    if (offset == 150) {
        loadMoreButton.parentNode.removeChild(loadMoreButton);
        loadPokemons(offset, 1)
    } else {
        loadPokemons(offset, limit)
    }
})