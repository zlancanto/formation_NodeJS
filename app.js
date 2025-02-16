const express = require('express')
const morgan = require("morgan")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
const sequelize = require("./src/db/sequelize")
const findAllPokemons = require("./src/routes/findAllPokemons")

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

// Nous y placerons nos futurs points de terminaison
findAllPokemons(app)
require("./src/routes/findPokemonById")(app)
require("./src/routes/createPokemon")(app)
require("./src/routes/updatePokemonById")(app)
require("./src/routes/deletePokemonById")(app)

app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`))