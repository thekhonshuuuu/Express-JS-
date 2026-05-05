import express from "express"

const app = express();
app.use(express.json)

const PORT = process.env.PORT || 4000;

const users = [{ id: 1, username: "sangam" , role: "user"},
        { id: 2, username: "ram" , role: "user"},
        { id: 3, username: "hari" , role: "user"},
        { id: 4, username: "sita" , role: "user"},
        { id: 5, username: "pari" , role: "user"}
    ]
app.get('/', (request, response) => {
    response.status(200).send({msg: "hello"});
})

app.get('/api/products', (req, res) =>
{
    res.send([{p_id: 1, name: "Soap", price: "$20"},
        {p_id: 2, name: "Noodles", price: "$40"},
        {p_id: 3, name: "Mouse", price: "$90"}
    ]);
});


app.post('/api/users', (request,response) =>
{
    const {body} = request;
    const newuser = { id: users[users.length].id+1 , ...body}
    users.push(newuser)
    console.log(response.body);
    return response.send(newuser)

})



app.get('/api/users', (request, response) =>
{
    console.log(request.query);

    const {
         query: { filter, value } 
        } = request;

    if(!filter && ! value) return response.send(users);

    if(filter && value) return response.send(
        users.filter((user) => user[filter].includes(value))
    );
    
    response.send(users);
});

app.get('/api/users/:id', (request,response) =>
{
    console.log(request.params);
    const parseId = parseInt(request.params.id);
    console.log(parseId);

    if(isNaN(parseId)) return response.status(400).send({msg: "bad request"})
    
    const finduser = users.find((user) => user.id == parseId)

    if(!finduser) return response.statusCode(404)
    
    return response.send(finduser);
}
);
app.listen(PORT,
    ()=>
    {
        console.log(`Displaying in the port ${PORT}`);
    }
); 