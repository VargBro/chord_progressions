let currentId = null;

async function nextAudio() {
  document.getElementById('answer').innerHTML = '';
  const res = await fetch('/random');
  const data = await res.json();
  if (data.done) {
    document.getElementById('status').innerText = 'All done!';
    return;
  }
  currentId = data.id;
  const audio = document.getElementById('audio');
  audio.src = data.audio;
  audio.play();
}

function playAudio() {
  document.getElementById('audio').play();
}

async function showAnswer() {
  const res = await fetch(`/answer/${currentId}`);
  const data = await res.json();
  document.getElementById('answer').innerHTML =
    `<img src="${data.image}" alt="Answer" style="max-width: 300px;">`;
}

async function reportResult(correct) {
  await fetch('/correct', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: currentId, gotItRight: correct })
  });
  nextAudio();
}
