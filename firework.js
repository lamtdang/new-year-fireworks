class Firework {
    constructor() {
      this.hu = random(255);  //colorCode
      this.firework = new Particle(random(width), height, this.hu, 'firework');
      this.exploded = false;
      this.particles = [];
    }
  
    done() { // for checking explosions
      if (this.exploded && this.particles.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  
    update() {
      if (!this.exploded) {
        this.firework.applyForce(gravity);
        this.firework.update();
  
        if (this.firework.vel.y >= 0) {
          this.exploded = true;
          const randomFireworkType = random(1)
          if (randomFireworkType < 0.2){
            this.explodeHeartsPretty();
          } else if (randomFireworkType > 0.2 && randomFireworkType < 0.4){
            this.explodeHeartsFirework()
          } else {
            this.explode()
          }
        }
      }
  
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(gravity);
        this.particles[i].update();
  
        if (this.particles[i].done()) {
          this.particles.splice(i, 1);
        }
      }
    }
  
    explode() {    // can create heart explosion by adding appropriate vectors
      for (let i = 0; i < 100; i++) {
        const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, 'normal', null, null);
        this.particles.push(p);
      }
    }

    explodeHeartsPretty(){
      const heartVector = []
      const vel = random(0.1, 2)
      for (var a = 0; a < TWO_PI; a+=0.01) {
        const r = vel;
        const x = r * 16 * pow(sin(a), 3);
        const y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
        heartVector.push(createVector(x, y));
      }

      for (let i = 0; i < heartVector.length; i++) {
        const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, 'heart', heartVector[i], 1);
        this.particles.push(p);
      }
    }

    explodeHeartsFirework(){
      const heartVector = []
      for (var a = 0; a < TWO_PI; a+=0.01) {
        const vel = random(0.1, 1)
        const r = vel;
        const x = r * 16 * pow(sin(a), 3);
        const y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
        heartVector.push(createVector(x, y));
      }

      for (let i = 0; i < heartVector.length; i++) {
        const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, 'heart', heartVector[i], 1);
        this.particles.push(p);
      }
    }

  
    show() {
      if (!this.exploded) {
        this.firework.show();
      }
  
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].show();
      }
    }
  }