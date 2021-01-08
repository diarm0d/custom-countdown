const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const datePicker = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60
const day = hour * 24;

// Set date input min with todays's date
const today = new Date().toISOString().split('T');
datePicker.setAttribute('min', today);

// UpdateDOM, populate countdown & complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        //Hide input
        inputContainer.hidden = true;
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
        // Populate Countdown
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEl.hidden = true;
        countdownEl. hidden = false;
    }
    }, second);
}

// Take values from form input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    }
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // Check for valid  date
    if (countdownDate === ''){
        alert('Please select a date for the countdown');
    } else {
    //get number version of currentDate, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
    }
}

// Reset all values
function reset() {
    // Hide countdown, show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // stop the  countdown
    clearInterval(countdownActive);
    // Reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}


function restoreCountdown() {
    // get countdown from local sotrage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date; 
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// Onload, check localStorage
restoreCountdown();