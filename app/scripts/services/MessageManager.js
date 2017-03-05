(function (angular) {
	'use strict';
	// TODO CODE REWRITE, USE COMPONENT OR ANGULAR GROWL
	/**
	 * @constructor
	 */
	function MessageManager() {
		var that = this;
		var alert = $('#message-container');

		/**
		 * @param message
		 */
		that.alertSuccess = function (message) {
			alert.addClass('alert alert-success');
			alert.text(message);

			setTimeout(function () {
				alert.removeClass('alert alert-success');
				alert.text('');
			}, 3000);
		};

		/**
		 * @param message
		 */
		that.alertDanger = function (message) {
			alert.addClass('alert alert-danger');
			alert.text(message);

			setTimeout(function () {
				alert.removeClass('alert alert-danger');
				alert.text('');
			}, 3000);
		};
	}

	angular
		.module('eventManagementApp')
		.service('MessageManager', MessageManager);

})(angular);