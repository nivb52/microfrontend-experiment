// @todo: implenment it in shared libs
export const Logger = (function (w) {
  var Logger;

  Logger = function () {
    this.console = w.console;
  };

  Logger.prototype.log = function (message) {
    if (window.PRODUCTION) return;
    this.console.log(message);
  };

  Logger.prototype.info = function (message) {
    if (window.PRODUCTION) return;
    this.console.info(message);
  };

  Logger.prototype.warn = function (message) {
    this.console.warn(message);
  };

  Logger.prototype.error = function (message) {
    this.console.error(message);
  };

  Logger.prototype.group = function (identifier) {
    this.console.group(identifier);
  };

  Logger.prototype.groupEnd = function (identifier) {
    this.console.groupEnd(identifier);
  };

  return Logger;
})(window);
