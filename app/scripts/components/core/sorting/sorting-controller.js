(function (angular) {
	'use strict';

	/**
	 * @constructor
	 */
	function SortingController($attrs, sorting) {
		let vm = this;
//TODO Sorting per entity
		vm.change = function () {
			let orderType = $attrs['defaultType'];
			let orderBy = $attrs['orderBy'];

			sorting.setOrderType(orderType);
			sorting.setOrderBy(orderBy);
			sorting.clearStorage = true;

			$attrs['defaultType'] = ($attrs['defaultType'] === 'ASC') ? 'DESC' : 'ASC';
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