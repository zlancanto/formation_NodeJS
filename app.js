const express = require('express');
const {success, allSuccess, getUniqueId} = require('./helper');
let pokemons = require('./mock-pokemon');
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");

console.log(Array.isArray(pokemons)); // Devrait afficher true
console.log(typeof pokemons); // Devrait afficher 'object'

const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())
;

    app.get('/', (req, res) => res.send('Hello Express !'));
    app.get('/api/pokemons', (req, res) => {
        const message = "Liste de pokémons récuprérée avec succès";
        res.json(allSuccess(message, pokemons.length, pokemons));
    });
    app.get('/api/pokemons/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const pokemon = pokemons.find(pokemon => pokemon.id === id);
        const message = "Un pokémon a bien été trouvé";
        res.json(success(message, pokemon));
    });

    app.post('/api/pokemons', (req, res) => {
        const id = getUniqueId(pokemons);
        const pokemonCreated = {
            ...req.body,
            ...{id: id, created: new Date()}
        };
        pokemons.push(pokemonCreated);
        const message = `Le pokémon ${pokemonCreated.name} a bien été créé`;
        res.json(success(message, pokemonCreated));
    })

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdate = {id: id, ...req.body}
    pokemons = pokemons.map(pokemon => {
       return pokemon.id === id ? pokemonUpdate : pokemon;
    });
    const message = `Le pokémon ${pokemonUpdate.id} a bien été mis à jour`;
    res.json(success(message, pokemonUpdate));
})

    app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`));