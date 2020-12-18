import React, {useState} from 'react';
import Header from './components/header';
import Pizza from './components/pizza';
import List from './components/list';
import axios from 'axios';

// Definition intial des donnees
const initialFormData = Object.freeze({
  nom: "",
  ingredients: "",
  commander: false,
  id : Math.ceil(Math.random() * 10000)
});

async function makeGetRequest(url) {
    let res = await axios.get(url);
    let data = res.data;
    return data;
}

function App() {
  const [formData, updateFormData] = useState(initialFormData);
  const [pizzas, addPizzas] = useState([]);
    useEffect(() => {
        fetchPizzas();
    }, []);

    const fetchPizzas = () => {
        makeGetRequest('http://localhost:3000/api/v1/pizzas')
            .then(( data ) => addPizzas(data))
            .catch((err) => console.log(err))
    }

    // Affichage
    return (
        <div className="App">
          <Header/>
          <Pizza pizzas={pizzas} addPizzas={addPizzas} formData={formData} updateFormData={updateFormData}/>
          <List pizzas={pizzas} setPizzas={addPizzas}/>
        </div>
    );
}

export default App;
