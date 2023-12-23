const express = require('express');
const app = express();
const cors = require('cors')
const fs = require('fs');
app.use(express.json());
app.use(cors('http://localhost:3001'))

let commentData = [];

try {
    commentData = fs.readFileSync('commentsFile.js')
    commentData = JSON.parse(commentData)
} catch(err) {
    console.log(err)
}
// REST architecture is stateless


app.get('/commentData', (req, res) => {
    res.send(commentData);
});

app.post('/addComment', (req, res) => {
    commentData.unshift({
        comment: req.body.input,
        replies: []
    });
    writeFile(res)
})

app.post('/setComment', (req, res) => {
    let indices = req.body.indices;
    let input = req.body.input;
    let replies = [...commentData];
    indices.forEach(index => {
      replies = replies[index].replies; 
    });
    replies.push({comment: input, replies: []});
    writeFile(res)
})

function writeFile(res) {
    fs.writeFile('commentsFile.js', JSON.stringify(commentData), (err) => {
        if (err) {
            console.error(err);
            res.status(500);
        } else {
            res.status(200).send(commentData);
        }
    });
}


app.listen(3000, () => {
    console.log('Listening on port 3000...')
})