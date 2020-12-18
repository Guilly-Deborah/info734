// Acces au router
const router = require('express').Router();

// Acces au controlleur
const controller = require('../controllers/pizza');

// Route pour la creation d'une pizza
router.post("/pizza", (req, res) => {
    controller.create(req, res);
});

// Route pour la lecture d'une pizza
router.get("/pizzas", (req, res) => {
    controller.reads(req, res);
});

// Route pour la lecture de toutes les pizzas
router.get("/pizza/:id", (req, res) => {
    controller.read(req, res);
});

// Validation de la commande d'une pizza
router.post("/pizza/:id/commander", (req, res) => {
    controller.valider(req, res);
});

// Annuler de la commande d'une pizza
router.post("/pizza/:id/commander", (req, res) => {
    controller.annuler(req, res);
});

module.exports = router;