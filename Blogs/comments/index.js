const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express()
const commentsByPostId = {}

app.use(bodyParser.json())
app.use(cors())

app.get('/posts/:id/comments', (req, res) => {
 res.send(commentsByPostId[req.params.id])
})
app.post('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
  
    if (!content) {
      return res.status(400).send('Comment content is required.');
    }
  
    const comments = commentsByPostId[postId] || []; 
    
  
    comments.push({
      id: commentId,
      content,
    });
  
    commentsByPostId[postId] = comments; 

    axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        id: commentId, 
          content,
        postId: req
      }
    })



    res.status(201).send(comments);
  });
  

app.listen(4001, () => {
    console.log('listening in port 4001')
})