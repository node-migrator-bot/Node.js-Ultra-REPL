module.exports = [
  { name: 'Next Page',
    help: 'Next page of results.',
    defaultTrigger: api.keybind('pgdn'),
    action: function(){
      if (this.pages.length) {
        this.rli.writePage(this.pages.next());
        this.header();
      }
    }
  },
  { name: 'Previous Page',
    help: 'Previous page of results.\n',
    defaultTrigger: api.keybind('pgup'),
    action: function(){
      if (this.pages.length) {
        this.rli.writePage(this.pages.prev());
        this.header();
      }
    }
  },
  cmd('Delete Left',        'bksp'),
  cmd('Delete Right',       'del'),
  cmd('Delete Word Left',   'ctrl+bksp'),
  cmd('Delete Word Right',  'ctrl+del'),
  cmd('Delete Line Left',   'ctrl+shift+bksp'),
  cmd('Delete Line Right',  'ctrl+shift+del'),
  cmd('Line Left',          'home'),
  cmd('Line Right',         'end'),
  cmd('Word Left',          'ctrl+left'),
  cmd('Word Right',         'ctrl+right'),
  cmd('Move Left',          'left'),
  cmd('Move Right',         'right'),
  cmd('History Prev',       'up'),
  cmd('History Next',       'down'),
  cmd('Line',               'enter'),
  //cmd('Tab Complete',       'tab'),
];


function cmd(name, trigger){
  var fnName = '_'+name[0].toLowerCase() + name.slice(1).replace(/\s/g, '');
  return {
    name: name,
    help: false,
    defaultTrigger: api.keybind(trigger),
    action: function(){ this.rli[fnName]() }
  }
}