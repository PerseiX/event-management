(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('guestList', {
			templateUrl: "scripts/components/guest-list/guest-list-template.html",
			controller: "GuestListController as guests"
		});
})(angular);
