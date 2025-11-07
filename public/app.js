(function(){
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll-triggered reveal
  if ('IntersectionObserver' in window && !reduce){
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in-view'); observer.unobserve(e.target); } });
    },{ threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'));
  }

  // Button micro-interactions (press ripple)
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('button');
    if (!btn) return;
    btn.classList.add('press');
    window.setTimeout(()=>btn.classList.remove('press'), 300);
  });

  // Page fade-out on internal navigation
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    // ignore external, hash, new tab, downloads, and JS void
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const url = new URL(a.href, window.location.origin);
    if (url.origin !== window.location.origin) return;
    e.preventDefault();
    document.body.classList.add('page-fade-out');
    setTimeout(()=>{ window.location.href = a.href; }, 350);
  });
  // Background ASMR canvas animation
  (function(){
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = document.getElementById('bg-asmr-canvas');
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d');
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let w = 0, h = 0;

    function resize(){
      const { innerWidth, innerHeight } = window;
      w = Math.floor(innerWidth * dpr);
      h = Math.floor(innerHeight * dpr);
      canvas.width = w; canvas.height = h;
    }
    resize();
    window.addEventListener('resize', ()=>{ dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); resize(); });

    // Entities
    const rng = (min, max)=> min + Math.random()*(max-min);
    const capsules = [];
    const particles = [];

    const CAPSULE_COUNT = 10; // low density for performance
    const PARTICLE_COUNT = 60;

    for (let i=0;i<CAPSULE_COUNT;i++){
      capsules.push({
        x: rng(0, w), y: rng(0, h),
        vx: rng(-0.02, 0.02), vy: rng(-0.06, -0.02),
        len: rng(80, 180)*dpr, rad: rng(14, 28)*dpr,
        rot: rng(0, Math.PI), vrot: rng(-0.0002, 0.0002),
        col: Math.random() < 0.5 ? getVar('--Animation-Capsule-Primary') : getVar('--Animation-Capsule-Secondary'),
        alpha: rng(0.2, 0.45), depth: rng(0.3, 1)
      });
    }
    for (let i=0;i<PARTICLE_COUNT;i++){
      particles.push({
        x: rng(0, w), y: rng(0, h),
        vx: rng(-0.04, 0.04), vy: rng(-0.05, -0.01),
        r: rng(2*dpr, 4*dpr),
        col: Math.random() < 0.4 ? getVar('--Animation-Pellet-Accent') : getVar('--Animation-Pellet-Subtle'),
        alpha: rng(0.15, 0.35), depth: rng(0.1, 1)
      });
    }

    function getVar(name){
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#fff';
    }

    // Interaction state
    let scrollYPrev = window.scrollY, scrollInfluence = 0;
    window.addEventListener('scroll', ()=>{
      const dy = window.scrollY - scrollYPrev; scrollYPrev = window.scrollY;
      // small, eased influence (cap magnitude)
      scrollInfluence = Math.max(-1, Math.min(1, dy * 0.02));
    }, { passive: true });

    let mouse = { x: w/2, y: h/2, active: false };
    window.addEventListener('mousemove', (e)=>{
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
      mouse.active = true;
    }, { passive: true });

    function step(){
      ctx.clearRect(0,0,w,h);

      // slight global opacity modulation with scroll
      const globalAlpha = 0.85 + Math.max(-0.05, Math.min(0.1, scrollInfluence*0.02));
      ctx.globalAlpha = globalAlpha;

      // Draw capsules (foreground-ish by depth)
      for (const c of capsules){
        const slow = (1 - c.depth) * 0.4; // deeper ones move less
        const sInflu = (c.depth > 0.6 ? -0.4 : 0.2) * scrollInfluence; // FG slow, BG slightly faster
        c.x += (c.vx + sInflu*0.02);
        c.y += (c.vy * (1+slow) + sInflu*0.3);
        c.rot += c.vrot;

        // gentle sine drift
        const driftX = Math.sin((Date.now()*0.0002) + c.x*0.0005)*0.3*dpr;
        const driftY = Math.cos((Date.now()*0.00015) + c.y*0.0004)*0.2*dpr;

        // wrap
        if (c.x < -c.len) c.x = w + c.len;
        if (c.x > w + c.len) c.x = -c.len;
        if (c.y < -c.len) c.y = h + c.len;
        if (c.y > h + c.len) c.y = -c.len;

        ctx.save();
        ctx.translate(c.x + driftX, c.y + driftY);
        ctx.rotate(c.rot);
        ctx.globalAlpha = c.alpha * globalAlpha;
        drawCapsule(ctx, 0, 0, c.len, c.rad, c.col);
        ctx.restore();
      }

      // Draw particles with subtle attraction
      for (const p of particles){
        const slow = (1 - p.depth) * 0.3;
        const sInflu = (p.depth > 0.6 ? -0.3 : 0.2) * scrollInfluence;
        // gentle attraction to mouse
        if (mouse.active){
          const dx = mouse.x - p.x, dy = mouse.y - p.y; const d2 = dx*dx + dy*dy;
          const r = 160*dpr; if (d2 < r*r){
            const d = Math.sqrt(d2)||1; const ux = dx/d, uy = dy/d;
            p.vx += ux * 0.002; p.vy += uy * 0.002; // tiny impulse
          }
        }
        p.x += (p.vx + sInflu*0.02);
        p.y += (p.vy * (1+slow) + sInflu*0.25);
        // wrap
        if (p.x < -10*dpr) p.x = w + 10*dpr;
        if (p.x > w + 10*dpr) p.x = -10*dpr;
        if (p.y < -10*dpr) p.y = h + 10*dpr;
        if (p.y > h + 10*dpr) p.y = -10*dpr;

        ctx.save();
        ctx.globalAlpha = p.alpha * globalAlpha;
        // soft glow
        ctx.shadowColor = p.col; ctx.shadowBlur = 6*dpr;
        ctx.fillStyle = p.col;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      requestAnimationFrame(step);
    }

    function drawCapsule(ctx, x, y, len, rad, color){
      ctx.fillStyle = color;
      ctx.beginPath();
      const w2 = len/2, r = rad;
      ctx.moveTo(x - w2 + r, y - r);
      ctx.lineTo(x + w2 - r, y - r);
      ctx.quadraticCurveTo(x + w2, y - r, x + w2, y);
      ctx.lineTo(x + w2, y + r);
      ctx.quadraticCurveTo(x + w2, y + r, x + w2 - r, y + r);
      ctx.lineTo(x - w2 + r, y + r);
      ctx.quadraticCurveTo(x - w2, y + r, x - w2, y);
      ctx.lineTo(x - w2, y);
      ctx.quadraticCurveTo(x - w2, y - r, x - w2 + r, y - r);
      ctx.closePath();
      ctx.fill();
    }

    requestAnimationFrame(step);
  })();
})();
