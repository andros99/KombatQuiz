class ScrollEffects {
    constructor() {
        // Initialize event listeners when a new instance of the class is created
        this.initializeListeners();
    }

    initializeListeners() {
        // Add an event listener for the scroll event
        window.addEventListener("scroll", this.scrollBackground.bind(this));
        
        // Add mouseover and mouseout event listeners for the image button
        const imageButton = document.querySelector('img[alt="Image button"]');
        imageButton.addEventListener('mouseover', this.pulseEffect.bind(this, "running"));
        imageButton.addEventListener('mouseout', this.pulseEffect.bind(this, "paused"));

        // Add an event listener for the scroll event to update the scrollbar width
        window.addEventListener('scroll', this.percentScrollbar.bind(this));
    }

    scrollBackground() {
        // Get the current scroll position
        const scrollPos = window.scrollY;

        // Get the background elements
        const backgroundOne = document.getElementById("background-one");
        const backgroundTwo = document.getElementById("background-two");

        // Check if the scroll position is greater than 60% of the viewport height
        if (scrollPos > window.innerHeight * 0.6) {
            backgroundOne.style.opacity = 0;
            backgroundTwo.style.opacity = 1;
        } else {
            backgroundOne.style.opacity = 1;
            backgroundTwo.style.opacity = 0;
        }
    }

    pulseEffect(animationState) {
        const imageButton = document.querySelector('img[alt="Image button"]');
        imageButton.style.animationPlayState = animationState;
    }

    percentScrollbar() {
        // Get the current scroll position of the page
        const scrollPosition = window.scrollY;

        // Get the total height of the page
        const totalHeight = document.body.scrollHeight - window.innerHeight;

        // Calculate the percentage of the page scrolled
        const scrollPercent = (scrollPosition / totalHeight) * 100;

        // Update the width of the scroll bar
        document.querySelector('.scroll-bar').style.width = scrollPercent + '%';
    }
}

// Instantiate the class to activate the effects
const scrollEffects = new ScrollEffects();


(/*)
function scroll() {
// Get the current scroll position
var scrollPos = window.scrollY;

// Get the background elements
var backgroundOne = document.getElementById("background-one");
var backgroundTwo = document.getElementById("background-two");

// Check if the scroll position is greater than 100px
if (scrollPos > window.innerHeight) {
    backgroundOne.style.opacity = 0;
    backgroundTwo.style.opacity = 1;
} else {
    backgroundOne.style.opacity = 1;
    backgroundTwo.style.opacity = 0;
}

// Add an event listener for the scroll event
window.addEventListener("scroll", function() {
    // Get the current scroll position
    var scrollPos = window.scrollY;

    // Check if the scroll position is greater than 100px
    if (scrollPos > this.window.innerHeight * 0.6) {
        backgroundOne.style.opacity = 0;
        backgroundTwo.style.opacity = 1;
    } else {
        backgroundOne.style.opacity = 1;
        backgroundTwo.style.opacity = 0;
    }
});
}

function pulse(){
    var imageButton = document.querySelector('img[alt="Image button"]');

    imageButton.addEventListener('mouseover', function(){
        imageButton.style.animationPlayState = "running";
    });

    imageButton.addEventListener('mouseout', function(){
        imageButton.style.animationPlayState = "paused";
    });
}

function percentscrollbar() {
    window.addEventListener('scroll', function() {
        // Get the current scroll position of the page
        var scrollPosition = window.scrollY;
        // Get the total height of the page
        var totalHeight = document.body.scrollHeight - window.innerHeight;
        // Calculate the percentage of the page scrolled
        var scrollPercent = (scrollPosition / totalHeight) * 100;
        // Update the width of the scroll bar
        document.querySelector('.scroll-bar').style.width = scrollPercent + '%';
      });
      
}
(*/)
