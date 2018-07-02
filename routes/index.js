const routes = require("express").Router();
const controllers = require("../controllers");

const charController = controllers.character;

// CHARACTER
routes.get("/character", charController.buildCharacter);
// routes.post("/character", charController.)

module.exports = routes;
