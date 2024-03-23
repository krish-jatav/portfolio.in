function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ?
                locoScroll.scrollTo(value, 0, 0) :
                locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ?
            "transform" :
            "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
init();

var flag = 0;
document.querySelector("#menu").addEventListener("click", function() {
    if (flag == 0) {
        document.querySelector("#menu").style.height = "24px";
        document.querySelector("#line1").style.rotate = "47deg";
        document.querySelector("#line2").style.rotate = "-48deg";
        document.querySelector(".nav-phone").style.opacity = 1;
        flag = 1;
    } else {
        document.querySelector("#menu").style.height = "12px";
        document.querySelector("#line1").style.rotate = "0deg";
        document.querySelector("#line2").style.rotate = "0deg";
        document.querySelector(".nav-phone").style.opacity = 0;
        flag = 0;
    }
});

function magnet() {
    const navContainer = document.querySelector("#main");

    // Select all elements within the navigation container, including #menu
    const navElements = navContainer.querySelectorAll("a, h2, #menu, i");

    // Define the strength of the magnet effect (increase this value for stronger effect)
    const magnetStrength = 0.5;

    // Add event listeners to each navigation element
    navElements.forEach((element) => {
        // Add mousemove event listener to each navigation element
        element.addEventListener("mousemove", (e) => {
            const boundingRect = element.getBoundingClientRect();
            const mouseX = e.clientX - boundingRect.left; // Mouse X position within the element
            const mouseY = e.clientY - boundingRect.top; // Mouse Y position within the element

            gsap.to(element, {
                x: (mouseX - boundingRect.width / 2) * magnetStrength, // Move horizontally towards mouse
                y: (mouseY - boundingRect.height / 2) * magnetStrength, // Move vertically towards mouse
                duration: 0.3, // Duration of the animation
                ease: "power2.easeOut", // Easing function for smooth animation
            });
        });

        // Add mouseleave event listener to each navigation element
        element.addEventListener("mouseleave", () => {
            // Animate the element back to its original position
            gsap.to(element, {
                x: 0, // Reset horizontal position
                y: 0, // Reset vertical position
                duration: 0.3, // Duration of the animation
                ease: "power2.easeOut", // Easing function for smooth animation
            });
        });
    });
}

magnet();

document.addEventListener("mousemove", function(event) {
    const circle = document.querySelector("#circle");

    requestAnimationFrame(() => {
        const circleWidth = circle.offsetWidth;
        const circleHeight = circle.offsetHeight;
        circle.style.left = `${event.clientX - circleWidth / 9}px`;
        circle.style.top = `${event.clientY - circleHeight / 2}px`;
    });
});

const Containerscale = document.querySelector("#main");
const ElmScale = Containerscale.querySelectorAll("a, h2 , #menu , i");

ElmScale.forEach((elm) => {
    elm.addEventListener("mouseenter", function(dets) {
        circle.style.scale = 0;
        // console.log("hiii ");
    });
    elm.addEventListener("mouseleave", function(dets) {
        circle.style.scale = 0.9;
        // console.log("hiii ");
    });
});
// gsap.from(".my-img", {
//   duration: "2",
//   opacity: "0",
//   delay: "10",
//   width: "0",
//   scale: "0",
//   scrollTrigger: {
//     trigger: ".my-img",
//     scroller: "#main",
//     start: "top 100%",
//     end: "top 20%",
//     // markers: "true",
//     scrub: "4",
//     opacity: "1",
//   },
// });