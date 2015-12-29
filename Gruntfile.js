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
				tasks: ['jshint', 'gitadd', 'gitcommit']
			},
			scripts: {
				files: ['autosave.js'],
				tasks: ['jshint', 'gitadd', 'gitcommit']
			},
			src: {
				files: ['example.html'],
				tasks: ['gitadd', 'gitcommit']
			}
		},

		gitadd: {
			task: {
				options: {
					all: true,
					force: true
				},
				files: {
					src: ['*.{js,html,json,htaccess}']
				}
			}
		},

		gitcommit: {
			your_target: {
				options: {
					message: 'Repo updated on: ' + grunt.template.today()
				},
				files: [{
					src: ['*.{js,html,json,htaccess}'],
					expand: true
				}]
			}
		},

		jshint: {
			all: ['Gruntfile.js']
		}
	});
	grunt.registerTask('default', [
		'grunt-contrib-jshint',
		'grunt-contrib-watch',
		'grunt-git',
		'load-grunt-tasks'
	]);
};