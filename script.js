// JavaScript functionality for BMSCE Workshop
document.addEventListener('DOMContentLoaded', function() {
    console.log('BMSCE Workshop JavaScript loaded successfully!');
    
    // Add current date and time display
    function updateDateTime() {
        const now = new Date();
        const dateTimeString = now.toLocaleString();
        const dateTimeElement = document.getElementById('datetime');
        if (dateTimeElement) {
            dateTimeElement.textContent = `Current Time: ${dateTimeString}`;
        }
    }
    
    // Interactive button functionality
    function setupInteractiveElements() {
        const button = document.getElementById('interactive-btn');
        const counter = document.getElementById('counter');
        let clickCount = 0;
        
        if (button && counter) {
            button.addEventListener('click', function() {
                clickCount++;
                counter.textContent = clickCount;
                
                // Change button color based on clicks
                if (clickCount % 5 === 0) {
                    button.style.backgroundColor = '#28a745';
                    button.textContent = 'Great job! Keep clicking!';
                    setTimeout(() => {
                        button.style.backgroundColor = '#007bff';
                        button.textContent = 'Click me!';
                    }, 1000);
                }
            });
        }
    }
    
    // Background color changer
    function setupColorChanger() {
        const colorBtn = document.getElementById('color-btn');
        const colors = ['#f4f4f4', '#e8f5e8', '#e8f4fd', '#fff8e1', '#fce4ec'];
        let colorIndex = 0;
        
        if (colorBtn) {
            colorBtn.addEventListener('click', function() {
                colorIndex = (colorIndex + 1) % colors.length;
                document.body.style.backgroundColor = colors[colorIndex];
            });
        }
    }
    
    // Text animation
    function animateTitle() {
        const title = document.querySelector('h1');
        if (title) {
            title.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.1)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            title.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
            });
        }
    }
    
    // Initialize all functionality
    updateDateTime();
    setupInteractiveElements();
    setupColorChanger();
    animateTitle();
    
    // Update time every second
    setInterval(updateDateTime, 1000);
    
    // Display a welcome message
    setTimeout(() => {
        const welcomeMsg = document.getElementById('welcome-message');
        if (welcomeMsg) {
            welcomeMsg.style.opacity = '1';
            welcomeMsg.style.transform = 'translateY(0)';
        }
    }, 500);
});