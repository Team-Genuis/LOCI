/*global module:false*/
module.exports = function(grunt) {
  require('jit-grunt')(grunt); // npm install --save-dev load-grunt-tasks
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    //clean: {
    //  build: ["path/to/dir/one", "path/to/dir/two"],
    //  release: ["path/to/another/dir/one", "path/to/another/dir/two"]
    //},
    concurrent: {
      watchers: {
        tasks: ['watch:server', 'nodemon:dev'],
        options: {
          logConcurrentOutput: true
        }
      },
      target2: ['jshint', 'mocha']
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'tmp',
          ext: '.js'
        }]
      }
    },
    browserify: {
      dist: {
        files: {
          'build/loci.js': ['tmp/js/**/*.js']
        },
        options: {
          //transform: ['coffeeify']
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['src/**/*.js', 'tests/**/*.js']
    },
    watch: {
      server: {
        files: ['src/**/*', 'Gruntfile.js'],
        tasks: ['build'],

        options: {
          livereload: true,
        },
      },
      config: {
        files: ['config/*.js'],
        tasks: ['copy:config'],
      }
    },
    /**
      The nodemon task will start your node server. The watch parameter will tell
      nodemon what files to look at that will trigger a restart. Full grunt-nodemon
      documentation
    **/
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          /** Environment variables required by the NODE application **/
          env: {
            "NODE_ENV": "development",
            "NODE_CONFIG": "dev"
          },
          watch: ["**/*", "!.git/", "!tmp/"],
          delay: 300,
          callback: function(nodemon) {
            nodemon.on('log', function(event) {
              console.log(event.colour);
            });
            /** Open the application in a new browser window and is optional **/
            nodemon.on('config:update', function() {
              // Delay before server listens on port
              setTimeout(function() {
                //require('open')('http://127.0.0.1:8000');
              }, 1000);
            });
            /** Update .rebooted to fire Live-Reload **/
            nodemon.on('restart', function() {});
          }
        }
      }
    },
    jsdoc: {
      dist: {
        src: ['src/**/*.js'],
        options: {
          destination: 'docs/jsdocs'
        }
      }
    },
    copy: {
      deps: {
        files: [
          // includes files within path
          //{expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

          // includes files within path and its sub-directories
          {
            expand: true,
            flatten: true,
            //cwd: 'src/',
            src: ['node_modules/three/three.min.js'],
            dest: 'build/deps/'
          }, {
            expand: true,
            cwd: 'tmp/',
            src: ['**'],
            dest: 'build/'
          },

          // makes all src relative to cwd
          //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

          // flattens results to a single level
          //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
        ],
      },
      build: {
        files: [
          // includes files within path
          //{expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

          // includes files within path and its sub-directories
          {
            expand: true,
            cwd: 'src/',
            src: ['*', '!*.js'],
            dest: 'build/'
          }, {
            expand: true,
            cwd: 'tmp/',
            src: ['**'],
            dest: 'build/'
          },

          // makes all src relative to cwd
          //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

          // flattens results to a single level
          //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
        ],
      },
    },
    tape: {
      options: {
        pretty: true,
        output: 'console'
      },
      files: ['tests/**/*.js']
    },
    replace: {
      config: {
        options: {
          patterns: [{
            match: /<!--<script>var config;<\/script>-->/g,
            replacement: '<script> var config = ' + JSON.stringify(require('./config/core.js')) + ';</script>'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['src/index.html'],
          dest: 'build/'
        }]
      }
    },
    cordovacli: {
      options: {
        path: 'build',
        cli: 'cca' // cca or cordova
      },
      cordova: {
        options: {
          command: ['create', 'platform', 'plugin', 'build'],
          platforms: ['android'],
          plugins: ['device', 'dialogs'],
          path: 'build',
          id: 'io.teamgenuis.loci',
          name: 'LOCI'
        }
      },
      create: {
        options: {
          command: 'create',
          id: 'com.LOCI',
          name: 'LOCI'
        }
      },
      add_platforms: {
        options: {
          command: 'platform',
          action: 'add',
          platforms: ['android']
        }
      },
      add_plugins: {
        options: {
          command: 'plugin',
          action: 'add',
          plugins: [
            //'battery-status',
            //'camera',
            'console',
            //'contacts',
            'device',
            'device-motion',
            'device-orientation',
            'dialogs',
            //'file',
            'geolocation',
            //'globalization',
            //'inappbrowser',
            'media',
            'media-capture',
            'network-information',
            'splashscreen',
            'vibration'
          ]
        }
      },
      remove_plugin: {
        options: {
          command: 'plugin',
          action: 'rm',
          plugins: [
            'battery-status'
          ]
        }
      },
      build_ios: {
        options: {
          command: 'build',
          platforms: ['ios']
        }
      },
      build_android: {
        options: {
          command: 'build',
          platforms: ['android']
        }
      },
      emulate_android: {
        options: {
          command: 'emulate',
          platforms: ['android'],
          args: ['--target', 'Nexus5']
        }
      },
      add_facebook_plugin: {
        options: {
          command: 'plugin',
          action: 'add',
          plugins: [
            'com.phonegap.plugins.facebookconnect'
          ],
          args: ['--variable', 'APP_ID=fb12132424', '--variable', 'APP_NAME=myappname']
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['build', 'concurrent:watchers']);
  //grunt.registerTask('run', ['watch:server','run' ]);
  grunt.registerTask('build', ['jshint', 'transpile', 'copy:deps', 'copy:build', 'replace', 'browserify']);
  grunt.registerTask('transpile', ['babel:build', 'jsdoc']);
  //grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  //grunt.registerTask('default', ['concurrent:target1', 'concurrent:target2']);
  // yaml tester for ./PATH/TO/YOUR/SWAGGER.yaml
  //grunt.task.registerTask('yamlTest', ['jshint', 'swagger-js-codegen:main']);
};
