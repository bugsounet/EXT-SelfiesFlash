/*************************
*  EXT-SelfiesFlash v1.0 *
*  Bugsounet             *
*  11/2022               *
**************************/

Module.register("EXT-SelfiesFlash", {
  defaults: {

  },

  start: function () {

  },

  getDom: function() {
    var wrapper = document.createElement("div")
    wrapper.style.display= "none"
    return wrapper
  },

  socketNotificationReceived: function(noti, payload) {
/*
    switch(noti) {

    }
*/
  },

  notificationReceived: function(noti, payload, sender) {
    switch(noti) {
      case "DOM_OBJECTS_CREATED":
        this.sendSocketNotification('INIT', this.config)
        break
      case "GAv4_READY":
        if (sender.name == "MMM-GoogleAssistant") this.sendNotification("EXT_HELLO", this.name)
        break
    }
  },

})
