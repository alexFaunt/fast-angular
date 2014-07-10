module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // packages
        pkg: grunt.file.readJSON('package.json'),

        // minify javascript
        uglify: {
            options: {
                // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'temp/main.js',
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
            },
            build: {                          // Another target
                options: {
                    config: 'config/compass-build.rb'
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

        svgsprite: {
            options: {
                // dims: true
            },
            your_target: {
                src: 'src/assets/img/icons',
                dest: 'src/assets/img/sprites',

                options: {
                    sprite: 'icon-sprite',
                    render: {
                        css: false,
                        scss: '../../scss/global/_icons'
                    }
                }
            },
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

            sprites: {
                files: ['src/assets/img/icons/*.svg'],
                tasks: ['svgsprite']
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
        },

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'src/assets/js/lib/angular/angular.min.js',
                    'src/assets/js/lib/angular/*.js',
                    'src/assets/js/lib/!(modernizr).js',
                    'src/assets/js/*.js',
                    'src/assets/js/modules/*.js',
                    'src/assets/js/services/*.js',
                    'src/assets/js/directives/*.js',
                    'src/assets/js/controllers/*.js',
                    'temp/templates.js'
                ],
                dest: 'temp/main.js',
            },
        },

        clean: {
            build: ["build/*", "build/**/*", "temp/*", "temp/**/*"],
            cleanup: ["temp/*", "temp/**/*"]
        },

        copy: {
            main: {
                files: [
                    {
                        src: ['src/assets/js/lib/modernizr.js'],
                        dest: 'build/assets/js/modernizr.js'
                    },
                    {
                        src: ['src/index-build.html'],
                        dest: 'build/index.html'
                    },
                    {
                        expand: true,
                        cwd: 'src/data',
                        src: ['**'],
                        dest: 'build/data/'
                    },
                    {
                        expand: true,
                        cwd: 'src/translations/',
                        src: ['**'],
                        dest: 'build/translations/'
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/img/sprites/',
                        src: ['**'],
                        dest: 'build/assets/img/sprites/'
                    }
               ]
            },
            debug: {
                files: [
                    {
                        src: ['src/assets/css/main.css'],
                        dest: 'build/assets/css/main.css'
                    },
                    {
                        src: ['temp/main.js'],
                        dest: 'build/assets/js/main.min.js'
                    }
                ]
            }
        },

        ngtemplates: {
            fast: {
                cwd: 'src/',
                src: ['views/**.html', 'views/**/*.html'],
                dest: 'temp/templates.js',
                options: {
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-svg-sprite');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-karma');


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


    // test task
    grunt.registerTask('sprites', ['svgsprite']);


    // build tasks
    grunt.registerTask('build', ['clean:cleanup', 'clean:build', 'ngtemplates', 'concat', 'uglify', 'compass:build', 'copy:main', 'clean:cleanup']);

    grunt.registerTask('debugbuild', ['clean:cleanup', 'clean:build', 'ngtemplates', 'concat', 'compass:dev', 'copy:main', 'copy:debug']);


    // Default task.
    // grunt.registerTask('default', ['karma:continuous', 'watch']);
    grunt.registerTask('default', ['connect', 'watch']);
};