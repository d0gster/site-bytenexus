class FloatingPoints {
  constructor() {
    this.points = [];
    this.init();
  }

  init() {
    for (let i = 0; i < 6; i++) {
      this.createPoint();
    }
    this.animate();
  }

  createPoint() {
    const point = document.createElement('div');
    point.className = 'floating-point';
    document.body.appendChild(point);

    const isHorizontal = Math.random() > 0.5;
    const speed = 0.5 + Math.random() * 1.5;

    const pointData = {
      element: point,
      isHorizontal,
      speed,
      x: 0,
      y: 0
    };

    this.resetPosition(pointData);
    this.points.push(pointData);
  }

  resetPosition(point) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const gridSize = 40;

    if (point.isHorizontal) {
      point.x = -10;
      point.y = Math.floor(Math.random() * (h / gridSize)) * gridSize - 1;
      point.direction = 1;
    } else {
      point.x = Math.floor(Math.random() * (w / gridSize)) * gridSize - 1;
      point.y = -10;
      point.direction = 1;
    }

    point.element.style.left = point.x + 'px';
    point.element.style.top = point.y + 'px';
  }

  animate() {
    this.points.forEach(point => {
      if (point.isHorizontal) {
        point.x += point.speed * point.direction;
        if (point.x > window.innerWidth + 10) {
          this.resetPosition(point);
        }
      } else {
        point.y += point.speed * point.direction;
        if (point.y > window.innerHeight + 10) {
          this.resetPosition(point);
        }
      }

      point.element.style.left = point.x + 'px';
      point.element.style.top = point.y + 'px';
    });

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FloatingPoints();
});