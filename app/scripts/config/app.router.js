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
						template: "<events></events>"
					}
				},
				resolve: {
					Events: ['DataFetcher', function (DataFetcher) {
						return DataFetcher.GETData('/events', 1).then(function (response) {
							return response;
						});
					}]
				},
				onEnter: ['Events', 'EventsRepository', function (Events, EventsRepository) {
					EventsRepository.setEvents(Events.collection)
						.setPages(Events.pages);

				}]
			})
			.state('app.content.events.edit-event', {
				url: '/:eventId',
				views: {
					'events@app.content': {
						template: "<edit-event></edit-event>"
					}
				},
				resolve: {
					Event: ['Events', '$stateParams', function (Events, $stateParams) {
						return Events.collection.find(function (event) {
							return event.id == $stateParams.eventId;
						});
					}]
				},
				onEnter: ['Event', 'SingleEventRepository', function (Event, SingleEventRepository) {
					SingleEventRepository.setEvent(Event);
				}]
			})
			.state('app.content.events.create-event', {
				url: '/create',
				views: {
					'events@app.content': {
						template: "<create-event></create-event>"
					}
				}
			})
			.state('app.content.events.guests', {
				url: '/{eventId:int}/guests',
				views: {
					'events@app.content': {
						template: "<guest-list></guest-list>"
					}
				},
				resolve: {
					Guests: ['DataFetcher', '$stateParams', function (DataFetcher, $stateParams) {
						return DataFetcher.GETData('/event/' + $stateParams.eventId + '/guests', 1).then(function (response) {
							return response;
						});
					}]
				},
				onEnter: ['Guests', 'GuestsRepository', function (Guests, GuestsRepository) {
					GuestsRepository.setGuests(Guests.collection)
						.setPages(Guests.pages);

				}]
			})
			.state('app.content.events.guests.edit-guest', {
				url: '/{guestId}',
				views: {
					'events@app.content': {
						template: "<guest-edit></guest-edit>"
					}
				}
			})
			.state('app.content.events.tags', {
				url: '/{eventId:int}/tags',
				views: {
					'events@app.content': {
						template: "<tag-list></tag-list>"
					}
				},
				resolve: {
					Tags: ['DataFetcher', '$stateParams', function (DataFetcher, $stateParams) {
						return DataFetcher.GETData('/event/' + $stateParams.eventId + '/tags', 1).then(function (response) {
							return response;
						});
					}]
				},
				onEnter: ['Tags', 'TagsRepository', function (Tags, TagsRepository) {
					TagsRepository.setTags(Tags.collection)
						.setPages(Tags.pages);
				}]
			})
			.state('app.content.events.tags.create', {
				url: '/create',
				views: {
					'events@app.content': {
						template: "<create-tag></create-tag>"
					}
				}
			})
			.state('app.content.events.tags.edit', {
				url: '/{tagId}/edit',
				views: {
					'events@app.content': {
						template: "<tag-edit></tag-edit>"
					}
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
