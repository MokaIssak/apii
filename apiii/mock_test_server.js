const express = require('express');
const app = express();
const PORT = 8090;

app.get('/primes', (req, res) => {
  res.json({ numbers: [2, 3, 5, 7, 11, 13, 17, 19, 23] });
});

app.get('/fibo', (req, res) => {
  res.json({ numbers: [1, 1, 2, 3, 5, 8, 13] });
});

app.get('/odd', (req, res) => {
  res.json({ numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23] });
});

app.get('/rand', (req, res) => {
  res.json({ numbers: [4, 6, 8, 10, 12] });
});

app.listen(PORT, () => {
  console.log(`Mock test server running on port ${PORT}`);
});
