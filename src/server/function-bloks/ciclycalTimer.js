class CiclycalTimer {

  constructor (interval, task) {
    this.interval = interval;
    this.task = task;
}

  start () {
    this.startData = Date.now();
    this.drift = 0;
    this.summTime = 0;
    this.loop()
  }

  stop () {
    clearTimeout(this.timeout);
    this.drift = 0;
    this.summTime = 0;
  }

  loop () {
    this.drift = (Date.now() - this.startData) - this.summTime;
    // console.log("дрифт " + this.drift);
    // console.log("рассчеи " + this.summTime);
    // console.log("факт " + (Date.now() - this.startData));
    this.timeout = setTimeout(() => this.loop(), (this.interval - this.drift));
    this.summTime += this.interval;
    this.task();
  }
}

module.exports = CiclycalTimer;

