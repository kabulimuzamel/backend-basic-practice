const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());

let commentData = [];

// let commentData = [
//     {
//         comment: 'That is beautiful',
//         replies: [
//             {
//                 comment: 'That is beautiful',
//                 replies: []
//             },
//         ]
//     },
//     {
//         comment: 'That is beautiful',
//         replies: [
//             {
//                 comment: 'That is beautiful',
//                 replies: []
//             },
//             {
//                 comment: 'That is beautiful',
//                 replies: []
//             }
//         ]
//     },
//     {
//         comment: 'That is beautiful',
//         replies: [
//             {
//                 comment: 'That is beautiful',
//                 replies: []
//             },
//             {
//                 comment: 'That is beautiful',
//                 replies: []
//             },
//             {
//                 comment: 'That is beautiful',
//                 replies: []
//             }
//         ]
//     }
// ];

app.use(cors('http://localhost:3001'))

app.get('/commentData', (req, res) => {
    res.send(commentData);
});

app.post('/addComment', (req, res) => {
    commentData.push({
        comment: req.body.input,
        replies: []
    });

    res.status(200);
})

app.post('/setComment', (req, res) => {
    let indices = req.body.indices;
    let input = req.body.input;
    let replies = [...commentData];
    indices.forEach(index => {
      replies = replies[index].replies; 
    });
    replies.push({comment: input, replies: []});
    res.status(200).send(commentData);
})



app.listen(3000, () => {
    console.log('Listening on port 3000...')
})