const express = require('express');
const app = express();
const cors = require('cors');
var multer = require('multer');
var upload = multer();
app.use(cors({ origin: '*' }));
app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.raw({ type: 'application/json', limit: '50mb' })); // Adjust the limit as needed

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(upload.array());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 413) {
    res.status(413).json({ error: 'Payload too large' });
  } else {
    next();
  }
});
const port = 8080
const http = require('http').Server(app);
const endPoints = {
  "bigbooster": [
    "https://goldfish-app-5zyca.ondigitalocean.app/",
    "https://goldfish-app-5zyca.ondigitalocean.app/"
  ],
  "bigbooster_8.0.2": [
    "https://goldfish-app-5zyca.ondigitalocean.app/"
  ],
  "rahuldeshwal": [
    "https://api.rahuldeshwal.bigbooster.in/",
  ],
  "bigbooster_saas": [
    "https://coral-app-kewpe.ondigitalocean.app/",
  ],
  "class12": [
    "https://api.class.bigbooster.in/12/",
  ],
  "class10": [
    "https://api.class.bigbooster.in/10/",
  ],
  "uppolice": [
    "https://api.uppolice.bigbooster.in/",
  ],
  "biharpolice": [
    "https://api-bihar-police.bigbooster.in/",
  ],
  "biharteacher": [
    "http://api.biharteacher.bigbooster.in/",
  ],
  "additional": [
    "https://api1.dishaonlinetest.in/",
  ],
}
const getEndPoints = (req, res) => {
  res.send(endPoints);
}

app.get('/', async (req, res) => {
  res.send("Running...")
})

app.get('/running-endpoints', async (req, res) => {
  getEndPoints(req, res)
})

http.listen(port, async () => {
  console.log(`server started at http://localhost:${port}/`);
});


