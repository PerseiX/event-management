(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('sorting', {
			name: 'SORTING',
			template: "<div ng-click='sorting.change()' ng-transclude></div>",
			controller: "SortingController as sorting",
			transclude: true,
			bindings: {
				defaultType: '@',
				orderBy: '@',
				model: '@'
			}
		});
})(angular);
