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