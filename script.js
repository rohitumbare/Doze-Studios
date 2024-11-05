const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    maxIndex: 1345,
};

const images = [];
let imagesLoaded = 0;

let isScrollDisabled = false;

function disableScroll() {
    isScrollDisabled = true;
    lenis.stop();
}

function enableScroll() {
    isScrollDisabled = false;
    lenis.start();
}

const preloader = document.getElementById('preloader');
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('.progress-text');

function updateProgress(loaded, total) {
    const progress = (loaded / total) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
}

function hidePreloader() {
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
        enableScroll();
    }, 500);
}

function preloadImages() {
    disableScroll();

    for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `./Assets/Frames/frame_${i
            .toString()
            .padStart(4, "0")}.jpg`;
        const img = new Image();
        img.src = imageUrl;
        images.push(img);

        img.onload = () => {
            imagesLoaded++;

            updateProgress(imagesLoaded, frames.maxIndex);
            if (imagesLoaded === frames.maxIndex) {
                loadImage(frames.currentIndex);
                startAnimation();
                hidePreloader();
            }
        };
    }
}

function loadImage(index) {
    const img = images[index];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

    frames.currentIndex = index;
}

function startAnimation() {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#parent",
            start: "top top",
            scrub: .7,
        },
    });

    function updateFrame(index) {
        return {
            currentIndex: index + 13,
            onUpdate: function () {
                loadImage(Math.floor(frames.currentIndex));
                console.info(frames.currentIndex);
            },
        };
    }

    tl.to(frames, updateFrame(200), "one")
        .to(".animate1", { opacity: 0, ease: "linear" }, "one")

        .to(frames, updateFrame(300), "two")
        .to(".animate2", { opacity: 1, ease: "linear" }, "two")

        .to(frames, updateFrame(310), "three")
        .to(".animate2", { opacity: 1, ease: "linear" }, "three")

        .to(frames, updateFrame(410), "four")
        .to(".animate2", { opacity: 0, ease: "linear" }, "four")

        .to(frames, updateFrame(530), "five")
        .to(".animate3", { opacity: 1, ease: "linear" }, "five")

        .to(frames, updateFrame(560), "six")
        .to(".animate3", { opacity: 1, ease: "linear" }, "six")

        .to(frames, updateFrame(660), "seven")
        .to(".animate3", { opacity: 0, ease: "linear" }, "seven")

        .to(frames, updateFrame(780), "eight")
        .to(".animate4", { x: 0, opacity: 1, ease: "expo" }, "eight")

        .to(frames, updateFrame(880), "nine")
        .to(".animate4", { x: 0, opacity: 1, ease: "expo" }, "nine")

        .to(frames, updateFrame(1020), "ten")
        .to(".animate4", { opacity: 0, ease: "linear" }, "ten")

        .to(frames, updateFrame(1080), "eleven")
        .to("canvas", { scale: 0.5, ease: "linear" }, "eleven")

        .to(frames, updateFrame(1180), "twelve")
        .to(".animate5", { opacity: 1, ease: "expo" }, "twelve")

        .to(frames, updateFrame(1230), "twelve")
        .to(".animate5 span", { width: "10%", ease: "expo" }, "twelve")

        .to(frames, updateFrame(1300), "thirteen")
        .to("canvas", { scale: 1, ease: "linear" }, "thirteen")

        .to(frames, updateFrame(1315), "fourteen")
        .to(".animate5", { scale: 2, ease: "circ" }, "fourteen")

        .to(frames, updateFrame(1345), "fifteen")
        .to(".animate5", { scale: 2, ease: "circ" }, "fifteen")
}

const lenis = new Lenis();

function raf(time) {
    if (!isScrollDisabled) {
        lenis.raf(time);
    }
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

window.addEventListener("resize", function () {
    loadImage(Math.floor(frames.currentIndex));
});

document.querySelectorAll(".names h3")
    .forEach(function (elem) {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 90%",
                end: "bottom 20%",
                scrub: 2
            },
            opacity: .4
        })
    })

preloadImages();