(function (angular) {
	'use strict';

	/**
	 * @returns {EventPlace}
	 * @constructor
	 */
	function EventPlace() {

		let vm = this;
		vm.lat = 52.1676031;
		vm.long = 22.2901645;

		this.setLat = function (val) {
			vm.lat = val;
		};

		this.setLong = function (val) {
			vm.long = val;
		};

		vm.initMarker = function () {
			vm.marker = {
				id: 0,
				coords: {
					latitude: vm.lat,
					longitude: vm.long
				},
			};

			return vm.marker;
		};

		vm.initMap = function (zoom = 5) {
			vm.map = {
				center:
					{
						latitude: vm.lat,
						longitude: vm.long
					},
				zoom: zoom
			};

			return vm.map;
		};

		vm.initMap();
		vm.initMarker();

		return vm;
	}

	angular
		.module('eventManagementApp')
		.service('EventPlace', EventPlace);

})(angular);