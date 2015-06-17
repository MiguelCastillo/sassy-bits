var require;
require = (function() {
  var importer = bitimports.config({
    "baseUrl": "../",
    "paths": {
      "mocha": "../node_modules/mocha/mocha",
      "chai": "../node_modules/chai/chai"
    },
    "urlArgs": 'bust=' + (new Date()).getTime()
  });

  importer.ignore({
    match: ["chai", "dist/index"]
  });

  bitimports.Logger.enableAll();
  return importer.require;
})();
