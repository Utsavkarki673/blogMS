const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const commentsByPostId = {}

app.use(bodyParser.json())
app.use(cors())

app.get('/posts/:id/comments', (req, res) => {
 res.send(commentsByPostId[req.params.id])
})
app.post('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;
  
    if (!content) {
      return res.status(400).send('Comment content is required.');
    }
  
    const comments = commentsByPostId[postId] || []; 
    const id = randomBytes(4).toString('hex');
  
    comments.push({
      id: id,
      content,
    });
  
    commentsByPostId[postId] = comments; 
    res.status(201).send(comments);
  });
  

app.listen(4001, () => {
    console.log('listening in port 4001')
})