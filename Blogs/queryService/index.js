const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


const app = express();

const posts = {};
/*
posts === {
    'post id': {
        id:'postId',
        title: 'post title',
        comments: [
            {id: 'kkk', content: 'comment!' }
        ]

    }
}
*/

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
res.send(posts);
});

app.post('/events', (req, res) => {
    console.log('query service is running')
    const { type, data } = req.body;

    if(type === 'PostCreated') {
        const {id, title} = data;

        posts[id] = {id, title, comments: []};
        console.log('event recieved post created');
    }
    
    if (type === 'commentCreated') {
        const { id, content, postId } = data;
        console.log(data.content )

        const post = posts[postId];
        post.comments.push({ id, content });
        console.log('event recieved commentCreated', posts)
    }
     res.send({});
})

app.listen(4002, () => {
    console.log('query service listening at port 4002')
})