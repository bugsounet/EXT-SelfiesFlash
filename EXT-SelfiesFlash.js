/*************************
*  EXT-SelfiesFlash v1.0 *
*  Bugsounet             *
*  11/2022               *
**************************/

Module.register("EXT-SelfiesFlash", {
  defaults: {
    debug: false,
    gpio: 17
  },

  getDom: function() {
    var wrapper = document.createElement("div")
    wrapper.style.display= "none"
    return wrapper
  },

  socketNotificationReceived: function(noti, payload) {
    switch(noti) {
      case "GPIO_NOT_ACCESSIBLE":
        this.sendNotification("EXT_ALERT", {
          type: "error",
          message: "Gpio functionality is not accessible on this computer"
        })
        break
      case "OPENFLASH_ERROR":
        this.sendNotification("EXT_ALERT", {
          type: "error",
          message: "Error happen when opening flash"
        })
        break
      case "CLOSEFLASH_ERROR":
        this.sendNotification("EXT_ALERT", {
          type: "error",
          message: "Error happen when closing flash"
        })
        break
      case "REBUILD_NEEDED":
        this.sendNotification("EXT_ALERT", {
          type: "error",
          message: "Error Detected. Try to solve it with `npm run rebuild` in EXT-SelfiesFlash directory",
          timer: 10000
        })     
        break

    }
  },

  notificationReceived: function(noti, payload, sender) {
    switch(noti) {
      case "DOM_OBJECTS_CREATED":
        this.sendSocketNotification('INIT', this.config)
        break
      case "GAv4_READY":
        if (sender.name == "MMM-GoogleAssistant") this.sendNotification("EXT_HELLO", this.name)
        break
      case "EXT_SELFIESFLASH-ON":
        this.sendSocketNotification("FLASH-ON")
        break
      case "EXT_SELFIESFLASH-OFF":
        this.sendSocketNotification("FLASH-OFF")
        break
    }
  },

})
