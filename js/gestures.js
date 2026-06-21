function mapToCanvas(point) {
  return {
    x: point.x * width,
    y: point.y * height,
  };
}

function getDist(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function detectGestures() {
  if (!currentHands.length) return;

  const hand = currentHands[0];

  const thumb = hand[4];
  const index = hand[8];

  const dist = getDist(thumb, index);

  if (dist < 0.04) {
    uiGesture.innerText = "PINCH";

    createShockwave(
      mapToCanvas({
        x: (thumb.x + index.x) / 2,
        y: (thumb.y + index.y) / 2,
      }),

      themes[currentTheme](time, 1, 1)
    );
  } else {
    uiGesture.innerText = "OPEN";
  }

  const spread = getDist(hand[8], hand[20]);

  uiSpread.innerText = Math.min(Math.round(spread * 300), 100) + "%";
}
