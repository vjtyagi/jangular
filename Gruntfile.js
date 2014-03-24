module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.initConfig({

		html2js: {

			app: {

				options: {
					base : 'src'
				},
				src : ['src/partials/*.html'],
				dest : 'dist/template-app.js'
			}
		},
		concat: {
			app: {
				options : {
					separator : ';'
				},
			
				src : ['src/jangular.js', 'dist/template-app.js', 'src/pagination/jpaginate.js'],
				dest : 'bin/jangular-build.js'
			}
		}

	});

	grunt.registerTask('jangular', ['html2js:app', 'concat:app']);
};