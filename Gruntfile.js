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
                //watch: true
            }
        },
        

        // watchify: {
        //     options: {
        //         // defaults options used in b.bundle(opts)
        //         detectGlobals: true,
        //         insertGlobals: false,
        //         ignoreMissing: false,
        //         debug: false,
        //         standalone: false,
        //         keepalive: false,
        //         callback: function(b) {
        //             // configure the browserify instance here
        //             b.add();
        //             b.require();
        //             b.external();
        //             b.ignore();
        //             b.transform();

        //             // return it
        //             return b;
        //         }
                
        //     },
        //     app: {
        //         src: './public/js/src/app.js',
        //         dest: './public/js/build/app.js'
        //     }
        // },
        
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "public/css/build/main.min.css": "public/css/src/main.less"
                }
            }
        },

        watch: {
            styles: {
                files: ['public/**/*.less'], 
                tasks: ['less'],
                options: {
                    nospawn: true
                }
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
                    'public/js/build/app.min.js': ['public/js/build/app.js']
                }
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-browserify');
    //grunt.loadNpmTasks('grunt-watchify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['browserify', 'watch']);

};