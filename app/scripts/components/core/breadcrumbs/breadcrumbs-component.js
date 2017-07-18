(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('uiBreadcrumbs', {
			name: 'BREADCRUMBS',
			templateUrl: "scripts/components/core/breadcrumbs/breadcrumbs.html",
			controller: "BreadcrumbsController as bread"
		});
})(angular);
