var sass = require('../node_modules/sass.js/dist/sass.sync.js');


function attachToDOM(source) {
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = source;
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


function reportError(error) {
  console.error(error);
}


function _run(moduleMeta, options) {
  options = options || {};
  sass.options(options.sass);

  function sassCompiled(result) {
    if (options.load !== false) {
      attachToDOM(result);
    }

    return {
      source: result,
      code: result
    };
  }

  return compileSass(sass, moduleMeta.source).then(sassCompiled, reportError);
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
