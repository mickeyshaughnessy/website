module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-newer');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass:{
      sourcemap: 'none'
      }
  });

  //SASS DIRECTORY IMPORT - dynamically include all sass partials in a directory
  grunt.loadNpmTasks('grunt-sass-directory-import');
  grunt.config('sass_directory_import', {
    patterns: {
        files: {
            // The file pattern to add @imports to.
            src: ['scss/patterns/_all-patterns.scss']
        },
    }
  });

  //SASS
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.config('sass', {
      dist: {
        options: {
          style: 'compact',
          sourcemap: 'none'
        },
        files: {
          'css/app.css': 'scss/app.scss',
        }
      }
  });

  //CONCAT
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.config('concat', {
    dist: {
      options: {
        separator: ';'
      },
      src: [
        'js/main.js'
      ],
      dest: 'js/app.js'
    }
  });

  //UGLIFY
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    options: {
      compress: false,
      mangle: false
    },
      dist: {
        files: {
          'js/app.min.js': ['js/app.js']
        }
      }
  });

  //CSS MIN
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.config('cssmin', {
    dist : {
      files: [{
      expand: true,
      cwd: 'css/',
      src: ['*.css', '!*.min.css', '!*.css.map'],
      dest: 'css/',
      ext: '.min.css'
    }]
    }
  });

  //WATCH
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch',{
    options: {
      livereload: 35730 //set to unique port number to avoid conflicts
    },
    grunt: { files: ['Gruntfile.js'] },
    scripts: {
      files: ['js/main.js'],
      tasks: ['concat']
    },
    compress: {
      files: ['js/app.js'],
      tasks: ['uglify']
    },
    sass: {
      files: 'scss/**/*.scss',
      tasks: ['sass_directory_import','sass']
    },
    css : {
      files: ['css/*.css', '!css/*.min.css', '!*.css.map'],
      tasks : ['cssmin']
    }

  });

  grunt.registerTask('default', ['newer:sass_directory_import', 'newer:sass', 'newer:concat', 'newer:uglify', 'newer:cssmin','watch']);

}