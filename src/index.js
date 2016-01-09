var sass = require('sass.js/dist/sass.sync.js');


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


function run(meta, options) {
  options = options || {};

  if (options.sass) {
    sass.options(options.sass);
  }

  function sassCompiled(result) {
    result = result || '';

    if (options.load !== false && result) {
      attachToDOM(result);
    }

    return {
      source: result,
      exports: result
    };
  }

  return compileSass(sass, meta.source).then(sassCompiled, reportError);
}


function transformSass(meta, options) {
  return run(meta, options);
}


transformSass.configure = function(options) {
  return function process(meta) {
    return run(meta, options);
  };
};


transformSass.Sass = sass;
module.exports = transformSass;
