(function (angular) {
	'use strict';

	function AppRouterConfig($stateProvider) {
		$stateProvider
			.state('app', {
				url: '',
				abstract: true,
				views: {
					'@': {
						templateUrl: 'views/main.html'
					},
					'navigation@app': {
						templateUrl: 'views/navigation.html'
					}
				}
			})
			.state('app.content', {
				abstract: true,
				views: {
					'main-content@app': {
						templateUrl: 'views/main-content.html'
					}
				}
			})
			.state('app.content.home', {
				url: '/',
				views: {
					'home@app.content': {
						templateUrl: 'views/pages/home.html'
					}
				}
			})
			.state('app.content.help', {
				url: '/help',
				views: {
					'help@app.content': {
						templateUrl: 'views/pages/help.html'
					}
				}
			})
			.state('app.content.contact', {
				url: 'contact',
				views: {
					'contact@app.content': {
						templateUrl: 'views/pages/contact.html'
					}
				}
			})
			.state('app.content.about', {
				url: 'about',
				views: {
					'about@app.content': {
						templateUrl: 'views/pages/about.html'
					}
				}
			});

		return this;
	}

	angular
		.module('eventmanagementApp')
		.config(AppRouterConfig);
	AppRouterConfig.$inject = ['$stateProvider'];

})(angular);
