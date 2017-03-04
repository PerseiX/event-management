(function (angular) {
	'use strict';

	var constant = {
		DOMAIN: 'http://localhost',
		URL: '/event-management-api/web/app_dev.php/api'
	};

	angular
		.module('eventManagementApp')
		.constant('CONST', constant);
})(angular);