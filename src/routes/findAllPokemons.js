const {Pokemon} = require("../db/sequelize")
module.exports = (app) => {
    app.get("/api/pokemons", (req, res) => {
        Pokemon
            .findAll()
            .then(pokemons => {
                const message = "Liste de tous les pokémons"
                res.json({message, data: pokemons})
            })
    })
}