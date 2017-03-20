(function (angular) {
	'use strict';

	/**
	 * Main state configuration
	 *
	 * @param $stateProvider
	 * @returns {AppRouterConfig}
	 * @constructor
	 */
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
						templateUrl: 'views/pages/home.html',
						controller: 'MainController as main'
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
				url: '/contact',
				views: {
					'contact@app.content': {
						templateUrl: 'views/pages/contact.html'
					}
				}
			})
			.state('app.content.about', {
				url: '/about',
				views: {
					'about@app.content': {
						templateUrl: 'views/pages/about.html'
					}
				}
			})
			.state('app.content.events', {
				url: '/events',
				views: {
					'events@app.content': {
						templateUrl: 'views/pages/events.html',
						controller: 'EventsController as events'
					}
				},
				resolve: {
					Events: ['DataFetcher', function (DataFetcher) {
						return DataFetcher.GETData('/events').then(function (response) {
							return response;
						});
					}]
				}
			})
			.state('app.content.events.edit-event', {
				url: '/:eventId',
				views: {
					'events@app.content': {
						templateUrl: 'views/pages/edit-event.html',
						controller: 'EventController as event'
					}
				},
				resolve: {
					Event: ['Events', '$stateParams', function (Events, $stateParams) {
						return Events.collection.find(function (event) {
							return event.id == $stateParams.eventId;
						});
					}]
				}
			})
		;

		return this;
	}

	angular
		.module('eventManagementApp')
		.config(AppRouterConfig);
	AppRouterConfig.$inject = ['$stateProvider'];


})(angular);
