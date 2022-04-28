require('dotenv').config();

const Blog = require('./models/Blog');

async function main() {
  const blogs = await Blog.findAll();
  console.log(blogs);
}

main();
