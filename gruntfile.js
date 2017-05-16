// gruntfile.js
//
// Author: blinklv <blinklv@icloud.com>
// Create Time: 2017-03-22
// Maintainer: blinklv <blinklv@icloud.com>
// Last Change: 2017-05-16
// Purpose: The gruntfile.js for Web development.

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        // Watch all files.
        watch: {
            sass: {
                files: ["sass/*.sass", "sass/*.scss"],
                tasks: ["sass", "concat:css"]
            },
            css: {
                files: ["font/*.css", "css/*.css", "!css/*.min.css"],
                tasks: ["concat:css"]
            },
            js: {
                files: ["js/*.js", "!js/main.js","!js/*.min.js"],
                tasks: ["concat:js", "jshint"]
            },
            html: {
                files: ["index.html", "html/**/*.html"],
                tasks: ["copy:devel"]
            },
            img: {
                files: ["img/**/*.{gif,jpg,jpeg,png,svg}"],
                tasks: ["responsive_images", "copy:devel"]
            },
            font: {
                files: ["font/*.{woff,woff2}"],
                tasks: ["copy:devel"]
            },
            pug: {
                files: ["index.pug", "pug/**/*.pug"],
                tasks: ["pug"]
            }
        },

        // Copy files to build/devel directory.
        copy: {
            devel: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: "vendor/",
                    src: ["**/*.css", "!**/*.min.css"],
                    dest: "build/devel/css/",
                },{
                    expand: true,
                    flatten: true,
                    cwd: "vendor/",
                    src: ["**/*.js", "!**/*.min.js"],
                    dest: "build/devel/js/",
                },{
                    expand: true,
                    src: ["index.html", "html/**/*.html"],
                    dest: "build/devel/"
                },{
                    expand: true,
                    cwd: "img/",
                    src: ["**/*.svg"],
                    dest: "build/devel/img/"
                },{
                    expand: true,
                    cwd: "font/",
                    src: ["**/*.{woff,woff2}"],
                    dest: "build/devel/css/font/"
                }]
            },
            release: {
                files: [{
                    expand: true,
                    cwd: "build/devel/img/",
                    src: ["**/*.{gif,jpg,jpeg,png,svg}"],
                    dest: "build/release/img/"
                },{
                    expand: true,
                    cwd: "build/devel/css/font/",
                    src: ["**/*.woff", "**/*.woff2"],
                    dest: "build/release/css/font/"
                }]
            }
        },

        // Generate multi-resolution images.
        responsive_images: {
            normal: {
                options: {
                    engine: "im",
                    sizes: [{
                        name: "s",
                        width: 320,
                        quality: 70
                    },{
                        name: "m",
                        width: 480,
                        quality: 70
                    },{
                        name: "l",
                        width: 600,
                        quality: 70
                    },{
                        name: "xl",
                        width: 1024,
                        quality: 70
                    },{
                        name: "xxl",
                        width: 1440,
                        quality: 70
                    }]
                },
                files: [{
                    expand: true,
                    cwd: "img/",
                    src: ["**/*.{gif,jpg,jpeg,png}","!**/logo.{gif,jpg,jpeg,png}","!**/*{-,_}logo.{gif,jpg,jpeg,png}"],
                    dest: "build/devel/img/"
                }]
            },

            // The shape of orignal logo picture is preferably square.
            logo: {
                options: {
                    engine: "im",
                    sizes: [{
                        name: "s",
                        width: 64
                    },{
                        name: "m",
                        width: 128,
                        quality: 90
                    },{
                        name: "l",
                        width: 256,
                        quality: 70
                    }]
                },
                files: [{
                    expand: true,
                    cwd: "img/",
                    src: ["**/logo.{gif,jpg,jpeg,png}", "**/*{-,_}logo.{gif,jpg,jpeg,png}"],
                    dest: "build/devel/img/"
                }]
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },
            target: ["gruntfile.js", "js/*.js", "build/devel/js/main.js"]
        },

        // Concatenate files, but exclude some files of 'min' suffix.
        concat: {
            css: {
                src: ["font/*.css", "css/*.css", "!css/main.css","!css/*.min.css"],
                dest: "build/devel/css/main.css"
            },
            js: {
                src: ["js/*.js", "!js/main.js", "!js/*.min.js"],
                dest: "build/devel/js/main.js"
            }
        },

        // Compiling SASS files to CSS files.
        sass: {
            target: {
                files: [{
                    expand: true,
                    cwd: "sass/",
                    src: ["*.sass", "*.scss"],
                    dest: "css/",
                    ext: ".css"
                }]
            }
        },

        // Remove unused CSS.
        uncss: {
            target: {
                files: {
                    "build/devel/css/tidy.css": "build/devel/**/*.html"
                }
            }
        },

        // Minifying CSS files.
        cssmin: {
            target: {
                src: "build/devel/css/tidy.css",
                dest: "build/release/css/main.min.css"
            }
        },

        // Minifying JS files.
        uglify: {
            options: {
                mangle: false,
                compress: {
                    drop_console: true
                }
            },
            target: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: "build/devel/js/",
                    src: "**/*.js",
                    dest: "build/release/js/",
                    ext: ".min.js",
                    extDot: "last"
                }]
            }
        },

        // Compiling Pug files to HTML files.
        pug: {
            target: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    src: ["index.pug"],
                    dest: "build/devel/",
                    ext: ".html",
                    extDot: "last"
                },{
                    expand: true,
                    cwd: "pug/",
                    src: ["*.pug"],
                    dest: "build/devel/html/",
                    ext: ".html",
                    extDot: "last"
                }]
            }
        },

        // Minifying HTML files.
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            target: {
                files: [{
                    expand: true,
                    cwd: "build/devel/",
                    src: ["index.html", "html/*.html"],
                    dest: "build/release/"
                }]
            }
        },

        replace: {
            release: {
                src: ["build/release/index.html", "build/release/html/*.html"],
                overwrite: true,
                // NOTICE: The asterisk(*) wildcard should be in non-greedy mode.
                replacements: [{
                    from: /href="(.*?)\.css"/g,
                    to: 'href="$1.min.css"'
                },{
                    from: /src="(.*?)\.js"/g,
                    to: 'src="$1.min.js"'
                }]
            }
        },

        // Adding a banner information to some files.
        usebanner: {
            options: {
                position: "top",
                banner: "<%= create_banner() %>"
            },
            css: {
                src: "build/devel/css/main.css"
            },
            js: {
                src: "build/devel/js/main.js"
            }
        },

        clean: {
            devel: ["build/devel"],
            release: ["build/release"]
        },

        // Auxiliary method.
        create_banner: function() {
            var str = "";
            var pkg = this.pkg;

            // If 'pkg.name' is empty, the 'banner' is empty too.
            if (pkg.name) {
                str = "/*! " + pkg.name;
                str = pkg.version ? str + " v" + pkg.version : str;
                str += " " + grunt.template.today("yyyy-mm-dd");
                str = pkg.license ? str + " | " + pkg.license : str;
                str = pkg.url ? str +  " | " + pkg.url : str;
                str += " */";
            } 

            return str;
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-responsive-images");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-uncss");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-pug");
    grunt.loadNpmTasks("grunt-text-replace");
    grunt.loadNpmTasks("grunt-banner");

    grunt.registerTask("devel", ["sass", "concat", "jshint", "usebanner", "responsive_images", "pug", "copy:devel"]);
    grunt.registerTask("release", ["devel", "uncss", "cssmin", "uglify", "copy:release",  "htmlmin", "replace:release"]);
    grunt.registerTask("rebuild-devel", ["clean:devel", "devel"]);
    grunt.registerTask("rebuild", ["clean", "release"]);
    grunt.registerTask("default", ["release"]);
};




