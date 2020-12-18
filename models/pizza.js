var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Schema type d'une pizza
var PizzaSchema = new Schema({
  ingredients : String,
  produit : String,
  quantite : {
    type : Number,
    default : 1
  },
  createdAt : {
    type : Date,
    default : Date.now
  },
  prix : Number,
  commander :{ // Permet de valider la commande ou de l'annuler
    type :Boolean,
    default : false
  }
});

module.exports = mongoose.model('Pizza', PizzaSchema);