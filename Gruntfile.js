module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			options: {
				livereload: true
			},
			config: {
				files: ['package.json', 'Gruntfile.js'],
				tasks: ['jshint', 'gitadd']
			},
			scripts: {
				files: ['autosave.js'],
				tasks: ['jshint', 'gitadd']
			}
		},

		gitadd: {
			task: {
				options: {
					all: true,
					force: true
				},
				files: {
					src: ['*.{js}']
				}
			}
		},

		jshint: {
			all: ['Gruntfile.js']
		}
	});
	grunt.registerTask('default', [
		'grunt-contrib-jshint',
		'grunt-contrib-watch'
		'grunt-git',
		'load-grunt-tasks'
	]);
};