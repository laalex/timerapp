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
  }

  // Public members
  module.init = function(){
    _init();
  }


  return module;
})(UI || {});