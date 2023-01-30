class App {
  constructor() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.w = window.innerWidth * this.pixelRatio;
    this.canvas.height = this.h = window.innerHeight * this.pixelRatio;
    this.canvas.style.width = window.innerWidth;
    this.canvas.style.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.img_file = "./asset/HK.png";
    this.average = 1;

    this.mouseX = null;
    this.mouseY = null;

    // document.documentElement.style.cursor = "./asset/Wand.png";
    //this.element.style.cursor = "./asset/Wand.png";

    window.addEventListener("mousemove", (event) => {
      this.mouse = {
        x: event.clientX * this.pixelRatio,
        y: event.clientY * this.pixelRatio,
      };
      this.pushPixels();
    });

    document.addEventListener("click", (e) => {
      this.maVideo.play();
    });

    this.mouseRadius = 1;
    this.setup();
  }

  initVideo() {
    this.maVideo = document.getElementById("video");

    this.maVideo.loop = true;
    this.maVideo.muted = true;
  }

  initMicrophone() {
    this.sound = document.createElement("sound");
    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        this.draw();
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;
        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);
        scriptProcessor.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          const arraySum = array.reduce((a, value) => a + value, 0);
          const average = Math.round(arraySum / array.length);
          this.onUpdateValue(average);
          // colorPids(average);
        };
      })
      .catch(function (err) {
        /* handle the error */
        console.error(err);
      });
  }

  onUpdateValue(e) {
    this.average = e;
    this.pushPixels();
  }

  setup() {
    this.initVideo();
    this.initMicrophone();

    this.grid = [];
    this.scale = 2;

    this.stepX = Math.floor(640 / 50);
    this.stepY = Math.floor(480 / 50);

    this.offsetX =
      (window.innerWidth / 2) * this.pixelRatio -
      (this.stepX * 50 * this.scale) / 2;
    this.offsetY =
      (window.innerHeight / 2) * this.pixelRatio -
      (this.stepY * 50 * this.scale) / 2;

    // créa grille
    for (let j = 0; j < 480; j += this.stepY) {
      for (let i = 0; i < 640; i += this.stepX) {
        this.grid.push(
          new Rects(
            this.offsetX + this.stepX + i * this.scale,
            this.offsetY + this.stepY + j * this.scale,
            this.ctx
          )
        );
      }
    }
    this.draw();
  }

  pushPixels() {
    console.log(this.average);
    //distance entre la sourise et tous les éléments de la grille
    this.grid.forEach((rects, index) => {
      const distance = Math.sqrt(
        Math.pow(rects.x - this.w / 2, 2) + Math.pow(rects.y - this.h / 2, 2)
      );
      let zoom = 4;
      let range = this.average * 5 * this.pixelRatio;
      let differenceX = this.mouse.x - rects.x;
      let differenceY = this.mouse.y - rects.y;
      //let differenceX = Math.sin.x * (Math.PI / 180) - rects.x;
      // let differenceY = Math.cos.x - rects.y;
      if (distance < range) {
        //
        const l = this.map(distance, 0, range * 2, 0, Math.PI * 2);
        const angle = Math.cos(l);
        const amt = this.map(angle, -1, 1, 0, zoom);
        differenceX *= amt;
        differenceY *= amt;
        rects.x = rects.origin.x - differenceX;
        rects.y = rects.origin.y - differenceY;
      } else {
        rects.x = rects.origin.x;
        rects.y = rects.origin.y;
      }
    });
  }

  detectPixels() {
    // console.log("detectPixels");
    if (this.maVideo) {
      this.ctx.drawImage(this.maVideo, 0, 0, 640, 480);
    }
    // get image data from canvas
    this.imgData = this.ctx.getImageData(0, 0, 640, 480);
    // get pixel data
    this.pixels = this.imgData.data;

    // get rgb data for each step pixel in 100 x 100
    this.rgb = [];
    for (let j = 0; j < 480; j += this.stepY) {
      for (let i = 0; i < 640; i += this.stepX) {
        let index = (j * 640 + i) * 4;
        this.rgb.push({
          r: this.pixels[index],
          g: this.pixels[index + 1],
          b: this.pixels[index + 2],
          a: this.pixels[index + 3],
        });
      }
    }
  }

  draw() {
    this.detectPixels();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //draw all rects of the grid
    this.grid.forEach((rects, index) => {
      const color = this.rgb[index];
      rects.color = `rgba(${color.r}, ${color.g}, ${color.b},0.4)`;

      rects.draw();
    });
    requestAnimationFrame(this.draw.bind(this));
  }

  map(x, inMin, inMax, outMin, outMax) {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}

window.onload = function () {
  new App();
};
