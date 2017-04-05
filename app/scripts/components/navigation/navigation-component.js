(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('navigation', {
			templateUrl: "scripts/components/navigation/navigation-template.html",
			controller: "NavigationController as navigation"
		});
})(angular);
