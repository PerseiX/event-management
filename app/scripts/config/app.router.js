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
			.state('app.content.login', {
				url: '/login'
			})
			.state('app.content.home', {
				url: '/',
				views: {
					'home@app.content': {
						templateUrl: 'views/pages/home.html'
					}
				},
				data: {
					displayName: 'Home'
				}
			})
			.state('app.content.help', {
				url: '/help',
				views: {
					'help@app.content': {
						templateUrl: 'views/pages/help.html'
					}
				},
				data: {
					displayName: 'Help'
				}
			})
			.state('app.content.contact', {
				url: '/contact',
				views: {
					'contact@app.content': {
						templateUrl: 'views/pages/contact.html'
					}
				},
				data: {
					displayName: 'Contact'
				}
			})
			.state('app.content.about', {
				url: '/about',
				views: {
					'about@app.content': {
						templateUrl: 'views/pages/about.html'
					}
				},
				data: {
					displayName: 'About'
				}
			})
			.state('app.content.events', {
				url: '/events',
				views: {
					'events@app.content': {
						template: "<events></events>"
					}
				},
				data: {
					displayName: 'Events'
				},
				resolve: {
					Events: ['EventsManager', function (EventsManager) {
						let parameters = [];
						parameters['page'] = 1;
						return EventsManager.getCollection(true, parameters)
							.then(function (response) {
								return response;
							});
					}]
				}
			})
			.state('app.content.events.create-event', {
				url: '/create',
				views: {
					'events@app.content': {
						template: "<create-event></create-event>"
					}
				},
				data: {
					displayName: 'Create'
				}
			})
			.state('app.content.events.edit-event', {
				url: '/{eventId:int}',
				views: {
					'events@app.content': {
						template: "<edit-event></edit-event>"
					}
				},
				data: {
					displayName: 'Edit'
				}
			})
			.state('app.content.events.guests', {
				url: '/{eventId:int}/guests',
				views: {
					'events@app.content': {
						template: "<guest-list></guest-list>"
					}
				},
				data: {
					displayName: 'Guests'
				},
				resolve: {
					Guests: ['GuestsManager', '$stateParams', function (GuestsManager, $stateParams) {
						return GuestsManager.getCollection(true, $stateParams.eventId, 1).then(function (response) {
							return response;
						});
					}],
					Tags: ['TagsManager', '$stateParams', function (TagsManager, $stateParams) {
						return TagsManager.getCollection(true, $stateParams.eventId, 1).then(function (response) {
							return response;
						});
					}]
				}
			})
			.state('app.content.events.guests.create', {
				url: '/create',
				views: {
					'events@app.content': {
						template: "<create-guest></create-guest>"
					}
				},
				data: {
					displayName: 'Create'
				}
			})
			.state('app.content.events.guests.edit-guest', {
				url: '/{guestId}',
				views: {
					'events@app.content': {
						template: "<guest-edit></guest-edit>"
					}
				},
				data: {
					displayName: 'Edit'
				}
			})
			.state('app.content.events.tags', {
				url: '/{eventId:int}/tags',
				views: {
					'events@app.content': {
						template: "<tag-list></tag-list>"
					}
				},
				data: {
					displayName: 'Tags'
				},
				resolve: {
					Tags: ['TagsManager', '$stateParams', function (TagsManager, $stateParams) {
						let eventId = $stateParams.eventId;
						let parameters = [];
						parameters['page'] = 1;
						return TagsManager.getCollection(true, eventId, parameters)
							.then(function (response) {
								return response;
							});
					}]
				}
			})
			.state('app.content.events.tags.create', {
				url: '/create',
				views: {
					'events@app.content': {
						template: "<create-tag></create-tag>"
					}
				},
				data: {
					displayName: 'Create'
				}
			})
			.state('app.content.events.tags.edit', {
				url: '/{tagId}/edit',
				views: {
					'events@app.content': {
						template: "<tag-edit></tag-edit>"
					}
				},
				data: {
					displayName: 'Edit'
				}
			})
		;

		return this;
	}

	angular
		.module('eventManagementApp')
		.config(AppRouterConfig);

	AppRouterConfig.$inject = [
		'$stateProvider'
	];


})(angular);
