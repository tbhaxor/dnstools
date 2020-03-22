// tslint:disable-next-line: no-unsafe-any
module.exports = (grunt) => {
  // tslint:disable-next-line: no-unsafe-any
  grunt.initConfig({
    ts: {
      default: {
        outDir: 'dist/',
        // out: "./dist/metadefender.js",
        src: ['src/**/*.ts'],
      },

      options: {
        declaration: true,
        rootDir: 'src',
        sourceMap: true,
      },
    },
  });

  // tslint:disable-next-line: no-unsafe-any
  grunt.loadNpmTasks('grunt-ts');

  // tslint:disable-next-line: no-unsafe-any
  grunt.registerTask('default', ['ts']);
};
