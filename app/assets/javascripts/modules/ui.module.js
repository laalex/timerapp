/**
 * @author: Lamba Alexandru
 * @contact: contact@alexandrulamba.com
 * @version: 1.0
 * @description: UI Module
 */
var UI  = (function (module) {
  // Private members
  var _init = function(){
    console.log("UIModule inited;");
    _attachEventListenrs();
  }

  // Update the task count on an interface
  var _updateTaskCountInterface = function(id, duration){
    // Find the element with ID

    // Update the duration
  }

  // Attach event listeners
  var _attachEventListenrs = function(){

  }

  // Popups UI
  var _popups = {
    showPopup: function(wrapper, title, message, actions){
      // Show a popup in a wrapper with a title, message and optional actions buttons
    },

    hidePopups: function(){
      $(".popup" ).hide();
    }
  }


  // Public members
  module.init = function(){
    _init();
  }

  module.updateTaskCount = function(id, duration){
    _updateTaskCountInterface(id, duration);
  }

  // Popup UI object
  module.popup = _popups;

  return module;
})(UI || {});