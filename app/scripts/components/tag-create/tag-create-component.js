(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('createTag', {
			templateUrl: "scripts/components/tag-create/tag-create-template.html",
			controller: "TagCreateController as tagCreate"
		});
})(angular);
