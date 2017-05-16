(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('tagEdit', {
			templateUrl: "scripts/components/tag-edit/tag-edit-template.html",
			controller: "TagEditController as tag"
		});
})(angular);
