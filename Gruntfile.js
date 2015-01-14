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
                files: { 'public/build/app.js': ['public/src/app.js'] }
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
                    'public/build/app.min.js': ['public/build/app.js']
                }
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['browserify', 'uglify']);
};