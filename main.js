// downloaded items

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const taskNumber = document.querySelector('span.number');
const today = document.querySelector('p.date');
const todayTime = document.querySelector('p.time');
const input = document.querySelector('input');
const taskList = document.getElementsByClassName('task');
const checkbox = document.getElementById('important');


// number of tasks and hard level

const hardLevel = () => {
    if (taskList.length > 0 && taskList.length < 3) {
        const spanEasy = document.createElement('span');
        spanEasy.className = 'easy';
        spanEasy.textContent = " - that's easy!"
        taskNumber.appendChild(spanEasy);
    } else if (taskList.length >= 3 && taskList.length < 6) {
        const spanMedium = document.createElement('span');
        spanMedium.className = 'medium';
        spanMedium.textContent = " - I don't know if you can make it :("
        taskNumber.appendChild(spanMedium);
    } else if (taskList.length >= 6) {
        const spanHard = document.createElement('span');
        spanHard.className = 'hard';
        spanHard.textContent = " - OMG! Spread it over three days!"
        taskNumber.appendChild(spanHard);
    }
}

// adding items

const addTask = (e) => {
    e.preventDefault();
    const taskTitle = input.value;
    if (taskTitle === "") {
        alert('Wprowadź zadanie!');
        return;
    };
    const task = document.createElement('li');
    task.className = 'task';
    task.innerHTML = taskTitle + " <button>X</button>";
    ul.appendChild(task);
    if (checkbox.checked == true) {
        task.style.backgroundColor = "#f7c9c9"
        task.style.borderRadius = "50px"; 
    };
    checkbox.checked = false;
    input.value = "";
    taskNumber.textContent = taskList.length;
    hardLevel();
    task.querySelector('button').addEventListener('click', removeTask);
}


// removing items

const removeTask = (e) => {
    e.target.parentNode.remove();
    taskNumber.textContent = taskList.length;
    hardLevel();
}

// date

const calendar = () => {
    let date = new Date()
    let day = date.getDate();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();
    today.textContent = `${day}.${month}.${year}r.`;
}

// clock

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    todayTime.textContent = `${h} : ${m} : ${s}`;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}

// calling functions

window.onload = calendar(), startTime();
form.addEventListener('submit', addTask);