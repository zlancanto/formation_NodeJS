exports.success = (message, data) => {
   return {message, data};
}

exports.allSuccess = (message, length, data) => {
    return {message, length, data};
}

exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(pokemon => pokemon.id);
    const maxId = Math.max.apply(Math, pokemonsIds);
    const uniqueId = maxId + 1;

    return uniqueId;
}