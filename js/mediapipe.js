function initMediaPipe() {
  const hands = new Hands({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });

  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,

    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.6,
  });

  hands.onResults((results) => {
    currentHands = results.multiHandLandmarks || [];
  });

  async function detectHands() {
    await hands.send({
      image: videoElement,
    });

    requestAnimationFrame(detectHands);
  }

  detectHands();
}
