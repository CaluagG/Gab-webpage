// JavaScript Features for TechSolutions Website

// Feature 1: Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navbarNav = document.getElementById('navbarNav');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navbarNav.classList.toggle('show');
        });
    }
});

// Feature 2: Dynamic Greeting Based on Time of Day
function displayGreeting() {
    const greetingElement = document.getElementById('greeting');
    
    if (greetingElement) {
        const currentHour = new Date().getHours();
        let greeting = '';
        
        if (currentHour >= 5 && currentHour < 12) {
            greeting = '☀️ Good Morning! Ready to build something amazing?';
        } else if (currentHour >= 12 && currentHour < 17) {
            greeting = '🌤️ Good Afternoon! Let\'s create something great together.';
        } else if (currentHour >= 17 && currentHour < 21) {
            greeting = '🌆 Good Evening! Still working hard on your projects?';
        } else {
            greeting = '🌙 Good Night! Burning the midnight oil?';
        }
        
        greetingElement.textContent = greeting;
    }
}

// Feature 3: Display Current Date and Time
function updateDateTime() {
    const dateTimeElement = document.getElementById('currentDateTime');
    
    if (dateTimeElement) {
        const now = new Date();
        
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        
        const formattedDateTime = now.toLocaleDateString('en-US', options);
        dateTimeElement.textContent = formattedDateTime;
    }
}

// Feature 4: Display Current Year in Footer
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Feature 5: Form Validation (Contact Page)
function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const serviceSelect = document.getElementById('service');
    const messageTextarea = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Phone validation regex (flexible format)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    
    // Custom validation function
    function validateField(input, validationFn, errorMsg) {
        if (!validationFn(input.value)) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            return false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            return true;
        }
    }
    
    // Real-time validation for full name
    fullNameInput.addEventListener('blur', function() {
        validateField(this, 
            value => value.trim().length >= 2,
            'Please enter your full name'
        );
    });
    
    // Real-time validation for email
    emailInput.addEventListener('blur', function() {
        validateField(this,
            value => emailRegex.test(value),
            'Please enter a valid email address'
        );
    });
    
    // Real-time validation for phone (optional field)
    phoneInput.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            validateField(this,
                value => phoneRegex.test(value) && value.length >= 10,
                'Please enter a valid phone number'
            );
        } else {
            this.classList.remove('is-invalid', 'is-valid');
        }
    });
    
    // Real-time validation for service selection
    serviceSelect.addEventListener('change', function() {
        validateField(this,
            value => value !== '',
            'Please select a service'
        );
    });
    
    // Real-time validation for message
    messageTextarea.addEventListener('blur', function() {
        validateField(this,
            value => value.trim().length >= 10,
            'Please enter a message (minimum 10 characters)'
        );
    });
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous messages
        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');
        
        // Validate all fields
        let isValid = true;
        
        // Validate full name
        if (!validateField(fullNameInput, 
            value => value.trim().length >= 2,
            'Please enter your full name')) {
            isValid = false;
        }
        
        // Validate email
        if (!validateField(emailInput,
            value => emailRegex.test(value),
            'Please enter a valid email address')) {
            isValid = false;
        }
        
        // Validate phone if provided
        if (phoneInput.value.trim() !== '') {
            if (!validateField(phoneInput,
                value => phoneRegex.test(value) && value.length >= 10,
                'Please enter a valid phone number')) {
                isValid = false;
            }
        }
        
        // Validate service selection
        if (!validateField(serviceSelect,
            value => value !== '',
            'Please select a service')) {
            isValid = false;
        }
        
        // Validate message
        if (!validateField(messageTextarea,
            value => value.trim().length >= 10,
            'Please enter a message (minimum 10 characters)')) {
            isValid = false;
        }
        
        // If form is valid, simulate submission
        if (isValid) {
            // Show loading state
            submitText.classList.add('d-none');
            submitSpinner.classList.remove('d-none');
            
            // Simulate API call with timeout
            setTimeout(function() {
                // Hide loading state
                submitText.classList.remove('d-none');
                submitSpinner.classList.add('d-none');
                
                // Show success message
                successMessage.classList.remove('d-none');
                
                // Reset form
                contactForm.reset();
                
                // Remove validation classes
                const inputs = contactForm.querySelectorAll('.form-control, .form-select');
                inputs.forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.classList.add('d-none');
                }, 5000);
            }, 1500);
        } else {
            // Show error message
            errorText.textContent = 'Please fill in all required fields correctly.';
            errorMessage.classList.remove('d-none');
            
            // Scroll to first invalid field
            const firstInvalid = contactForm.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalid.focus();
            }
        }
    });
}

// Feature 6: Smooth Scroll for Anchor Links
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Feature 7: Navbar Background Change on Scroll
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = '';
                navbar.style.backdropFilter = '';
            }
        });
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Display greeting
    displayGreeting();
    
    // Update and display current date/time
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second
    
    // Update current year in footer
    updateCurrentYear();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize smooth scroll
    initializeSmoothScroll();
    
    // Initialize navbar scroll effect
    initializeNavbarScroll();
    
    // Add fade-in animation to elements
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .contact-info-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Console message for developers
console.log('%c👋 Welcome to TechSolutions!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cInterested in how this site works? Check out our code!', 'color: #764ba2; font-size: 14px;');