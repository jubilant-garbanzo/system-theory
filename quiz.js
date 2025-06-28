const canvas = document.getElementById("quizCanvas");
const ctx = canvas.getContext("2d");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

let correctAnswers = [];
let taskIndex = 0;

const tasks = [
  { G: [[0, 0], [1, 1], [2, 2], [3, 3]], correct: ["Функциональное"] },
  { G: [[0, 1], [1, 1], [2, 2], [3, 3]], correct: ["Функциональное"] },
  { G: [[0, 0], [1, 0], [2, 2]], correct: ["Функциональное"] },
  { G: [[0, 2], [1, 2], [2, 3]], correct: ["Функциональное"] },
  { G: [[0, 1], [1, 1]], correct: ["Функциональное"] },

  { G: [[0, 0], [1, 1], [2, 2], [3, 3]], correct: ["Функциональное", "Инъекция", "Сюръекция", "Биекция"] },
  { G: [[0, 1], [1, 2], [2, 3]], correct: ["Функциональное", "Инъекция"] },
  { G: [[0, 0], [1, 1], [2, 2]], correct: ["Функциональное", "Инъекция"] },
  { G: [[0, 3], [1, 0], [2, 2]], correct: ["Функциональное", "Инъекция"] },
  { G: [[0, 1], [1, 2], [2, 3], [3, 0]], correct: ["Функциональное", "Инъекция", "Сюръекция", "Биекция"] },

  { G: [[0, 2], [1, 0], [2, 1], [3, 3]], correct: ["Функциональное", "Инъекция", "Сюръекция", "Биекция"] },
  { G: [[0, 0], [1, 1], [2, 2], [3, 0]], correct: ["Функциональное", "Сюръекция"] },
  { G: [[0, 1], [1, 2], [2, 3], [3, 2]], correct: ["Функциональное", "Сюръекция"] },
  { G: [[0, 3], [1, 2], [2, 1], [3, 0]], correct: ["Функциональное", "Инъекция", "Сюръекция", "Биекция"] },
  { G: [[0, 2], [1, 1], [2, 0], [3, 3]], correct: ["Функциональное", "Инъекция", "Сюръекция", "Биекция"] },

  { G: [[0, 1], [1, 2], [2, 3], [3, 0]], correct: ["Функциональное", "Инъекция", "Сюръекция", "Биекция"] },
  { G: [[0, 0], [1, 3], [2, 2], [3, 1]], correct: ["Функциональное", "Инъекция", "Сюръекция", "Биекция"] },
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(tasks);

function drawQuiz() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  answersDiv.innerHTML = "";
  resultDiv.textContent = "";
  nextBtn.style.display = "none";

  const margin = 150;
  const radius = 15;
  const A = [], B = [];

  for (let i = 0; i < 4; i++) {
    A.push({ x: margin, y: 60 + i * 80 });
    B.push({ x: canvas.width - margin, y: 60 + i * 80 });
  }

  const task = tasks[taskIndex % tasks.length];
  const G = task.G;
  correctAnswers = task.correct;
  taskIndex++;

  ctx.fillStyle = "black";
  A.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText("x" + (i + 1), p.x - 20, p.y + 5);
  });

  B.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText("y" + (i + 1), p.x + 10, p.y + 5);
  });

  ctx.strokeStyle = "blue";
  G.forEach(([i, j]) => {
    ctx.beginPath();
    ctx.moveTo(A[i].x, A[i].y);
    ctx.lineTo(B[j].x, B[j].y);
    ctx.stroke();
  });

  ["Функциональное", "Инъекция", "Сюръекция", "Биекция"].forEach(type => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "answer";
    input.value = type;
    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + type));
    answersDiv.appendChild(label);
  });
}

checkBtn.onclick = () => {
  const checked = Array.from(document.querySelectorAll('input[name="answer"]:checked')).map(el => el.value);
  if (checked.length === 0) {
    resultDiv.textContent = "Выберите хотя бы один вариант.";
    return;
  }

  const selectedSet = new Set(checked);
  const correctSet = new Set(correctAnswers);

  const isCorrect = selectedSet.size === correctSet.size && [...selectedSet].every(val => correctSet.has(val));

  if (isCorrect) {
    resultDiv.textContent = "✅ Верно!";
    resultDiv.style.color = "green";
  } else {
    resultDiv.textContent = `❌ Неверно. Правильный ответ: ${correctAnswers.join(", ")}`;
    resultDiv.style.color = "darkred";
  }

  nextBtn.style.display = "inline-block";
};

nextBtn.onclick = drawQuiz;

backBtn.onclick = () => {
  window.location.href = "maps.html";
};

drawQuiz();