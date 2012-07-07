var exists = fs.existsSync || fs.existsSync;


// npm install direct-proxies
var shim = require('direct-proxies');



module.exports = [{
  name: 'Shim Direct-Proxies',
  help: 'Shims `Proxy` on the current context to use the Direct-Proxies shim.',
  defaultTrigger: { type: 'command', trigger: '.dp' },
  action: function(){
    shim(this.context.ctx);
    return this.context.ctx.Proxy;
  }
}];
