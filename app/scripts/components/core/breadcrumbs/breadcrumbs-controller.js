(function (angular) {
	'use strict';

	/**
	 * @param $transitions
	 * @param Breadcrumbs
	 * @param $scope
	 * @constructor
	 */
	function BreadcrumbsController($transitions, Breadcrumbs, $scope) {
		$scope.breadcrumbs = [];

		if (typeof $scope.breadcrumbs[0] === 'undefined') {
			$scope.breadcrumbs  = Breadcrumbs.onEnterBreadcrumbsArray($transitions._router);
		}

		$transitions.onStart({}, function (trans) {
			$scope.breadcrumbs  = Breadcrumbs.updateBreadcrumbsArray(trans);
		});


	}


	angular
		.module('eventManagementApp')
		.controller('BreadcrumbsController', BreadcrumbsController);

	BreadcrumbsController.$inject = [
		'$transitions',
		'Breadcrumbs',
		'$scope'
	];

})
(angular);