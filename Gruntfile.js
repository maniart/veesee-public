module.exports = function(grunt) {

  grunt.initConfig({
      
    pkg: grunt.file.readJSON('package.json'),
    
    bower: {
      install: {
        options: {
          targetDir: 'public/bower_components',
          layout: 'byComponent',
          verbose: 'true',
          cleanup: 'true'
        }
      }
    },

    browserify: {
        dist: {
            files: { 'public/js/build/app.js': ['public/js/src/app.js'] }
        }, 
        options: {
            transform: ['brfs']
        }
    },
    
    less: {
        development: {
            options: {
                compress: false
            },
            files: {
                "public/css/build/main.min.css": "public/css/src/main.less"
            }
        },
        production: {
            options: {
                compress: true
            },
            files: {
                "public/css/build/main.min.css": "public/css/src/main.less"
            }
        }
    },

    watch: {
        styles: {
          files: ['public/**/*.less'], 
          tasks: ['less:development'],
          options: {
            nospawn: true
          }
        },
        scripts: {
          files: ['public/js/app/**/*.js', 'public/js/src/**/*.js', 'public/js/app/templates/**/*.html'],
          tasks: ['browserify']
        }
    },

    uglify: {
        options: {
            mangle: {
                except: ['jQuery', 'Backbone']
            }
        },
        my_target: {
            files: {
                'public/js/build/app.js': ['public/js/build/app.js']
            }
        }
    }
      
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('dev', [
    'less:development',
    'browserify',
    'watch'
  ]);
  grunt.registerTask('prod', [
    'bower:install',
    'less:production',
    'browserify', 
    'uglify'
  ]);

};