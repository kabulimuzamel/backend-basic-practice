const express = require('express');
const { readdir, readFile } = require('node:fs/promises');
const app = express();
app.use(express.json());

// First

app.get('/greeting', (req, res) => {
    res.send('Hello World!');
});

// Second 

app.post('/getwhatyougive', (req, res) => {
    res.send(req.body);
});

// Third

app.get('/readpath/:path', async (req,res) => {
    try {
        const files = await readdir(`${req.params.path}`);
        res.send(files);
    } catch (err) {
        res.send(err);
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000...')
})