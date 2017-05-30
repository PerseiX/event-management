(function (angular) {
	'use strict';

	/**
	 * @constructor
	 */
	function SortingController($attrs, sorting) {
		let vm = this;

		vm.change = function () {
			let orderType = $attrs['defaultType'];
			let orderBy = $attrs['orderBy'];

			let param = [], result = [];
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