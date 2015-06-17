# sassy-bits
> sass transform plugin for bit-imports

This plugin uses [sass.js](https://github.com/medialize/sass.js) to do the heavy lifting.  Using sass.js gives us the ability to transpile scss right in the browser.


### Install

```
npm install sassy-bits -D
```

For sassy-bits to work correctly, you must also install `sass.js`.

```
npm install sass.js -D
```


### Sample configuration

``` javascript
/* jshint unused: false, undef: false */
var System = (function() {
  var importer = bitimports.config({
    "paths": {
      "sass": "./node_modules/sassy-bits/dist/index.js",
    }
  });


  // Make sure we configure the builtin `js` plugin to only process
  // js files... Add other extensions that need to be processed by
  // the js pipeline right here.
  importer.plugin("js", {
    match: {
      path: '**/*.js'
    }
  });


  // Setup sass pipeline to process all files with css and scss
  // extensions
  importer.plugin("sass", {
    match: {
      path: ['**/*.css', '**/*.scss']
    },
    transform: "sass"
  });


  return importer;
})();

var require = System.require;


// Now we can import css and scss files
require('!./path/to/some/file.scss);
```


### Sassy options

All sass options must be in a `sass` object, which is passed directly to the compiler.

``` javascript
  importer.plugin("sass", {
    match: {
      path: ['**/*.css', '**/*.scss']
    },
    transform: {
      handler: "sass",
      sass: {
        comments: false
      }
    }
  });
```

For a list of available options, please take a look [here](https://github.com/medialize/sass.js/#using-the-sassjs-api).
