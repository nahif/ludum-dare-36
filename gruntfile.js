module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/js/lib', src: ['**'], dest: 'build/js/'},
          {expand: true, cwd: 'src/template/', src: ['**'], dest: 'build/'}
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: './build'
        }
      }
    },
    watch: {
      js: {
        options: {
          livereload: true
        },
        files: ['src/js/game/**/*', 'src/js/app.js', 'src/js/properties.js'],
        tasks: ['browserify', 'copy']
      },
      image: {
        options: {
          livereload: true,
        },
        files: ['src/images/*'],
        tasks: ['imagemin']
      }
    },
    browserify: {
      app:
        { src: 'src/js/app.js',
          dest: 'src/js/lib/app.js'
        }
    },
    open : {
      server : {
        path: 'http://127.0.0.1:8000'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['*.{png,jpg,gif}'],
          dest: 'build/images/'
        }]
      }
    },
    uglify: {
      my_target: {
        files: {
          'build/js/app.js': ['src/js/lib/app.js']
        }
      }
    }
  })

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Define task
  grunt.registerTask('default', ['browserify','copy:main','connect','open','watch']);
  grunt.registerTask('build', ['browserify','imagemin','uglify'])

};
