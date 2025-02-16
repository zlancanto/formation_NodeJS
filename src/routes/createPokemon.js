const {Pokemon} = require("../db/sequelize")
module.exports = (app) => {
    app.post("/api/pokemons/create", (req, res) => {
        Pokemon
            .create(req.body)
            .then(pokemon => {
                const message = `Pokémon ${pokemon.name} créé avec succès`
                res.json({message, data: pokemon})
            })
    })
}