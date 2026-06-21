const videoElement = document.querySelector(".input_video");

const bgCanvas = document.getElementById("bgCanvas");

const mainCanvas = document.getElementById("mainCanvas");

const bgCtx = bgCanvas.getContext("2d");

const ctx = mainCanvas.getContext("2d");

const uiHands = document.getElementById("ui-hands");

const uiFps = document.getElementById("ui-fps");

const uiGesture = document.getElementById("ui-gesture");

const uiSpread = document.getElementById("ui-spread");

let width = window.innerWidth;
let height = window.innerHeight;

let currentHands = [];
let particles = [];
let ripples = [];

let time = 0;

const FINGER_TIPS = [4, 8, 12, 16, 20];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;

  bgCanvas.width = width;
  bgCanvas.height = height;

  mainCanvas.width = width;
  mainCanvas.height = height;
}

resize();

window.addEventListener("resize", resize);

document.getElementById("startBtn").addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 1280,
        height: 720,
        facingMode: "user",
      },

      audio: false,
    });

    videoElement.srcObject = stream;

    await videoElement.play();

    document.getElementById("startOverlay").style.display = "none";

    document.getElementById("hud").style.display = "block";

    document.getElementById("themes").style.display = "block";

    initMediaPipe();

    requestAnimationFrame(renderLoop);
  } catch (err) {
    console.error(err);

    alert("Camera failed. Check console.");
  }
});
