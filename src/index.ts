import express from 'express';

const app: express.Application = express();
const port: number = parseInt(process.env.PUNCH_TIME_PORT) || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
