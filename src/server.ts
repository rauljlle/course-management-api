import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('It\'s alive! \n Hire me, please');
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});