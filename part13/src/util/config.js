require('dotenv').config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET: process.env.JWT_SECRET,
  PORT: 3001,
};
