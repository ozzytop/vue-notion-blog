const express = require('express');
const request = require('request');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://mpblog.me'
}));

// Load env vars
dotenv.config({
    path: '../config/config.env'
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/jokes/random', (req, res) => {
    request(
        { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error });
            }
            res.json(JSON.parse(body));
        }
    )
});

// GET method route
app.get('/secret', (req, res) => {
    res.send('GET request to the homepage')
})

app.get('/keys', (req, res) => {
    res.send(process.env.NOTION_API_KEY)
})


// Get Notion databases information
app.get('/api/databases', (req, res) => {

    request.post(
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
                'Notion-Version': '2022-06-28'
            }, 
            url: 'https://api.notion.com/v1/databases/50877290e7e84b33912d7981ce44c65c/query' 
        },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error });
            }
            res.json(JSON.parse(body));
        }
    )

});

// Get Notion single database
app.get('/api/pages/:id', (req, res) => {
    
    request.get(
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
                'Notion-Version': '2022-06-28'
            }, 
            url: `https://api.notion.com/v1/pages/${ req.params.id }`
            
        },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: response });
            }
            res.json(JSON.parse(body));
        }
    )

});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));