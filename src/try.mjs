import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("Animalia!");
});

const animals = [
    { breed: "golden retriever", class: "dog", rarity: 1 },
    { breed: "Wolf", class: "dog", rarity: 3 },
    { breed: "Monkey", class: "apes", rarity: 3 },
    { breed: "snow leopard", class: "cat", rarity: 4 },
];

const PORT = 4000;

app.get('/api/animals', (request, response) => {
    console.log(request.query);
    const
        {
            filter,value
        } = request.query;

    if(!filter || !value) return response.status(400).send("No users found!")
    else return response.send(animals.filter((animal)=>String(animal[filter]).includes(value)));

    response.send(animals);
});

app.get('/api/animals/:rarity', (request, response) => {
    const rarity = parseInt(request.params.rarity);

    if (isNaN(rarity)) {
        return response.status(400).send("Invalid rarity");
    }

    const found = animals.find(animal => animal.rarity === rarity);

    if (found) {
        return response.send(found);
    } else {
        return response.status(404).send("Animal not found");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});