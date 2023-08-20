const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'quizz.html'));
});

app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'quizgame.html'));
});

app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'end.html'));
  });

app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'highscores.html'));
});

app.get('/game', (req, res) => {
  res.download(path.join(__dirname, 'kombat.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});