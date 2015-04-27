'use strict';

module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    require('time-grunt')(grunt);
    var config = grunt.file.readJSON('config.json');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        concat: {
            styl: {
                src: [
                    './src/assets/css/icons.styl',
                    './src/assets/css/colors.styl',
                    './src/assets/css/fonts.styl',
                    './src/assets/css/general.styl',
                    './src/modules/**/*.styl',
                    './src/assets/**/*.styl'
                ],
                dest: './src/tmp/style.styl'
            }
        },

        jade: {
            templates: {
                options: {
                    wrap: 'node',
                    runtime: true
                },
                files: {
                    "./src/tmp/templates/": ["./src/**/*.jade"]
                }
            },
            prod: {
                options: {
                    client: false,
                    pretty: true,
                    runtime: false
                },
                files: {
                    "./dist/production/www/kowalskastall": ["./src/index.jade"]
                }
            },
            dev: {
                options: {
                    client: false,
                    pretty: true,
                    runtime: false
                },
                files: {
                    "./dist/development/www/kowalskastall/": ["./src/index.jade"]
                }
            }
        },

        stylus: {
            prod: {
                files: {
                    './dist/production/www/kowalskastall/assets/css/style.css': './src/tmp/style.styl'
                }
            },
            dev: {
                options: {
                    compress: false
                },
                files: {
                    './dist/development/www/kowalskastall/assets/css/style.css': './src/tmp/style.styl'
                }
            }
        },

        browserify2: {
            prod: {
                entry: ['./src/base/router/router.js'],
                compile: './dist/production/www/kowalskastall/assets/js/application.js',
                options: {
                    expose: {
                        files: [
                            {
                                cwd: './src/',
                                src: ['**/*.js']
                            }
                        ]
                    }

                }
            },
            dev: {
                entry: ['./src/base/router/router.js'],
                compile: './dist/development/www/kowalskastall/assets/js/application.js',
                options: {
                    expose: {
                        files: [
                            {
                                cwd: './src/',
                                src: ['**/*.js']
                            }
                        ]
                    }

                }
            }
        },

        copy: {
            prodHtml: {
                expand: true,
                cwd: './src/',
                src: '*.html',
                dest: './dist/production/www/kowalskastall'
            },
            devHtml: {
                expand: true,
                cwd: './src/',
                src: '*.html',
                dest: './dist/development/www/kowalskastall/kowalskastall'
            },

            prodImg: {
                expand: true,
                cwd: './src/modules/',
                src: '**/*.jpg',
                dest: './dist/production/www/kowalskastall/assets'
            },
            devImg: {
                expand: true,
                cwd: './src/modules/',
                src: '**/*.jpg',
                dest: './dist/development/www/kowalskastall/assets'
            },

            prodApi: {
                expand: true,
                cwd: './src/api',
                src: ['**/*.*', '../.htaccess'],
                dest: './dist/production/www/kowalskastall/api'
            },
            devApi: {
                expand: true,
                cwd: './src/api',
                src: ['**/*.*', '../.htaccess'],
                dest: './dist/development/www/kowalskastall/api'
            },

            prodConfig: {
                expand: true,
                cwd: './src/config/production',
                src: ['config_regina.php'],
                dest: './dist/production'
            },
            devConfig: {
                expand: true,
                cwd: './src/config/development',
                src: ['config_regina.php'],
                dest: './dist/development'
            },

            prodAssets: {
                expand: true,
                cwd: './src/assets',
                src: ['**/*.jpg', '**/*.png', '**/*.ttf', '**/*.woff', '**/*.docx', '**/*.pdf'],
                dest: './dist/production/www/kowalskastall/assets'
            },
            devAssets: {
                expand: true,
                cwd: './src/assets',
                src: ['**/*.jpg', '**/*.png', '**/*.ttf', '**/*.woff', '**/*.docx', '**/*.pdf'],
                dest: './dist/development/www/kowalskastall/assets'
            },

            prodVendor: {
                expand: true,
                cwd: './vendor/bootstrap',
                src: ['**/*.ttf', '**/*.woff'],
                dest: './dist/production/www/kowalskastall/assets'
            },
            devVendor: {
                expand: true,
                cwd: './vendor/bootstrap',
                src: ['**/*.ttf', '**/*.woff', '**/*.js', '**/*.css'],
                dest: './dist/development/www/kowalskastall/assets'
            }
        },

        hashres: {
            options: {
                encoding: 'utf8',
                fileNameFormat: '${name}-${hash}.${ext}',
                renameFiles: true
            },
            prod: {
                src: [
                    'dist/production/www/kowalskastall/assets/css/*.css',
                    'dist/production/www/kowalskastall/assets/fonts/*.*',
                    'dist/production/www/kowalskastall/assets/icons/*.*',
                    'dist/production/www/kowalskastall/assets/imgs/*.*',
                    'dist/production/www/kowalskastall/assets/js/*.js'
                ],
                dest: [
                    'dist/production/www/kowalskastall/index.html',
                    'dist/production/www/kowalskastall/assets/css/*.css'
                ]
            },
            prodPhotos: {
                src: [
                    'dist/production/www/kowalskastall/assets/photos/*.*'
                ],
                dest: [
                    'dist/production/www/kowalskastall/assets/js/*.js',
                    'dist/production/www/kowalskastall/assets/css/*.css'
                ]
            },
            dev: {
                src: [
                    'dist/development/www/kowalskastall/assets/css/*.css',
                    'dist/development/www/kowalskastall/assets/fonts/*.*',
                    'dist/development/www/kowalskastall/assets/icons/*.*',
                    'dist/development/www/kowalskastall/assets/imgs/*.*',
                    'dist/development/www/kowalskastall/assets/js/*.js'
                ],
                dest: [
                    'dist/development/www/kowalskastall/index.html',
                    'dist/development/www/kowalskastall/assets/css/*.css'
                ]
            },
            devPhotos: {
                src: [
                    'dist/development/www/kowalskastall/assets/photos/*.*'
                ],
                dest: [
                    'dist/development/www/kowalskastall/assets/js/*.js',
                    'dist/development/www/kowalskastall/assets/css/*.css'
                ]
            },
            underConstruction: {
                src: [
                    'src/tmp/underConstruction/*.ttf',
                    'src/tmp/underConstruction/*.css'
                ],
                dest: [
                    'src/tmp/underConstruction/dist/style.css',
                    'src/tmp/underConstruction/dist/index.html'
                ]
            }
        },

        clean: {
            prod: ['./dist/production'],
            dev: ['./dist/development']
        },

        'ftp-deploy': {
            prod: {
                auth: {
                    host: config.hostname,
                    port: 21,
                    authKey: 'key'
                },
                src: 'dist/production/www/kowalskastall',
                dest: '/public_html/kowalskastall',
                exclusions: []
            }
        },

        watch: {
            custom: {
                files: ['./**/*.js', './**/*.jade', './**/*.jpg', './**/*.styl'],
                tasks: ['newer:copy', 'newer:jade', 'newer:browserify2', 'newer:concat', 'newer:styl']
            },
            devBuild: {
                files: ['./src/**/*.*'],
                tasks: ['devBuild']
            },
            api: {
                files: ['./src/api/**/*.*'],
                tasks: ['copy:devApi']
            }
        }
    });


    grunt.registerTask('copyDev', ['newer:copy:devHtml', 'newer:copy:devImg', 'newer:copy:devApi', 'newer:copy:devConfig', 'newer:copy:devAssets', 'newer:copy:devVendor']);
    grunt.registerTask('copyProd', ['copy:prodHtml', 'copy:prodImg', 'copy:prodApi', 'copy:prodConfig', 'copy:prodAssets', 'copy:prodVendor']);

    grunt.registerTask('prepare', ['concat:styl', 'jade:templates']);
    grunt.registerTask('devBuild', ['prepare', 'stylus:dev', 'jade:dev', 'browserify2:dev', 'copyDev']);
    grunt.registerTask('prodBuild', ['clean:prod', 'prepare', 'stylus:prod', 'jade:prod', 'browserify2:prod', 'copyProd', 'hashres:prod', 'hashres:prodPhotos']);

    grunt.registerTask('deploy', ['prodBuild', 'ftp-deploy:prod']);
    grunt.registerTask('api', ['watch:api']);
    grunt.registerTask('default', ['watch:devBuild']);


    // older
    grunt.registerTask('build', ['jade', 'browserify2', 'concat', 'stylus', 'newer:copy', 'hashres']);
    grunt.registerTask('staticAssets', ['newer:copy:api', 'newer:copy:html', 'newer:copy:img', 'newer:copy:assets']);
    grunt.registerTask('style', ['concat:styl', 'stylus']);
};