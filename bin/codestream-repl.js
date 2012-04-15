var id = '';

if (!id) throw new Error('Need an id');

var UltraREPL = require('../');
var net = require('net');
var cp = require('child_process');
var fs = require('fs');
var path = require('path');
fs.existsSync = fs.existsSync || path.existsSync;

var codestream = require('codestream');


init(putty);



function putty(){
  net.createServer(function(socket){

    var timer = setTimeout(function () {
      console.error('Connection timeout.');
      process.exit(1);
    }, 30000);

    console.log('Connecting to codestre.am');

    codestream(id, function(err, client){
      clearTimeout(timer);

      if (err) console.log('Error: '+err);

      console.log('Connected');

      client.on('spawn', function (size) {
        console.log('Spawned');

        var repl = UltraREPL({
          input: socket,
          output: socket,
          width: size.cols,
          height: size.rows
        });

        repl.on('endsession', function(code){
          client.emit('exit', function () {
            console.log('Client exiting, http://codestre.am/' + id);
            process.exit(0);
          });
        });

        repl.rli.on('print', function(data){
          client.send(Date.now() + ':' + data.toString());
        });
      });

      client.on('disconnect', function () {
        console.log('disconnected from codestream');
      });

    });

  }).listen(1337);

  cp.exec('"'+path.resolve(__dirname, 'putty.exe')+'" -load "codestream"', function(putty){});
}



function init(cb){
  if (fs.existsSync('PuTTY.reg')) {
    cp.exec('reg import PuTTY.reg', function(){
      fs.renameSync('PuTTY.reg', 'PuTTY-installed.reg');
      workspace(cb);
    });
  } else {
    workspace(cb);
  }
}

function workspace(cb){
  if (process.cwd() === __dirname) {
    if (!fs.existsSync('../workspace')) {
      fs.mkdirSync('../workspace');
    }
    process.chdir('../workspace');
  }
  cb();
}


