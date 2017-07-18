(function (angular) {
	'use strict';

	/**
	 * @param Breadcrumbs
	 * @param $scope
	 * @constructor
	 */
	function BreadcrumbsController(Breadcrumbs, $scope) {
		$scope.Breadcrumbs = Breadcrumbs;
	}

	angular
		.module('eventManagementApp')
		.controller('BreadcrumbsController', BreadcrumbsController);

	BreadcrumbsController.$inject = [
		'Breadcrumbs',
		'$scope'
	];

})
(angular);