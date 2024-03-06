import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import shortid from 'shortid';
import * as path from 'path';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Define the path to the public directory relative to the root /app path
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: 'Please provide a URL' });
  }

  try {
    // Query the database to check if the provided originalUrl already has a shortUrl
    const client = await pool.connect();
    const result = await client.query('SELECT shorturl FROM urls WHERE originalurl = $1', [originalUrl]);

    if (result.rows.length > 0) {
      // If the original URL exists in the database, return the existing shortUrl
      const shortUrl = result.rows[0].shorturl;
      res.json({ shortenedUrl: shortUrl });
    } else {
      // If the original URL is not found, generate a unique shortUrl and insert into the database
      let shortUrl = shortid.generate();
      let isUnique = false;

      while (!isUnique) {
        const result = await client.query('SELECT shorturl FROM urls WHERE shorturl = $1', [shortUrl]);
        if (result.rows.length === 0) {
          isUnique = true;
        } else {
          shortUrl = shortid.generate();
        }
      }

      await client.query('INSERT INTO urls (originalurl, shorturl) VALUES ($1, $2)', [originalUrl, shortUrl]);
      client.release();
      
      res.json({ shortenedUrl: shortUrl });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error creating short URL' });
  }
});

// Route for redirecting the short URLs to the original URLs
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  const client = await pool.connect();
  const result = await client.query('SELECT originalurl FROM urls WHERE shorturl = $1', [shortUrl]);

  if (result.rows.length > 0) {
    res.redirect(result.rows[0].originalurl);
  } else {
    res.status(404).send('URL Not Found');
  }

  client.release();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
