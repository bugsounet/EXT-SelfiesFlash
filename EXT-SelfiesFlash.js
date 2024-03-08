/********************
*  EXT-SelfiesFlash *
*  Bugsounet        *
********************/

Module.register("EXT-SelfiesFlash", {
  defaults: {
    debug: false,
    gpio: 17
  },

  start () {
    this.ready= false;
  },

  getDom () {
    var wrapper = document.createElement("div");
    wrapper.style.display= "none";
    return wrapper;
  },

  socketNotificationReceived (noti, payload) {
    switch(noti) {
      case "INITIALIZED":
        this.ready = true;
        this.sendNotification("EXT_HELLO", this.name);
        break;
      case "GPIO_NOT_ACCESSIBLE":
        this.sendNotification("EXT_ALERT", {
          type: "error",
          message: "Gpio functionality is not accessible on this computer"
        });
        break;
      case "OPENFLASH_ERROR":
        this.sendNotification("EXT_ALERT", {
          type: "error",
          message: "Error happen when opening flash"
        });
        break;
      case "CLOSEFLASH_ERROR":
        this.sendNotification("EXT_ALERT", {
          type: "error",
          message: "Error happen when closing flash"
        });
        break;
      case "REBUILD_NEEDED":
        this.sendNotification("EXT_ALERT", {
          type: "error",
          message: "Error Detected. Try to solve it with `npm run rebuild` in EXT-SelfiesFlash directory",
          timer: 10000
        });
        break;

    }
  },

  notificationReceived (noti, payload, sender) {
    switch(noti) {
      case "GA_READY":
        if (sender.name === "MMM-GoogleAssistant") this.sendSocketNotification("INIT", this.config);
        break;
      case "EXT_SELFIESFLASH-ON":
        if (this.ready) this.sendSocketNotification("FLASH-ON");
        break;
      case "EXT_SELFIESFLASH-OFF":
        if (this.ready) this.sendSocketNotification("FLASH-OFF");
        break;
    }
  }

});
