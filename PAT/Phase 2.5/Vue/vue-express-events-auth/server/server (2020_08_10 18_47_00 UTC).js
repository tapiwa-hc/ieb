const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require("express-jwt"); // NEW
const jwksRsa = require("jwks-rsa"); // NEW

const app = express();
const port = 8000;
const authConfig = {
  domain: "thckwn.us.auth0.com",
  audience: "https://vue-express-api.com"
};


app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const checkJwt = jwt({
  // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  // Validate the audience (Identifier) and the issuer (Domain).
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"]
});

let events = 
[
  {
    id: 1,
    name: 'Charity Ball',
    category: 'Fundraising',
    description: 'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
    featuredImage: 'https://placekitten.com/500/500',
    images: [
      'https://placekitten.com/500/500',
      'https://placekitten.com/500/500',
      'https://placekitten.com/500/500',
    ],
    location: '1234 Fancy Ave',
    date: '12-25-2019',
    time: '11:30'
  },
  {
    id: 2,
    name: 'Rescue Center Goods Drive',
    category: 'Adoptions',
    description: 'Come to our donation drive to help us replenish our stock of pet food, toys, bedding, etc. We will have live bands, games, food trucks, and much more.',
    featuredImage: 'https://placekitten.com/500/500',
    images: [
      'https://placekitten.com/500/500'
    ],
    location: '1234 Dog Alley',
    date: '11-21-2019',
    time: '12:00'
  }
];

app.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${port}`)
});

app.get('/events', (req, res) => {
  res.send(events);
});

// NEW (updated)
// For this app, we only want to protect the route that returns the details of an event
app.get('/events/:id', checkJwt, (req, res) => {
  const id = Number(req.params.id);
  const event = events.find(event => event.id === id);
  res.send(event);
});

// listen on the port
app.listen(port);