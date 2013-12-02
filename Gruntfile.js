"use strict";
//console.log(process.cwd());

module.exports = function (grunt) {
  grunt.initConfig({
    sass: {
      dev: {
        options: {
          style: 'expanded',
          debugInfo: false,
          lineNumbers: true,
          noCache: true
        },
        expand: false,
        cwd: "/Users/peb7268/Desktop/dev/node/mongo_express/public/stylesheets/",
        src: ['./*.scss'],
        dest: './public/stylesheets/',
        ext: '.css'
      }
    }
  });

  //grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  //Register The Default Task
  grunt.registerTask('default', ['sass']);
};