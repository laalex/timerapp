/**
 * @author: Lamba Alexandru
 * @contact: contact@alexandrulamba.com
 * @version: 1.0
 * @description: FrontEnd core module
 */
var Core  = (function (module) {

  // Private members
  var _init = function(){
    console.log("CoreModule inited;");
  }

  // Public members
  module.init = function(){
    _init();
  }


  return module;
})(Core || {});