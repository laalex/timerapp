/**
 * @author: Lamba Alexandru
 * @contact: contact@alexandrulamba.com
 * @version: 1.0
 * @description: Task Module
 */
var TaskModule = (function (module) {

  var CONSTANTS = {
    _currentId: null,
    _isCounting: false,
    _startDuration: null,
    _currentDuration: null,
    _currentInterval: null
  }

  // Private members
  var _init = function(){
    console.log("TaskModule inited;");
  }

  // Set current ID
  var _setCurrent = function(id){
    CONSTANTS._currentId = id;
    return id;
  }
  // Start counting
  var _startCounting = function(start){
    // Set the start duration
    CONSTANTS._startDuration = start;
    // Update the state to counting
    CONSTANTS._isCounting = true;
    // Start the countdown
    _startCount();
    // Update the UI with the current duration
    UI.updateTaskCount(CONSTANTS._currentId, CONSTANTS._currentDuration);
  }

  // Stop counting
  var _stopCounting = function(){
    // Set the counting state to false
    CONSTANTS._isCounting = true;
  }

  // Start counting
  var _startCount = function(){
    // Create an interval for the current item and do the countdown
  }


  // Public members -> Export module functions
  module.init = function(){
    _init();
  }

  module.setCurrent = function(id){
    _setCurrent(id);
  }

  module.startCounting = function(start){
    _startCounting(start);
  }

  module.stopCounting = function(){
    _stopCounting();
  }


  return module;
})(TaskModule || {});