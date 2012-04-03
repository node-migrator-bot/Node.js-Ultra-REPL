var path = require('path');
var ScopedModule = require('./lib/ScopedModule');
var UltraREPL = ScopedModule._load(__dirname + '/lib/UltraREPL.js', null, true);

module.exports = function(options){
  return new UltraREPL(options);
}
