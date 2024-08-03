let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e, paper));
    paper.addEventListener('mousedown', (e) => this.handleMouseDown(e, paper));
    window.addEventListener('mouseup', () => this.handleMouseUp());

    document.addEventListener('touchmove', (e) => this.handleTouchMove(e, paper), { passive: false });
    paper.addEventListener('touchstart', (e) => this.handleTouchStart(e, paper), { passive: false });
    window.addEventListener('touchend', () => this.handleTouchEnd());
  }

  handleMouseMove(e, paper) {
    if (!this.rotating && this.holdingPaper) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }
  }

  handleMouseDown(e, paper) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    paper.style.zIndex = highestZ;
    highestZ += 1;

    this.mouseTouchX = e.clientX;
    this.mouseTouchY = e.clientY;
    this.prevMouseX = e.clientX;
    this.prevMouseY = e.clientY;
  }

  handleMouseUp() {
    this.holdingPaper = false;
    this.rotating = false;
  }

  handleTouchMove(e, paper) {
    const touch = e.touches[0];
    if (!this.rotating && this.holdingPaper) {
      this.mouseX = touch.clientX;
      this.mouseY = touch.clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }
  }

  handleTouchStart(e, paper) {
    const touch = e.touches[0];
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    paper.style.zIndex = highestZ;
    highestZ += 1;

    this.mouseTouchX = touch.clientX;
    this.mouseTouchY = touch.clientY;
    this.prevMouseX = touch.clientX;
    this.prevMouseY = touch.clientY;
  }

  handleTouchEnd() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
