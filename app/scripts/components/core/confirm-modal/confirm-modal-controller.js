(function (angular) {
	'use strict';

	/**
	 * @param $modal
	 * @param $element
	 * @param $attrs
	 * @constructor
	 */
	function ConfirmModalController($modal, $element, $attrs) {
		let vm = this;
		vm.template = $attrs.template;

		/**
		 * @param $scope
		 * @param $modalInstance
		 * @constructor
		 */
		let ModalInstanceCtrl = function ($scope, $modalInstance) {
			$scope.approved = function () {
				vm.deleteAction();
				$modalInstance.close();
			};

			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
		};

		$element.on('click', function () {
			let message = $attrs.confirmMessage || "Are you sure?";

			let approvedMessage = $attrs.approvedMessage || "OK";
			let cancelMessage = $attrs.cancelMessage || "CANCEL";

			let modalHtml = '<div class="modal-body">' + message + '</div>';
			modalHtml += '<div class="modal-footer">' +
				'<button class="btn btn-primary" ng-click="approved()">' + approvedMessage + '</button>' +
				'<button class="btn btn-warning" ng-click="cancel()">' + cancelMessage + '</button>' +
				'</div>';

			let modalInstance = $modal.open({
				template: modalHtml,
				controller: ModalInstanceCtrl
			});

		});
	}

	angular
		.module('eventManagementApp')
		.controller('ConfirmModalController', ConfirmModalController);

	ConfirmModalController.$inject = [
		'$modal',
		'$element',
		'$attrs'
	];

})(angular);