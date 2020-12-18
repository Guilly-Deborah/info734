// Creation d'une pizza
function createPizza (req,res){
    let Pizza = require('../models/pizza');
    let newPizza = Pizza ({
        nom : req.body.nom,
        ingredients : req.body.ingredients,
        quantite : req.body.quantite,
        createAt : req.body.createAt,
        prix : req.body.prix,
        commander : req.body.commander
    });
    newPizza.save()
        .then((savedPizza) => {
            res.json(savedPizza);
        }, (err) => {
            res.status(400).json(err)
        });
}
// Lecture d'une pizza
function readPizzas(req, res) {
    let Pizza = require("../models/pizza");
    Pizza.find({})
        .then((pizzas) => {
            res.status(200).json(pizzas);
        }, (err) => {
            res.status(500).json(err);
        });
}
// Lecture de toutes les pizzas
function readPizza(req, res) {
    let Pizza = require("../models/pizza");
    Pizza.findById({_id : req.params.id})
        .then((pizza) => {
            res.status(200).json(pizza);
        }, (err) => {
            res.status(500).json(err);
        });
}
// Validation d'une commande
function validerCommande(req, res) {
    let Pizza = require("../models/pizza");
    Pizza.findByIdAndUpdate({_id: req.params.id},
        {commander : true},
        {new : true})
    .then((updatedPizza) => {
        res.status(200).json(updatedPizza);
    }, (err) => {
        res.status(500).json(err);
    });
}
// Annulation d'une commande
function annulerCommande(req, res) {
    let Pizza = require("../models/pizza");
    Pizza.findByIdAndUpdate({_id: req.params.id},
        {commander : false},
        {new : true})
    .then((updatedPizza) => {
        res.status(200).json(updatedPizza);
    }, (err) => {
        res.status(500).json(err);
    });
}

// Exportation des modules pour leurs utilisations
module.exports.create = createPizza();
module.exports.reads = readPizzas();
module.exports.read = readPizza();
module.exports.valider = validerCommande();
module.exports.annuler = annulerCommande();