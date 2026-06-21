function drawBackground() {
  bgCtx.fillStyle = "rgba(0,0,0,.08)";
  bgCtx.fillRect(0, 0, width, height);

  for (let i = 0; i < 100; i++) {
    bgCtx.fillStyle = themes[currentTheme](time, i, 100);

    bgCtx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
  }
}

function renderLoop() {
  requestAnimationFrame(renderLoop);

  time += 0.01;

  drawBackground();

  ctx.clearRect(0, 0, width, height);

  updatePhysics();

  if (currentHands.length) {
    currentHands.forEach((hand, handIndex) => {
      const glowColor = themes[currentTheme](time, handIndex, 2);

      drawConnectors(ctx, hand, HAND_CONNECTIONS, {
        color: glowColor,
        lineWidth: 2,
      });

      FINGER_TIPS.forEach((tipIndex, idx) => {
        const pt = mapToCanvas(hand[tipIndex]);

        ctx.shadowBlur = 20;
        ctx.shadowColor = glowColor;

        ctx.fillStyle = "white";

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
        ctx.fill();

        if (Math.random() > 0.85) {
          createParticles(
            pt,
            themes[currentTheme](time, idx, FINGER_TIPS.length),
            1
          );
        }
      });

      ctx.shadowBlur = 0;
    });

    detectGestures();

    uiHands.innerText = currentHands.length;
  } else {
    uiHands.innerText = 0;
    uiGesture.innerText = "None";
    uiSpread.innerText = "0%";
  }
}
