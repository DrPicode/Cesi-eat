const express = require('express')
const { Pool } = require('pg');
const app = express()
const port = 8080

const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'postgres',
    password: 'ccem',
    port: 5432,
  });
  
  app.use(express.json());

  async function createTestTable() {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS test (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL);
      `;
  
      await pool.query(query);
      console.log('Test table created');
    } catch (err) {
      console.error(err);
      console.error('Test table creation failed');
    }
  }
  
  createTestTable();

