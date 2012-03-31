var UltraREPL = require('../');
var net = require('net')
var cp = require('child_process');
var fs = require('fs');
fs.existsSync || (fs.existsSync = require('path').existsSync);


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
    UltraREPL(socket, socket);
  }).listen(1337);

  cp.exec('putty.exe -load "UltraREPL"', function(putty){});
}