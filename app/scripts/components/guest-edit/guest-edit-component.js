(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('guestEdit', {
			templateUrl: "scripts/components/guest-edit/guest-edit-template.html",
			controller: "GuestController as guest"
		});
})(angular);
