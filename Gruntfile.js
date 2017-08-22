module.exports = function (grunt) {
// load all grunt tasks matching the `grunt-*` pattern
require('load-grunt-tasks')(grunt);

grunt.initConfig({
  clean: {
    css: ['.sass-cache']
  },

  sass: {
    web: {
      files: {
        'css/styles.css': 'scss/styles.scss',
      },
      options: {
        style: 'expanded'
      },
    }
  },

  watch: {
    web: {
      files: ['scss/styles.scss', 'scss/**/*.scss'],
      tasks: ['sass:web','notify:sass'],
    }
  },

  notify: {
    sass: {
      options: {
        title: "SCSS Compilation",
        message: "CSS compiled successfully",
        success: true
      }
    },
  }
  });

grunt.registerTask('cleanit', ['clean']);
grunt.registerTask('watchit', ['watch']);
grunt.registerTask('develop', ['clean', 'sass:web', 'watch:web','notify:sass']);

};
