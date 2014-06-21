module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // packages
        pkg: grunt.file.readJSON('package.json'),

        // minify javascript
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/assets/js/main.js',
                dest: 'build/assets/js/main.min.js'
            }
        },

        // jshint config
        jshint: {
            all: ['src/assets/**/*.js'],
            options: {
                ignores: ['src/assets/js/lib/*.js', 'src/assets/js/lib/**/*.js'],
                globals: {
                    jQuery: true,
                    angular: true

                }
            }
        },

        // compile sass
        compass: {                          // Task
            dist: {                         // Target
                options: {                  // Target options
                    config: 'config/compass-build.rb'
                }
            },
            dev: {                          // Another target
                options: {
                    config: 'config/compass-dev.rb'
                }
            }
        },

        // image minify
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/img',
                    src: ['*.{png,jpg,gif}', '**/*.{png,jpg,gif}'],
                    dest: 'src/assets/img'
                }]
            }
        },


        // // karma automated testing
        // karma: {
        //     continuous: {
        //         configFile: 'config/karma-config.js',
        //         autoWatch: false,
        //         background: true
        //     },
        //     all: {
        //         configFile: 'config/karma-config.js',
        //         autoWatch: true,
        //         background: false
        //     }
        // },

        // watch config
        watch: {
            scripts: {
                files: ['src/assets/**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                }
            },

            // karma: {
            //     files: ['src/assets/**/*.js', 'tests/**/*.js'],
            //     tasks: ['karma:continuous:run']
            // },

            images: {
                files: ['src/assets/img/*.{png,jpg,gif}', 'src/assets/img/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },

            styles: {
                files: ['src/assets/scss/*.scss','src/assets/scss/**/*.scss'],
                tasks: ['compass:dev']
            }
        },

        // Server configuration.
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'src'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    // grunt.loadNpmTasks('grunt-karma');


    // watch task
    var watchScripts = Object.create(null);

    var watchScriptsChange = grunt.util._.debounce(function() {
        grunt.config(['jshint', 'all'], Object.keys(watchScripts));
        watchScripts = Object.create(null);
    }, 200);

    grunt.event.on('watch', function(action, filepath, target) {
        switch(target){
            case "karma":
                // could customize karma run time
                break;
            case "scripts":
                watchScripts[filepath] = action;
                watchScriptsChange();
                break;
        }
    });


    // test task
    // grunt.registerTask('test', ['karma:unit:run']);


    // build task
    grunt.registerTask('build', ['uglify', 'compass']);


    // Default task.
    // grunt.registerTask('default', ['karma:continuous', 'watch']);
    grunt.registerTask('default', ['connect', 'watch']);
};