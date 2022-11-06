/********************
*  EXT-Selfies v1.0 *
*  Bugsounet        *
*  11/2022          *
********************/

var log = () => { /* do nothing */ };
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  start: function() {

  },

  initialize: function(payload) {
    console.log("[SELFIESFLASH] EXT-Selfies Version:", require('./package.json').version, "rev:", require('./package.json').rev)
    this.config = payload
    if (payload.debug) {
      log = (...args) => { console.log("[SELFIESFLASH]", ...args) }
    }
  },

  socketNotificationReceived: function(noti, payload) {
    switch (noti) {
      case "INIT":
        this.initialize(payload)
        break
    }
  },

  openFlash: function() {
    // open the flash code there
    log("open flash")
  },

  closeFlash: function() {
    // close the flash code there
    log("close flash")
  }

});
