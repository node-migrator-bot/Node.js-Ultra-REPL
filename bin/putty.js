var UltraREPL = require('../');
var net = require('net')
var cp = require('child_process');
var fs = require('fs');
var path = require('path');
fs.existsSync || (fs.existsSync = fs.existsSync);


if (fs.existsSync('PuTTY.reg')) {
  cp.exec('reg import PuTTY.reg', function(){
    fs.renameSync('PuTTY.reg', 'PuTTY-installed.reg');
    putty();
  });
} else {
  putty();
}



function putty(){
  net.createServer(function(socket){
    var repl = UltraREPL({
      input: socket,
      output: socket,
      width: 140,
      height: 40
    });
  }).listen(1337);
  if (process.cwd() === __dirname) {
  	if (!fs.existsSync('../workspace')) {
  		fs.mkdirSync('../workspace');
  	}
  	process.chdir('../workspace');
  }

  cp.exec('"'+path.resolve(__dirname, 'putty.exe')+'" -load "UltraREPL"', function(putty){});
}