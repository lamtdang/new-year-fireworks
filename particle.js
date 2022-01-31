class Particle {
    constructor(x, y, hu, firework, defined_direction, defined_vel) {
      this.pos = createVector(x, y);
      this.firework = firework;              
      this.lifespan = 255;                   // fadeout of particle
      this.hu = hu;
      this.acc = createVector(0, 0);
      if (this.firework === 'firework') {
        const tilt = random(-3, 3)
        this.vel = createVector(tilt, random(-20, -8));
      } else if (this.firework === 'normal') {
        this.vel = p5.Vector.random2D();  // blow up in circle direction
        this.vel.mult(random(2, 28));         // random direction
      } else {
        this.vel = defined_direction
        this.vel.mult(defined_vel)
      }
    }
  
    applyForce(force) {
      this.acc.add(force);
    }
  
    update() {
      if (this.firework !== 'firework') {
        this.vel.mult(0.9);
        this.lifespan -= 4;
      }
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  
    done() {
      if (this.lifespan < 0) {
        return true;
      } else {
        return false;
      }
    }
  
    show() {
      colorMode(HSB);
  
      if (this.firework !== 'firework') {
        strokeWeight(2);                                  
        stroke(this.hu, 255, 205, this.lifespan);    
      } else {
        strokeWeight(4);
        stroke(this.hu, 255, 205);
      }
  
      point(this.pos.x, this.pos.y);
    }
  }