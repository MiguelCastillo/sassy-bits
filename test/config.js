var System = (function() {
  var importer = bitimports.config({
    "baseUrl": "../",
    "paths": {
      "chai": "../node_modules/chai/chai"
    },
    "urlArgs": 'bust=' + (new Date()).getTime()
  });

  importer.ignore({
    match: ["dist/index"]
  });

  bitimports.logger.enable();
  return importer;
})();

var require;
require = System.import;
