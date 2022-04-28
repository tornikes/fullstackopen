require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const Blog = require('./models/Blog');

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  res.send(blogs);
});

app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByPk(id);
  if (blog) {
    return res.send(blog);
  } else {
    return res.status(404).send({ message: 'Blog not found' });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.send(blog);
  } catch {
    return res.status(400).send({ message: 'Bad request' });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    await blog.destroy();
  }
  return res.status(200).send({ message: 'Removed' });
});

async function main() {
  await Blog.sync();
  app.listen(3001, () => {
    console.log(`Server started at port 3001`);
  });
}

main();
