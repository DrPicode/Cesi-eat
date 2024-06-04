const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 8080;

const pool = new Pool({
  user: 'user',
  host: 'localhost', 
  database: 'CesiEats',
  password: 'ccem',
  port: 5432,
});

app.use(express.json());

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to the database');
  release();
});

async function createTestTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS test (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      );
    `;

    await pool.query(query);
    console.log('Test table created');
  } catch (err) {
    console.error(err);
    console.error('Test table creation failed');
  }
}

createTestTable();

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// API POST


app.post('/test', async (req, res) => {
  // Validate the incoming JSON data
  const { title } = req.body;
  console.log(req.body);
  if (!title) {
    return res.status(400).send('One of the title is missing in the data');
  }

  try {
    // try to send data to the database
    const query = `
      INSERT INTO test (title)
      VALUES ($1)
      RETURNING id;
    `;
    const values = [title];

    const result = await pool.query(query, values);
    res.status(201).send({ message: 'New Test created', TestId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send('some error has occured');
  }
});
