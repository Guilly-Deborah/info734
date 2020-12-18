import React from 'react';
import '../style/pizza.css';
import axios from 'axios';

async function makePostRequest(url) {
    let res = await axios.post(url, {});
    return res;
}

function Pizza({}) {

    const handleSubmit = (e) => {
        makePostRequest('http://localhost:3000/api/v1/pizza')
            .then(( data ) => console.log(data))
            .catch((err) => console.log(err))
    };

    //Affichage
    return (
        <div>
            <form>
                <label for="nom">Nom:</label><br/>
                <input type="text" id="nom" name="nom" onChange={handleChange}/><br/><br/>
                <label for="ingredients">Ingredients:</label><br/>
                <input type="text" id="ingredients" name="ingredients" onChange={handleChange}/><br/><br/>
                <input type="submit" value="Valider" onClick={handleSubmit}/>
            </form>
        </div>
    )
}

export default Pizza;