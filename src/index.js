var sass = require('../node_modules/sass.js/dist/sass.sync.js');


function attachToDOM(moduleMeta) {
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = moduleMeta.source;
  head.appendChild(style);
}


function compileSass(sass, source) {
  return new Promise(function(resolve, reject) {
    sass.compile(source, function(result, error) {
      if (error) {
        reject(error);
      }
      else {
        resolve(result.text);
      }
    });
  });
}


function _run(moduleMeta, options) {
  options = options || {};
  sass.options(options.sass);

  return compileSass(sass, moduleMeta.source).then(function(result) {
    moduleMeta.configure({
      source: result,
      code: result
    });

    if (options.load !== false) {
      attachToDOM(moduleMeta);
    }
  }, function(error) {
    console.error(error);
  });
}


function transformSass(moduleMeta, options) {
  return _run(moduleMeta, options);
}


transformSass.configure = function(options) {
  return function process(moduleMeta) {
    return _run(moduleMeta, options);
  };
};


transformSass.Sass = sass;
module.exports = transformSass;
