const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const {randomBytes} = require('crypto');

const app = express();

app.use(bodyParser.json());
app.use(cors());


const comments = {};

app.get('/:postId/comments', (req, res) => {
    res.send(comments[req.params.postId]);
})

app.post('/:postId/comments', async (req, res) => {
    const postId = req.params.postId;
    const { content } = req.body;

   const commentId = randomBytes(4).toString('hex');

       const com = comments[req.params.id] || [];

       com.push({ id:commentId, content });

       comments[req.params.id] = com;
     


    try{
       await axios.post("http://localhost:4005/events", {
            type: 'commentCreated',
            data: {
                id: commentId,
                com,
                postId: postId
            }
        })

        res.status(201).send({ commentId, content });
    } catch (error) {
        console.error(error);
      
    }
});

app.post('/events', (req, res) => {
    console.log('Event Received:', req.body.type);

    res.send({});
});
app.listen(4001, () => {
    console.log('comments server listening in port 4001')
});
