(function (angular) {
	'use strict';

	angular.module('eventManagementApp')
		.component('confirmModal', {
			name: 'DELETE',
			templateUrl: "scripts/components/core/confirm-modal/confirm-modal-template.html",
			controller: "ConfirmModalController as confirm",
			bindings: {
				deleteAction: '&'
			}

		});
})(angular);
