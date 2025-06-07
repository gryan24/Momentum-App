const greeting = document.getElementById('greeting');
const timeEl = document.getElementById('time');
const quoteDisplay = document.getElementById('quoteDisplay');
const todoList = document.getElementById('todoList');
const todoPane = document.getElementById('gawain');
const nameInput = document.getElementById('nameInput');
const focusInput = document.getElementById('focusInput');
const focusDisplay = document.getElementById('focusDisplay');

let quotes = [
  "Believe you can and you're halfway there.",
  "You are stronger than you think.",
  "Push yourself, because no one else is going to do it for you."
];

const images = [
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2340&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2340&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2340&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2340&auto=format&fit=crop"
];

const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');
let currentImage = 0;
let showingBg1 = true;
let quoteIndex = 0;

function rotateBackground() {
  const nextImage = images[currentImage];
  if (showingBg1) {
    bg2.style.backgroundImage = `url('${nextImage}')`;
    bg2.classList.add('active');
    bg1.classList.remove('active');
  } else {
    bg1.style.backgroundImage = `url('${nextImage}')`;
    bg1.classList.add('active');
    bg2.classList.remove('active');
  }
  showingBg1 = !showingBg1;
  currentImage = (currentImage + 1) % images.length;
}

function updateTime() {
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString();
}

function toggleBox(boxId) {
  const box = document.getElementById(boxId);
  box.style.display = box.style.display === 'none' || box.style.display === '' ? 'block' : 'none';
}

function saveName() {
  const name = nameInput.value.trim();
  if (name) {
    greeting.textContent = `Hello, ${name}!`;
    document.getElementById('nameBox').style.display = 'none';
  }
}

function saveFocus() {
  const focus = focusInput.value.trim();
  if (focus) {
    focusDisplay.textContent = `Today: ${focus}`;
    document.getElementById('focusBox').style.display = 'none';
  }
}

function toggleTodoPane() {
  todoPane.classList.toggle('active');
}

function addTodo() {
  const todoInput = document.getElementById('todoInput');
  const task = todoInput.value.trim();
  if (task) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task;

    const checkBtn = document.createElement('button');
    checkBtn.textContent = '✔';
    checkBtn.onclick = () => span.style.textDecoration = span.style.textDecoration === 'line-through' ? '' : 'line-through';

    const editBtn = document.createElement('button');
    editBtn.textContent = '✎';
    editBtn.onclick = () => {
      const newTask = prompt('Edit task:', span.textContent);
      if (newTask !== null) span.textContent = newTask;
    };

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✖';
    removeBtn.onclick = () => li.remove();

    li.appendChild(span);
    li.appendChild(checkBtn);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);

    todoList.appendChild(li);
    todoInput.value = '';
  }
}

function addQuote() {
  const newQuoteInput = document.getElementById('newQuote');
  const newQuote = newQuoteInput.value.trim();
  if (newQuote) {
    quotes.push(newQuote);
    newQuoteInput.value = '';
  }
}

function cycleQuotes() {
  if (quotes.length > 0) {
    quoteDisplay.textContent = quotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }
}

function init() {
  updateTime();
  cycleQuotes();
  rotateBackground();
  setInterval(updateTime, 1000);
  setInterval(rotateBackground, 7000);
  setInterval(cycleQuotes, 7000);
}

init();