(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('events', {
			templateUrl: "scripts/components/events-list/events-list-template.html",
			controller: "EventsController as events"
		});
})(angular);
