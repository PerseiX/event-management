(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('createEvent', {
			templateUrl: "scripts/components/event-create/event-create-template.html",
			controller: "EventCreateController as eventCreate"
		});
})(angular);
