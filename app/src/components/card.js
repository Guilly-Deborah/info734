import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import "../App.css";
  
const useStyles = makeStyles({
    root: {
        width: 100,
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 18,
    },
    pos: {
      marginBottom: 12,
    },
  });
/* Fonction pour annuler l'url une commande*/
async function makeDeleteRequest(url) {

    let res = await axios.delete(url);

    return res;
}
/* Fonction pour creer l'url une commande*/
async function makePostRequest(url) {

    let res = await axios.post(url, {});

    return res;

}

/* Fonction qui donne les informations sur une Pizza*/
export default function CardPizza({pizza, pizzas, setPizzas}) {

    const classes = useStyles();

    const handleDone = () => {
        // Validation d'une pizza en vue de la commander
        setPizzas(pizzas.map((item) => {
            if (item.id === pizza.id) {
                return { 
                    ...item, commander : !item.commander
                }
            }
            return item;
        }));

        // Creation de l'url de validation d'une commande
        makePostRequest("http://localhost:3000/api/v1/pizza/" + pizza._id + "/valider" )
            .then((data) => console.log(data))
            .catch((err) => console.log(err));


    };

    const handleDelete = () => {
        // Annulation d'une pizza
        setPizzas(pizzas.filter((el) => el.id !== pizza.id));

        // Annulation de l'url d'une pizza
        makeDeleteRequest("http://localhost:3000/api/v1/pizza/" + pizza._id)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };
    return(

        // Partie affichage de la carte d'une pizza
        <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <b><span className={`"title" ${pizza.commander ? "completed" : ''}`}> {pizza.nom} </span></b>
          </Typography>
          <Typography variant="body2" component="p">
            {pizza.ingredients}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleDone}>Done</Button>
          <Button size="small" onClick={handleDelete}>Delete</Button>
        </CardActions>
        </Card>
    );
}