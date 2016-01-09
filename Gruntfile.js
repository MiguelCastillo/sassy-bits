//
// http://24ways.org/2013/grunt-is-not-weird-and-hard/
//
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      test: {
        options: {
          port: 8942,
          hostname: 'localhost'
        }
      },
      keepalive: {
        options: {
          port: 8949,
          host: 'localhost',
          keepalive: true,
          open: 'http://localhost:8949/test/SpecRunner.html'
        }
      }
    },
    mocha: {
      test: {
        options: {
          log: true,
          logErrors: true,
          reporter: 'Spec',
          run: false,
          timeout: 10000,
          urls: ['http://localhost:8942/test/SpecRunner.html']
        }
      }
    },
    watch: {
      test: {
        files: ['src/**/*.js', 'test/**/*.js', '*.js'],
        tasks: ['jshint:all', 'browserify:build'],
        options: {
          livereload: 32020
        }
      }
    },
    jshint: {
      all: {
        options: {
          jshintrc: true,
          reporter: require('jshint-stylish')
        },
        src: ['src/**/*.js', 'test/**/*.js', '*.js']
      }
    },
    concurrent: {
      test: {
        tasks: ['connect:keepalive', 'watch:test'],
        options: {
          logConcurrentOutput : true
        }
      }
    },
    browserify: {
      'build': {
        files: {
          'dist/index.js': ['src/index.js']
        },
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today() %>. (c) <%= grunt.template.today("yyyy") %> Miguel Castillo. Licensed under MIT */',
          browserifyOptions: {
            ignoreMissing: true,
            detectGlobals: true,
            standalone: 'sassybits'
          }
        }
      }
    },
    uglify: {
      build: {
        options: {
          preserveComments: 'some',
          sourceMap: false
        },
        files: {
          'dist/index.min.js': ['dist/index.js']
        }
      }
    },
    release: {
      options: {
        tagName: 'v<%= version %>',
        tagMessage: 'Version <%= version %>',
        commitMessage: 'Release v<%= version %>',
        afterBump: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('build', ['jshint:all', 'browserify:build', 'uglify:build']);
  grunt.registerTask('serve', ['concurrent:test']);
  grunt.registerTask('test', ['connect:test', 'mocha:test']);
};
