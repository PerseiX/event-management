(function (angular) {
	'use strict';

	/**
	 * @constructor
	 */
	function GuestListController(GuestsRepository) {
		var vm = this;
		vm.guests = GuestsRepository.getGuests();
		console.log(vm.guests);
	}

	angular
		.module('eventManagementApp')
		.controller('GuestListController', GuestListController);

	GuestListController.$inject = [
		'GuestsRepository'
	];

})(angular);