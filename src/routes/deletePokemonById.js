const {Pokemon} = require("../db/sequelize")
module.exports = (app) => {
    app.delete("/api/pokemons/:id", (req, res) => {
        Pokemon.findByPk(req.params.id).then((pokemon) => {
            const pokemonDeleted = pokemon
            Pokemon.destroy({
                where: {id: pokemon.id},
            })
            .then(() => {
                const message = `Pokemon ${pokemonDeleted.name} supprimé avec succès.`
                res.json({message, data: pokemonDeleted})
            })
        })
    })
}