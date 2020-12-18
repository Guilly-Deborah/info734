import React from 'react';
import CardPizza from "./card";

// Liste des pizzas
export default function List({pizzas, setPizzas}) {

    console.log(pizzas);
    if (pizzas.length > 0)
        console.log(pizzas[0].title);

    // Affichage
    return (
        <div>
          <h2>Pizzas</h2>
          <ul>
          {pizzas.map((value, index) => {
            return <CardPizza key={index} pizza={value} pizzas={pizzas} setPizzas={setPizzas}/>
           })}
          </ul>
        </div>
  )
}