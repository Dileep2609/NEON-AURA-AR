function createParticles(pos, color, count = 2) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x: pos.x,
      y: pos.y,

      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,

      life: 1,
      size: Math.random() * 3 + 1,

      color,
    });
  }
}

function createShockwave(pos, color) {
  ripples.push({
    x: pos.x,
    y: pos.y,

    radius: 0,
    life: 1,
    maxRadius: 200,

    color,
  });
}

function updatePhysics() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    p.x += p.vx;
    p.y += p.vy;

    p.life -= 0.02;

    ctx.globalAlpha = p.life;

    ctx.fillStyle = p.color;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  ctx.globalAlpha = 1;

  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];

    r.radius += 5;
    r.life -= 0.02;

    ctx.strokeStyle = r.color;
    ctx.lineWidth = 3;

    ctx.globalAlpha = r.life;

    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.stroke();

    if (r.life <= 0) {
      ripples.splice(i, 1);
    }
  }

  ctx.globalAlpha = 1;
}
