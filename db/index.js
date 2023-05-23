require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE
});
module.exports = {
    query: (text, params) => pool.query(text, params)
};
