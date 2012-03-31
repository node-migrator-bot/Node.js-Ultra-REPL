module.exports = {
  inspector: {
    builtins: true,
    hiddens: false,
    protos: true,
    multiItemLines: true,
    globalExec: false,
    depth: 4
  },
  execution: {
    addCompletionsToGlobal: true,
    codeIntel: true,
  },
  autoload: [
    'basic',
    'navigation',
    'toggles',
    'contexts',
    'repldev',
    'library',
    'clipboard'
  ]
};