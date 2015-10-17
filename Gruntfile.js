module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: ['js/dev/vendor/*.js', 'js/dev/plugins.js', 'js/dev/main.js'],
        dest: 'js/build/main.min.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/build/main.min.css': 'css/dev/main.scss'
        }
      }
    },
    autoprefixer:{
      dist:{
        files:{
          'css/build/main.min.css':'css/build/main.min.css'
        }
      }
    },
    imagemin: {
      options: {
        cache: false
      },

      dist: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    },
    jshint: {
        gruntfile: ['Gruntfile.js'],
        all: ['Gruntfile.js', 'js/dev/*.js']
    },
    scsslint: {
      allFiles: [
        'css/**/*.scss',
      ],
      options: {
        colorizeOutput: true
      },
    },
    connect: {
        server: {
          options: {
            keepalive: true,
            port: 8000,
            base: './'
          }
        }
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
        },
      css: {
        files: ['css/dev/**/*.scss'],
        tasks: [/*'scsslint',*/ 'sass', 'autoprefixer'],
        options: {
            livereload: true,
        },
      },
      js: {
        files: ['js/dev/*.js', '!js/dev/vendor/*.*'],
        tasks: ['jshint', 'uglify'],
        options: {
            livereload: true,
        },
      }
    },
    concurrent: {
        dev: {
            tasks: ['connect', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    }


/* TODO
    ~~1. Configure watch for CSS and JS~~
    ~~2. Configure livereload in watch environment~~
    3. Configure scss-lint to conform to coding style (i.e. 4 spaces instead of 2) & enable in watch
    4. Configure jshint
    5. Break out gruntfile into multiple different components for ease
*/

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'scsslint', 'sass', 'autoprefixer', 'imagemin']);
  grunt.registerTask('dev', ['concurrent:dev']);

};
