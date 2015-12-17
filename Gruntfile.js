module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                src: "public_html/{,modules/**/}*.js"
            }
        },
        clean: {
            dist: ['.tmp', 'dist', 'public_html/*.tmp'],
            tmp: ['.tmp', 'public_html/*.tmp', '*.war']
        },
        injector: {
            options: {
                bowerPrefix: 'bower:',
                template: 'public_html/index.html',
                ignorePath: 'public_html',
                addRootSlash: false
            },
            development: {
                files: {
                    'public_html/index.html': [
                        'bower.json',
                        'public_html/{,modules/**/}*.js',
                        'public_html/resources/startbootstrap-landing-page/css/landing-page.css',
                        'public_html/resources/startbootstrap-landing-page/font-awesome/css/font-awesome.css',
                        'public_html/resources/styles/*.css'
                    ]
                }
            },
            globalize: {
                options: {
                    starttag: "<!-- injector:globalize:{{ext}} -->"
                },
                files: {
                    'public_html/index.html': [
                        'public_html/bower_components/cldrjs/dist/{cldr,cldr/*}.js',
                        'public_html/bower_components/globalize/dist/globalize.js',
                        'public_html/bower_components/globalize/dist/globalize/number.js',
                        'public_html/bower_components/globalize/dist/globalize/date.js',
                    ]
                }
            },
            prepare: {
                options: {
                    min: true,
                    relative: true,
                    template: 'public_html/index.html'
                },
                files: {
                    'public_html/index.tmp': ['.tmp/scripts/**/*.js', '.tmp/ressources/styles/*.css', 'bower.json']
                }
            }
        },
        ngAnnotate: {
            build: {
                files: [{
                        expand: true,
                        src: "public_html/{,modules/**/}*.js",
                        ext: '.annotated.js',
                        dest: '.tmp/scripts'
                    }]
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            release: {
                files: [{
                        expand: true,
                        cwd: 'public_html/resources/styles/',
                        src: '*.css',
                        dest: '.tmp/resources/styles/'
                    }]
            }
        },
        copy: {
            release: {
                expand: true,
                cwd: 'public_html',
                src: ['{,modules/**/}*.html', 'resources/{*,!styles}/**', 'bower_components/cldr-data/**/*.json'],
                dest: 'dist/'
            }
        },
        useminPrepare: {
            html: 'public_html/index.tmp',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/{,*/}*.html'],
            css: ['dist/styles/{,*/}*.css'],
            js: ['dist/scripts/{,*/}*.js']
        },
        htmlmin: {
            release: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                        expand: true,
                        cwd: 'dist',
                        src: ['{,**/}*.html'],
                        dest: 'dist'
                    }]
            }
        }
    });

    grunt.registerTask("development", [
        'injector:development',
        'injector:globalize'
    ]);

    grunt.registerTask('release', [
        'clean',
        'jshint:all',
        'ngAnnotate:build',
        'postcss:release',
        'copy:release',
        'injector:prepare',
        'injector:development',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'htmlmin:release',
        'injector:development',
        'clean:tmp'
    ]);

};