module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: './bower_components/bootstrap/fonts/',
                        src: ['*'],
                        dest: './public/fonts/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        less: {
            dev: {
                src: 'assets/less/style.less',
                dest: 'public/stylesheets/style.css'
            }
        },

        express: {
            dev: {
                options: {
                    script: 'bin/www',
                    node_env: 'dev'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ]
            },
            dev: {
                src: 'public/stylesheets/style.css'
            }
        },

        concat: {
            scripts: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/bootstrap.js'
                ],
                dest: 'public/javascripts/script.js'
            }
        },

        watch: {
            less: {
                files: [ 'assets/less/**/*.less' ],
                tasks: [ 'less', 'autoprefixer' ],
                options: {
                    spawn: false,
                    interrupt: true
                }
            },

            express: {
                files: [ '**/*.js', '!**/node_modules/**', '!**/bower_components/**', '!Gruntfile.js' ],
                tasks: [ 'express:dev' ],
                options: {
                    spawn: false,
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['copy', 'less', 'autoprefixer', 'concat', 'express:dev', 'watch']);

}
