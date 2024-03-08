/***************
*  EXT-Selfies *
*  Bugsounet   *
***************/

var log = () => { /* do nothing */ };
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  start () {
    this.init = false;
    this.led = null;
    this.Gpio= null;
  },

  initialize (payload) {
    console.log("[SELFIESFLASH] EXT-SelfiesFlash Version:", require("./package.json").version, "rev:", require("./package.json").rev);
    this.config = payload;
    if (payload.debug) {
      log = (...args) => { console.log("[SELFIESFLASH]", ...args); };
    }
    try {
      this.Gpio = require("onoff").Gpio;
    } catch (err) {
      console.error("[SELFIESFLASH] Library not installed correctly");
      this.sendSocketNotification("REBUILD_NEEDED");
      return;
    }
    if (!this.Gpio.accessible) {
      console.error("[SELFIESFLASH] Gpio functionality is not accessible on this computer");
      this.sendSocketNotification("GPIO_NOT_ACCESSIBLE");
      return;
    }
    try {
      this.led = new this.Gpio(this.config.gpio, "out");
      process.on("exit", (code) => {
        this.led.unexport();
        console.log("[SELFIESFLASH] Free Gpio");
      });
      this.init = true;
    } catch (err) {
      console.error(`[SELFIESFLASH] ${err}`);
      return;
    }
    this.sendSocketNotification("INITIALIZED");
  },

  socketNotificationReceived (noti, payload) {
    switch (noti) {
      case "INIT":
        this.initialize(payload);
        break;
      case "FLASH-ON":
        if (!this.init) return;
        this.openFlash();
        break;
      case "FLASH-OFF":
        if (!this.init) return;
        this.closeFlash();
        break;
    }
  },

  openFlash () {
    // open the flash code there
    log("open flash");
    this.led.write(1, (err) => {
      if (err) console.error(`[SELFIESFLASH] openFlash error:${err}`);
    });
  },

  closeFlash () {
    // close the flash code there
    log("close flash");
    this.led.write(0, (err) => {
      if (err) console.error(`[SELFIESFLASH] CloseFlash error:${err}`);
    });
  }
});
