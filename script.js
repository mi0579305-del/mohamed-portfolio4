// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Initialize Application
function initApp() {
    // Initialize booking modal
    initBookingModal();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Initialize booking form
    initBookingForm();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize authentication buttons
    initAuthButtons();
}

// Initialize Booking Modal
function initBookingModal() {
    const modal = document.getElementById('bookingModal');
    const bookButtons = document.querySelectorAll('.btn-book');
    const closeButton = document.querySelector('.close');

    if (!modal) return;

    // Open modal when book buttons are clicked
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal when close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            
            // Simple validation
            if (!name || !email) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Simulate form submission
            showNotification('تم إرسال رسالتك بنجاح، سنتواصل معك قريباً!', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Initialize Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value.trim() : '';
            
            // Simple email validation
            if (!validateEmail(email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }
            
            // Simulate subscription
            showNotification('تم الاشتراك في النشرة البريدية بنجاح!', 'success');
            
            // Reset form
            if (emailInput) emailInput.value = '';
        });
    }
}

// Initialize Booking Form
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        const packageSelect = document.getElementById('package');
        const travelersInput = document.getElementById('travelers');
        const totalInput = document.getElementById('total');
        
        // Update total when package or travelers change
        if (packageSelect) {
            packageSelect.addEventListener('change', updateTotal);
        }
        
        if (travelersInput) {
            travelersInput.addEventListener('input', updateTotal);
        }
        
        // Handle form submission
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const destinationInput = document.getElementById('destination');
            const dateInput = document.getElementById('date');
            const paymentInput = document.getElementById('payment');

            const destination = destinationInput ? destinationInput.value.trim() : '';
            const packageValue = packageSelect ? packageSelect.value : '';
            const travelers = travelersInput ? parseInt(travelersInput.value, 10) || 0 : 0;
            const date = dateInput ? dateInput.value : '';
            const payment = paymentInput ? paymentInput.value : '';
            
            // Validation
            if (!destination || !packageValue || !date || !payment) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Calculate total
            const packagePrices = {
                'أساسية': 499,
                'مميزة': 899,
                'ذهبية': 1299
            };
            
            const unitPrice = packagePrices[packageValue] || 0;
            const total = unitPrice * travelers;
            
            // Simulate booking process (use template literal)
            showNotification(
                `تم تأكيد حجزك لرحلة إلى ${destination}!\nالباقة: ${packageValue}\nعدد المسافرين: ${travelers}\nتاريخ السفر: ${date}\nطريقة الدفع: ${payment}\nالمبلغ الإجمالي: $${total}`,
                'success'
            );
            
            // Close modal if exists
            const modal = document.getElementById('bookingModal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            // Reset form
            bookingForm.reset();
            updateTotal();
        });
        
        // Initialize total
        updateTotal();
    }
}

// Update Total Price
function updateTotal() {
    const packageSelect = document.getElementById('package');
    const travelersInput = document.getElementById('travelers');
    const totalInput = document.getElementById('total');
    
    if (packageSelect && travelersInput && totalInput) {
        const packagePrices = {
            'أساسية': 499,
            'مميزة': 899,
            'ذهبية': 1299
        };
        
        const packageValue = packageSelect.value;
        const travelers = parseInt(travelersInput.value, 10) || 0;
        
        if (packageValue && packagePrices[packageValue]) {
            const total = packagePrices[packageValue] * travelers;
            totalInput.value = `$${total}`;
        } else {
            totalInput.value = '$0';
        }
    }
}

// Initialize Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize Authentication Buttons
function initAuthButtons() {
    const loginBtn = document.querySelector('.btn-login');
}