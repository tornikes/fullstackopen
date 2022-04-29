require('dotenv').config();
const { connectToDatabase } = require('./util/db');
const { PORT } = require('./util/config');

require('express-async-errors');

const express = require('express');
const app = express();

app.use(express.json());

const blogsRouter = require('./controllers/blogs');
const errorHandler = require('./errors/errorHandler');

app.use('/api/blogs', blogsRouter);

app.use(errorHandler);

async function main() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server started at port PORT`);
  });
}

main();
