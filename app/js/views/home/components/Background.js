import React from 'react';

let ctx;
let animationFrame;

class Background extends React.Component {
  componentDidMount() {
    const canvas = this.refs.myCanvas;
    ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // Global variables
    const MOUSE = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };

    addEventListener("resize", function() {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      init();
    });

    addEventListener("mousemove", function(event) {
      MOUSE.x = event.clientX;
      MOUSE.y = event.clientY;
    });

    const PINKISH = [
      {r: 241, g: 144, b: 249},
      {r: 189, g: 69, b: 228},
      {r: 74, g: 22, b: 120}
    ];

    const BLUISH = [
      {r: 34, g: 59, b: 224},
      {r: 120, g: 126, b: 220},
      {r: 0, g: 42, b: 235}
    ];

    let SET_PROPS = {
      position(radius) {
        let position;
        position = radius < 4 ? [randomInt(0,innerWidth), randomInt(0, innerHeight*0.8)]
        : [innerWidth / 2, randomInt(innerHeight * 0.3, innerHeight * 0.5)];
        return position;
      },
      speed(radius) {
        let speed;
        speed = radius <= 3 ? [randomFloat(-0.5, 0.5), randomFloat(3, 5)]
        : [randomFloat(-10, 11)/(radius*0.08), randomFloat(-0.5, 0.5)/(radius*0.08)];
        return speed;
      },
      radius: (dots) => dots ? randomFloat(1, 3) : randomFloat(20, 50),
      color: (positionX) => positionX > innerWidth / 2 ? randomColor(BLUISH) : randomColor(PINKISH),
      opacity: () => randomFloat(0.4, 0.6)
    };

    let CIRCLES_NUM = 100;
    let CIRCLES = [];
    let DOTS_NUM = 300;
    let DOTS = [];

    // Event Listeners
    addEventListener("mousemove", function(event) {
      MOUSE.x = event.clientX;
      MOUSE.y = event.clientY;
    });

    addEventListener("resize", function() {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      init();
    });

    // Utility Functions
    const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);
    const randomFloat = (min,max) =>  Math.random() * (max - min) + min;
    const randomColor = (palette) => palette[Math.floor(Math.random() * palette.length)];

    // Objects
    class Circle {
      constructor(dots = false) {
        this.radius = SET_PROPS.radius(dots);
        this.position = SET_PROPS.position(this.radius);
        this.speed = SET_PROPS.speed(this.radius);
        this.opacity = SET_PROPS.opacity();
        this.color = this.radius < 10 ? {r: 107, g: 44, b: 163} : SET_PROPS.color(this.position[0]);
      }
    }

    Circle.prototype.draw = function() {
      ctx.beginPath();
      ctx.arc(this.position[0], this.position[1], this.radius, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity / 2})`;
      ctx.fill();
      ctx.shadowColor = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
    };

    // Implementation
    function init() {
      CIRCLES = [];
      DOTS = [];
      for(let i = 0; i < CIRCLES_NUM; i++) {
          CIRCLES.push(new Circle());
      }
      for(let i = 0; i < DOTS_NUM; i++) {
          DOTS.push(new Circle(true));
      }
    }

    // Animation Loop
    function animate() {
      animationFrame = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      CIRCLES.forEach( circle => {
        circle.position[0] += circle.speed[0];
        circle.position[1] += circle.speed[1];
        if(circle.position[0] > innerWidth / 2 && BLUISH.indexOf(circle.color) === -1) {
          circle.color = randomColor(BLUISH);
        } else if(circle.position[0] < innerWidth / 2 && PINKISH.indexOf(circle.color) === -1) {
          circle.color = randomColor(PINKISH);
        }
        if(circle.position[0] + circle.radius < 0 || circle.position[0] - circle.radius > innerWidth) {
          circle.position = SET_PROPS.position(circle.radius);
        }
        if(circle.position[1] >= innerHeight * 0.8 || circle.position[1] - circle.radius < 0) {
          circle.speed[1] = -circle.speed[1];
        }
        circle.draw();
      });
      DOTS.forEach( dot => {
        dot.position[0] += dot.speed[0];
        dot.position[1] += dot.speed[1];
        if(dot.position[0] + dot.radius < 0 || dot.position[0] - dot.radius > innerWidth || dot.opacity < 0.01) {
          dot.position = SET_PROPS.position(dot.radius);
          dot.speed = SET_PROPS.speed(dot.radius);
          dot.opacity = SET_PROPS.opacity();
        }
        if(dot.position[1] >= (innerHeight * randomFloat(0.85, 1.5))) {
          dot.speed[1] = 0;
          dot.speed[0] = 0;
          dot.opacity -= 0.08;
        }
        dot.draw();
      });
    }

    //let's start!
    init();
    animate();
  }
  componentWillUnmount() {
    cancelAnimationFrame(animationFrame);
  }
  render() {
    return (
      <div className="wrapper">
        <canvas ref="myCanvas"></canvas>
        <div className="bgParty" />
        <div className="bgGlass" />
      </div>
    )
  }
}

export default Background;
