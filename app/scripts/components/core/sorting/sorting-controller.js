(function (angular) {
	'use strict';

	/**
	 * @constructor
	 */
	function SortingController($attrs, sorting) {
		var vm = this;

		vm.change = function () {
			var orderType = $attrs['defaultType'];
			var orderBy = $attrs['orderBy'];

			var param = [], result = [];
			param[orderBy] = orderType;
			result['sortBy'] = param;
			$attrs['defaultType'] = ($attrs['defaultType'] === 'ASC') ? 'DESC' : 'ASC';
			sorting.setPreparedSortArgument(result);
		};

	}

	angular
		.module('eventManagementApp')
		.controller('SortingController', SortingController);

	SortingController.$inject = [
		'$attrs',
		'sorting'
	];
})(angular);