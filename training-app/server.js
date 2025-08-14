const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

let correctSet = new Set();

app.get('/random', (req, res) => {
  const files = fs.readdirSync('./public/assets').filter(f => f.endsWith('.mp3'));
  const unused = files
    .map(f => f.replace('.mp3', ''))
    .filter(f => !correctSet.has(f));

  if (unused.length === 0) {
    return res.json({ done: true });
  }

  const rand = unused[Math.floor(Math.random() * unused.length)];
  res.json({ id: rand, audio: `/assets/${rand}.mp3` });
});

app.post('/correct', (req, res) => {
  const { id, gotItRight } = req.body;
  if (gotItRight) correctSet.add(id);
  res.sendStatus(200);
});

app.get('/answer/:id', (req, res) => {
  const path = `/assets/${req.params.id}.png`;
  res.json({ image: path });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
