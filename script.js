// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize smooth scrolling for navigation
    initSmoothScrolling();
    
    // Initialize visitor counter
    initVisitorCounter();
    
    // Initialize clock
    initClock();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize calculator
    initCalculator();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Visitor counter functionality
function initVisitorCounter() {
    const visitorCountElement = document.getElementById('visitor-count');
    
    // Get or initialize visitor count from localStorage
    let visitorCount = localStorage.getItem('visitorCount');
    if (!visitorCount) {
        visitorCount = 0;
    }
    
    // Increment count for new session
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
    
    // Animate the counter
    animateCounter(visitorCountElement, 0, visitorCount, 1000);
}

// Animate counter from start to end value
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(start + (end - start) * progress);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Real-time clock
function initClock() {
    const timeDisplay = document.getElementById('time-display');
    
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        timeDisplay.textContent = timeString;
    }
    
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
}

// Calculator functionality
let calcDisplay = '';

function initCalculator() {
    const display = document.getElementById('calc-display');
    display.value = '0';
}

function appendToDisplay(value) {
    const display = document.getElementById('calc-display');
    
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else if (display.value === 'Error') {
        display.value = value;
    } else {
        display.value += value;
    }
    
    calcDisplay = display.value;
}

function clearDisplay() {
    const display = document.getElementById('calc-display');
    display.value = '0';
    calcDisplay = '';
}

function deleteLast() {
    const display = document.getElementById('calc-display');
    
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
    
    calcDisplay = display.value;
}

function calculate() {
    const display = document.getElementById('calc-display');
    
    try {
        // Replace × with * for evaluation
        const expression = display.value.replace(/×/g, '*');
        
        // Evaluate the expression safely
        const result = Function('"use strict"; return (' + expression + ')')();
        
        display.value = result;
        calcDisplay = result.toString();
    } catch (error) {
        display.value = 'Error';
        calcDisplay = '';
        
        // Reset after 2 seconds
        setTimeout(() => {
            clearDisplay();
        }, 2000);
    }
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('feedback-form');
    const messageDiv = document.getElementById('form-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Validate form
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // Simulate form submission
        showFormMessage('Sending...', 'success');
        
        setTimeout(() => {
            // Simulate successful submission
            showFormMessage('Thank you for your feedback! We will get back to you soon.', 'success');
            form.reset();
            
            // Store feedback in localStorage for demo purposes
            const feedback = {
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString()
            };
            
            let feedbackList = JSON.parse(localStorage.getItem('feedback') || '[]');
            feedbackList.push(feedback);
            localStorage.setItem('feedback', JSON.stringify(feedbackList));
            
        }, 1500);
    });
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('form-message');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Additional utility functions

// Get feedback from localStorage (for demo purposes)
function getFeedback() {
    return JSON.parse(localStorage.getItem('feedback') || '[]');
}

// Add some interactive animations
function addHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize hover effects after DOM load
document.addEventListener('DOMContentLoaded', addHoverEffects);

// Keyboard shortcuts for calculator
document.addEventListener('keydown', function(e) {
    const calcSection = document.getElementById('calculator');
    const isCalculatorVisible = calcSection.getBoundingClientRect().top < window.innerHeight && 
                               calcSection.getBoundingClientRect().bottom > 0;
    
    if (isCalculatorVisible) {
        switch(e.key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '+':
            case '-':
            case '*':
            case '/':
            case '.':
                e.preventDefault();
                appendToDisplay(e.key === '*' ? '×' : e.key);
                break;
            case 'Enter':
            case '=':
                e.preventDefault();
                calculate();
                break;
            case 'Escape':
            case 'c':
            case 'C':
                e.preventDefault();
                clearDisplay();
                break;
            case 'Backspace':
                e.preventDefault();
                deleteLast();
                break;
        }
    }
});