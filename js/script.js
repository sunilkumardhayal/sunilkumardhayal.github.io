// Dark Mode Toggle Functionality
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
};

// Smooth Scrolling
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    element.scrollIntoView({ behavior: 'smooth' });
};

// Form Handling
const handleFormSubmission = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Add form processing logic here
};

// Intersection Observer Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
});

const elementsToObserve = document.querySelectorAll('.observe');

elementsToObserve.forEach(element => {
    observer.observe(element);
});

// Search Functionality
const searchFunctionality = () => {
    const searchInput = document.getElementById('search-input');
    const items = document.querySelectorAll('.item');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
};

// Call the functions to initialize functionalities
searchFunctionality();

// Add event listeners for form handling and dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
document.querySelector('form').addEventListener('submit', handleFormSubmission);