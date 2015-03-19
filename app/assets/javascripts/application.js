//= require jquery
//= require jquery_ujs
//= require tasks
// --------- MODULES --------
//= require mustache
//= require underscore
//= require modules/render.module
//= require modules/core.module
//= require modules/task.module
//= require modules/ui.module


// Global JS
String.prototype.format = function() {
  var formatted = this;
  for( var arg in arguments ) {
    formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }
  return formatted;
};