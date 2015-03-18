/**
 * @author: Lamba Alexandru
 * @contact: contact@alexandrulamba.com
 * @version: 1.0
 * @description: Task Module
 */
var TaskModule = (function (module) {

  // Private members
  var _init = function(){
    console.log("TaskModule inited;");
  }

  // Public members
  module.init = function(){
    _init();
  }


  return module;
})(TaskModule || {});