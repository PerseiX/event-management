(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('createGuest', {
			templateUrl: "scripts/components/guest-create/guest-create-template.html",
			controller: "GuestCreateController as guestCreate"
		});
})(angular);
