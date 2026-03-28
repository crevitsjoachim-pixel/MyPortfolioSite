// ===========================
// Generative Trees — Two canvas instances (left + right)
// With water reflection and generative roots
// ===========================

(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  var maxlife = 26;
  var GROUND_Y_RATIO = 0.78;

  // --- Helpers ---
  function random(min, max) {
    if (min === undefined) return Math.random();
    if (max === undefined) return Math.random() * min;
    return min + Math.random() * (max - min);
  }

  function hsbToRgb(h, s, b, a) {
    if (a === undefined) a = 1;
    h = Math.max(0, Math.min(360, h)) / 360;
    s = Math.max(0, Math.min(255, s)) / 255;
    b = Math.max(0, Math.min(255, b)) / 255;

    var c = b * s;
    var x = c * (1 - Math.abs(((h * 6) % 2) - 1));
    var m = b - c;
    var r = 0, g = 0, bl = 0;

    if (h < 1/6)       { r = c; g = x; bl = 0; }
    else if (h < 2/6)  { r = x; g = c; bl = 0; }
    else if (h < 3/6)  { r = 0; g = c; bl = x; }
    else if (h < 4/6)  { r = 0; g = x; bl = c; }
    else if (h < 5/6)  { r = x; g = 0; bl = c; }
    else               { r = c; g = 0; bl = x; }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    bl = Math.round((bl + m) * 255);

    return 'rgba(' + r + ', ' + g + ', ' + bl + ', ' + a + ')';
  }

  // --- Tree Creation ---
  function createTree(width, height, side) {
    var x;
    if (side === 'left') {
      x = width * 0.35;
    } else {
      x = width * 0.65;
    }
    var y = height * GROUND_Y_RATIO;
    var start = { x: x, y: y };

    var t = {
      branches: [],
      start: start,
      coeff: start.y / (height - 100),
      teinte: random(110, 155),
      index: 0,
      proba1: random(0.80, 0.98),
      proba2: random(0.80, 0.98),
      proba3: random(0.55, 0.75),
      proba4: random(0.55, 0.75)
    };

    // Main trunk — slightly more complex
    var trunkStw = 44 * Math.sqrt(start.y / height);
    t.branches.push({
      position: { x: start.x, y: start.y },
      stw: trunkStw,
      gen: 1,
      alive: true,
      age: 0,
      angle: 0,
      speed: { x: 0, y: -4.8 },
      index: 0,
      maxlife: maxlife * random(1.0, 1.5),
      proba1: t.proba1,
      proba2: t.proba2,
      proba3: t.proba3,
      proba4: t.proba4,
      deviation: random(0.5, 0.8)
    });

    return t;
  }

  function createBranch(start, stw, angle, gen, index, tree) {
    return {
      position: { x: start.x, y: start.y },
      stw: stw,
      gen: gen,
      alive: true,
      age: 0,
      angle: angle,
      speed: { x: 0, y: -4.5 },
      index: index,
      maxlife: maxlife * random(0.5, 1.0),
      proba1: tree.proba1,
      proba2: tree.proba2,
      proba3: tree.proba3,
      proba4: tree.proba4,
      deviation: random(0.5, 0.8)
    };
  }


  // --- Growth ---
  function growBranch(branch, tree) {
    if (!branch.alive) return;

    branch.age++;

    if (branch.age >= Math.floor(branch.maxlife / branch.gen) || random(1) < 0.025 * branch.gen) {
      branch.alive = false;

      if (branch.stw > 0.3 && branch.gen < 7) {
        var brs = tree.branches;
        var pos = { x: branch.position.x, y: branch.position.y };

        if (random(1) < branch.proba1 / Math.pow(branch.gen, 0.9)) {
          brs.push(createBranch(pos, branch.stw * random(0.5, 0.75),
            branch.angle + random(0.6, 1.0) * branch.deviation, branch.gen + 0.2, branch.index, tree));
        }
        if (random(1) < branch.proba2 / Math.pow(branch.gen, 0.9)) {
          brs.push(createBranch(pos, branch.stw * random(0.5, 0.75),
            branch.angle - random(0.6, 1.0) * branch.deviation, branch.gen + 0.2, branch.index, tree));
        }
        if (branch.gen < 3 && random(1) < branch.proba3 / Math.pow(branch.gen, 1.1)) {
          brs.push(createBranch(pos, branch.stw * random(0.6, 0.8),
            branch.angle + random(0.3, 0.7) * branch.deviation, branch.gen + 0.15, branch.index, tree));
        }
        if (branch.gen < 3 && random(1) < branch.proba4 / Math.pow(branch.gen, 1.1)) {
          brs.push(createBranch(pos, branch.stw * random(0.6, 0.8),
            branch.angle - random(0.3, 0.7) * branch.deviation, branch.gen + 0.15, branch.index, tree));
        }
      }
    } else {
      branch.speed.x += random(-0.15, 0.15);
    }
  }


  // --- Rendering ---
  function displayBranch(branch, tree, ctx, canvasHeight) {
    var st = tree.start;
    var groundY = st.y;
    var x0 = branch.position.x;
    var y0 = branch.position.y;

    branch.position.x += -branch.speed.x * Math.cos(branch.angle) + branch.speed.y * Math.sin(branch.angle);
    branch.position.y += branch.speed.x * Math.sin(branch.angle) + branch.speed.y * Math.cos(branch.angle);

    var c = tree.coeff;

    // ---- Main tree branch (above ground) ----
    var mainHue = tree.teinte + branch.age + 15 * branch.gen;
    var mainSat = Math.min(220, 140 * c + 20 * branch.gen);
    var mainBright = Math.min(140, 55 + 10 * branch.gen);
    var mainWidth = branch.stw - (branch.age / branch.maxlife) * (branch.stw * 0.4);

    ctx.strokeStyle = hsbToRgb(mainHue, mainSat, mainBright, (38 * c) / 100);
    ctx.lineWidth = Math.max(0.2, mainWidth);
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(branch.position.x, branch.position.y);
    ctx.stroke();

    // Light accent
    var lightHue = tree.teinte + branch.age + 18 * branch.gen;
    ctx.strokeStyle = hsbToRgb(lightHue, 160 * c, 180 + 12 * branch.gen, (35 * c) / 100);
    var lightWidth = branch.stw * 0.8 - (branch.age / branch.maxlife) * (branch.stw * 0.3);
    ctx.lineWidth = Math.max(0.3, lightWidth);
    ctx.beginPath();
    ctx.moveTo(x0 + 0.12 * branch.stw, y0);
    ctx.lineTo(branch.position.x + 0.12 * branch.stw, branch.position.y);
    ctx.stroke();

    // Highlight on thick branches
    if (branch.gen < 3) {
      ctx.strokeStyle = hsbToRgb(mainHue + 8, mainSat * 0.6, mainBright + 25, (18 * c) / 100);
      ctx.lineWidth = Math.max(0.1, mainWidth * 0.3);
      ctx.beginPath();
      ctx.moveTo(x0 - 0.08 * branch.stw, y0);
      ctx.lineTo(branch.position.x - 0.08 * branch.stw, branch.position.y);
      ctx.stroke();
    }

    // ---- Roots (stretched reflection, 2x deeper than canopy) ----
    var mirrorY0 = groundY + 2 * (groundY - y0);
    var mirrorY1 = groundY + 2 * (groundY - branch.position.y);

    if (mirrorY0 < canvasHeight + 20) {
      var distFromGround = Math.abs(y0 - groundY);
      var rootDepth = 2 * groundY; // roots go 2x the tree height
      var fadeFactor = Math.max(0, 1 - (distFromGround / (rootDepth * 0.95)));
      fadeFactor = fadeFactor * Math.sqrt(fadeFactor);

      var rippleAmp = 0.6 + distFromGround * 0.012;
      var ripplePhase = (branch.position.x + branch.position.y) * 0.05;
      var rippleX = Math.sin(ripplePhase) * rippleAmp;

      var reflHue = tree.teinte + branch.age + 15 * branch.gen + 20;
      var reflSat = Math.min(180, mainSat * 0.6);
      var reflBright = Math.min(120, mainBright * 0.7 + 15);
      var reflAlpha = fadeFactor * (22 * c) / 100;

      if (reflAlpha > 0.005) {
        var reflWidth = Math.max(0.2, mainWidth * 0.85);

        ctx.strokeStyle = hsbToRgb(reflHue, reflSat, reflBright, reflAlpha);
        ctx.lineWidth = reflWidth;
        ctx.beginPath();
        ctx.moveTo(x0 + rippleX, mirrorY0);
        ctx.lineTo(branch.position.x + rippleX, mirrorY1);
        ctx.stroke();

        if (branch.gen < 3 && reflAlpha > 0.02) {
          ctx.strokeStyle = hsbToRgb(reflHue + 10, reflSat * 0.4, reflBright + 30, reflAlpha * 0.4);
          ctx.lineWidth = Math.max(0.3, reflWidth * 1.5);
          ctx.beginPath();
          ctx.moveTo(x0 + rippleX, mirrorY0);
          ctx.lineTo(branch.position.x + rippleX, mirrorY1);
          ctx.stroke();
        }
      }
    }
  }


  // --- Draw water fade below ground ---
  function drawGroundSurface(ctx, width, height, tree) {
    var groundY = tree.start.y;

    var waterGrad = ctx.createLinearGradient(0, groundY, 0, groundY + 200);
    waterGrad.addColorStop(0, 'rgba(48, 77, 62, 0)');
    waterGrad.addColorStop(0.3, 'rgba(48, 77, 62, 0.3)');
    waterGrad.addColorStop(0.7, 'rgba(48, 77, 62, 0.6)');
    waterGrad.addColorStop(1, 'rgba(48, 77, 62, 0.8)');
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, groundY, width, 200);
  }

  // ===========================
  // Tree instance manager
  // ===========================
  function TreeInstance(canvasId, side) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.side = side;
    this.tree = null;
    this.animationId = null;
  }

  TreeInstance.prototype.isVisible = function () {
    return this.canvas.offsetWidth > 0 && this.canvas.offsetHeight > 0;
  };

  TreeInstance.prototype.resize = function () {
    var hero = this.canvas.parentElement;
    this.canvas.width = this.canvas.offsetWidth;
    this.heroHeight = hero.offsetHeight;
    // Extend canvas below hero so roots can render deep underground
    this.canvas.height = hero.offsetHeight * 3;
  };

  TreeInstance.prototype.setup = function () {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (!this.isVisible()) { this.tree = null; return; }
    this.resize();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.tree = createTree(this.canvas.width, this.heroHeight, this.side);
  };

  TreeInstance.prototype.draw = function () {
    var self = this;
    if (!self.tree) return;

    var hasAlive = false;

    // Grow and draw branches
    for (var i = 0; i < self.tree.branches.length; i++) {
      var branch = self.tree.branches[i];
      if (branch.alive) {
        hasAlive = true;
        growBranch(branch, self.tree);
        displayBranch(branch, self.tree, self.ctx, self.canvas.height);
      }
    }



    if (hasAlive) {
      self.animationId = requestAnimationFrame(function () { self.draw(); });
    } else {
      // Tree finished growing — draw ground/water surface on top
      drawGroundSurface(self.ctx, self.canvas.width, self.canvas.height, self.tree);
    }
  };

  TreeInstance.prototype.regrow = function () {
    this.setup();
    this.draw();
  };

  // --- Initialize both trees ---
  var leftTree = new TreeInstance('hero-tree-left', 'left');
  var rightTree = new TreeInstance('hero-tree-right', 'right');

  if (!leftTree.canvas || !rightTree.canvas) return;

  leftTree.setup();
  leftTree.draw();
  rightTree.setup();
  rightTree.draw();

  // Click anywhere in hero to regrow both
  var heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('click', function (e) {
      if (e.target.closest('.btn')) return;
      leftTree.regrow();
      rightTree.regrow();
    });
  }

  // Resize handler
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      leftTree.regrow();
      rightTree.regrow();
    }, 250);
  });
})();
