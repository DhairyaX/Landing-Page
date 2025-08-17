// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scrolling
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

    // Color selection functionality for PlayStation section
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            // Add visual feedback
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
            }, 200);
        });
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.cta-button, .ps-cta-button, .ps-wishlist-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Parallax effect for decorative circles
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const circles = document.querySelectorAll('.circle');
        
        circles.forEach((circle, index) => {
            const speed = 0.5 + (index * 0.1);
            circle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add loading animation
    const heroSection = document.querySelector('.hero-section');
    const psSection = document.querySelector('.playstation-section');
    
    // Fade in hero section
    setTimeout(() => {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }, 100);
    
    // Fade in PlayStation section when scrolled to
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    if (psSection) {
        observer.observe(psSection);
    }

    // Add click functionality to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .ps-cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show success message (you can customize this)
            showNotification('Item added to cart!', 'success');
        });
    });

    // Wishlist button functionality
    const wishlistButton = document.querySelector('.ps-wishlist-button');
    if (wishlistButton) {
        wishlistButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Toggle wishlist state
            if (this.classList.contains('wishlisted')) {
                this.classList.remove('wishlisted');
                this.textContent = 'ADD TO WISHLIST';
                showNotification('Removed from wishlist', 'info');
            } else {
                this.classList.add('wishlisted');
                this.textContent = '✓ WISHLISTED';
                showNotification('Added to wishlist!', 'success');
            }
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-family: 'Barlow', sans-serif;
        font-weight: 500;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for initial animations
const style = document.createElement('style');
style.textContent = `
    .hero-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    .playstation-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    .circle {
        transition: transform 0.3s ease;
    }
    
    .color-option.active {
        border: 3px solid #FEF8F8;
        box-shadow: 0 0 10px rgba(254, 248, 248, 0.5);
    }
    
    .wishlisted {
        background: #4CAF50 !important;
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
        }
        to {
            transform: translateX(0);
        }
    }
`;

document.head.appendChild(style);