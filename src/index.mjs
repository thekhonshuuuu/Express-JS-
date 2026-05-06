import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const users = [
    { id: 1, username: "sangam", role: "user" },
    { id: 2, username: "ram", role: "user" },
    { id: 3, username: "hari", role: "user" },
    { id: 4, username: "sita", role: "user" },
    { id: 5, username: "pari", role: "user" }
];

app.get('/', (req, res) => {
    res.status(200).send({ msg: "hello" });
});

//GET method
app.get('/api/products', (req, res) => {
    res.send([
        { p_id: 1, name: "Soap", price: "$20" },
        { p_id: 2, name: "Noodles", price: "$40" },
        { p_id: 3, name: "Mouse", price: "$90" }
    ]);
});

//query param
app.get('/api/users', (req, res) => {
    const { filter, value } = req.query;

    if (!filter || !value) {
        return res.send(users);
    }

    const result = users.filter(user =>
        user[filter] &&
        String(user[filter]).toLowerCase().includes(value.toLowerCase())
    );

    return res.send(result);
});
//param
app.get('/api/users/:id', (req, res) => {
    const parseId = parseInt(req.params.id);

    if (isNaN(parseId)) {
        return res.status(400).send({ msg: "bad request" });
    }

    const finduser = users.find(user => user.id === parseId);

    if (!finduser) {
        return res.status(404).send({ msg: "User not found" });
    }

    return res.send(finduser);
});

//post
app.post('/api/users', (req, res) => {
    const newuser = {
        id: users[users.length - 1].id + 1,
        ...req.body
    };

    users.push(newuser);
    console.log(req.body);

    return res.status(201).send(newuser);
});

//put 
app.put('/api/users/:id', (request, response) => {
    const { body, params: { id } } = request;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
        return response.status(400).send("Bad request!");
    }

    const finduser = users.findIndex(user => user.id === parsedId);

    if (finduser === -1) {
        return response.status(404).send("User not found");
    }

    users[finduser] = { 
        id: parsedId ,
        ...body
    };

    return response.send(users[finduser]);
});

//patch
app.patch('/api/users/:id', (request,response) => {
    const { body , params: { id } } = request;
    const parsedId = parseInt(id);

    if(isNaN(parsedId)) return response.status(400).send("Bad request")

    const finduser = users.findIndex((user)=> parsedId === user.id);

    users[finduser] = { ...users[finduser], ...body }

    return response.send(users[finduser])
})

// delete

app.delete('/api/users/:id', (request,response)=>
{
    const { body , params: { id } } = request;
    const parsedId = parseInt(id);

    if(isNaN(parsedId)) return response.status(400).send("Bad request")

    const finduser = users.findIndex((user)=> parsedId === user.id);
    if(finduser === -1 ) return response.send("Bad request!")
    users.splice(finduser,1)
    return response.send(users)
})
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});