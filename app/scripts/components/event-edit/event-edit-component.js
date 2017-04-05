(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('editEvent', {
			templateUrl: "scripts/components/event-edit/event-edit-template.html",
			controller: "EventController as event"
		});
})(angular);
