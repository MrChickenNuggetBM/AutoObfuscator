# AutoObfuscator

This respository contians Node.js code which'll allow for automatic on-save Obfuscation for external JS files [1] and Uglification for external CSS files [2].

File saves are watched for [3] and the obfuscation/uglification is done on the saved file accordingly.

The watcher is, by default, set to watch for changes in all files (or technically files within 99 nested layers) within the `path/to/server/directory` directory.
The user should change this to their server directory if they wish for this default behaviour.

If the user wants to change this default behaviour to, for example, watch for changes to ***particular*** files or directories within their server, they should consult [3] and change the following lines of code accordingly (index.js):

```
// Watch all JS and CSS files on the server
const serverDirectory = 'path/to/server/directory'; // Update this with your server directory
const watcher = chokidar.watch(serverDirectory, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    depth: 99 // Set depth to watch nested directories
});
```

The default settings for the javascript obfuscation is shown below. If the user wishes to change this for their own use, they should consult [1]; then find and change the following block of code accordingly [1] (index.js).

```
const result = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: [],
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
});
```

[1] javascript-obfuscator: https://github.com/javascript-obfuscator/javascript-obfuscator

[2] uglifycss: https://github.com/fmarcia/uglifycss

[3] chokidar: https://github.com/paulmillr/chokidar
