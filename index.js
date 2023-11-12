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

// There is a difference between query and params
    // query param = /readpath?path=sdkfaslf
    // req param = /readpath/:path

app.get('/readpath', async (req,res) => {
    try {
        const files = await readdir(`${req.query.path}`);
        res.send(files);
    } catch (err) {
        res.send(err);
    }
});



app.listen(3000, () => {
    console.log('Listening on port 3000...')
})