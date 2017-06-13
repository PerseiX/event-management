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
			let key = $attrs['model'];

			sorting.setOrderType(orderType, key);
			sorting.setOrderBy(orderBy, key);
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