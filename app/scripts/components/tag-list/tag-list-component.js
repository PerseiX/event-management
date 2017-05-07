(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('tagList', {
			templateUrl: "scripts/components/tag-list/tag-list-template.html",
			controller: "TagListController as tags"
		});
})(angular);
