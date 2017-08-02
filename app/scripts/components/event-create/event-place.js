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

		/**
		 * @param place
		 * @returns {boolean}
		 */
		vm.updateLocation = function (place) {
			if (typeof place[0] !== "undefined") {
				let latitude = place[0].geometry.location.lat();
				let longitude = place[0].geometry.location.lng();
				let address = place[0].formatted_address;
				vm.lat = latitude;
				vm.long = longitude;
				vm.address = address;

				return true;
			}
			return false;
		};

		/**
		 * @param lat
		 * @param long
		 */
		vm.updatePlace = function (lat, long) {
			vm.lat = lat;
			vm.long = long;
		};

		return vm;
	}

	angular
		.module('eventManagementApp')
		.service('EventPlace', EventPlace);

})(angular);