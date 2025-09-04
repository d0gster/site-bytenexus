class FloatingPoints {
  constructor() {
    this.points = [];
    this.gridSize = 40;
    this.init();
  }

  init() {
    for (let i = 0; i < 12; i++) {
      this.createPoint();
    }
    this.animate();
  }

  createPoint() {
    const point = document.createElement('div');
    point.className = 'floating-point';
    document.body.appendChild(point);

    const pointData = {
      element: point,
      isHorizontal: Math.random() > 0.5,
      speed: 0.5 + Math.random() * 1.5,
      x: 0,
      y: 0,
      direction: 1,
      changeCounter: 0,
      changeInterval: 180 + Math.floor(Math.random() * 240),
      minDistance: 80
    };

    this.resetPosition(pointData);
    this.points.push(pointData);
  }

  resetPosition(point) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (point.isHorizontal) {
      point.x = -10;
      point.y = Math.floor(Math.random() * (h / this.gridSize)) * this.gridSize - 1;
      point.direction = 1;
    } else {
      point.x = Math.floor(Math.random() * (w / this.gridSize)) * this.gridSize - 1;
      point.y = -10;
      point.direction = 1;
    }

    point.element.style.left = point.x + 'px';
    point.element.style.top = point.y + 'px';
    point.changeCounter = 0;
  }

  snapToGrid(value) {
    return Math.round(value / this.gridSize) * this.gridSize - 1;
  }

  animate() {
    this.points.forEach(point => {
      point.changeCounter++;

      // Mudança aleatória de direção no meio do percurso
      if (point.changeCounter >= point.changeInterval && Math.random() < 0.2) {
        point.isHorizontal = !point.isHorizontal;
        point.x = this.snapToGrid(point.x);
        point.y = this.snapToGrid(point.y);
        point.direction = 1; // Sempre para frente após mudança
        point.changeCounter = 0;
        point.changeInterval = 180 + Math.floor(Math.random() * 240);
      }

      // Movimento
      if (point.isHorizontal) {
        point.x += point.speed * point.direction;
        if (point.x > window.innerWidth + 10 || point.x < -10) {
          this.resetPosition(point);
        }
      } else {
        point.y += point.speed * point.direction;
        if (point.y > window.innerHeight + 10 || point.y < -10) {
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