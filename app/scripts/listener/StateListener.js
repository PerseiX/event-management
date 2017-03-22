(function (angular) {
	'use strict';

	/**
	 * @param $transitions
	 * @param UserAuthProvider
	 * @param CONST
	 * @param $auth
	 * @constructor
	 */
	function ChangeStateListener($transitions, UserAuthProvider, CONST, $auth) {
		UserAuthProvider.setAuth($auth);

		$transitions.onStart({to: ['app.content.events', 'app.content.events.*']}, function (trans) {
			if (!UserAuthProvider.isAuthenticated()) {
				UserAuthProvider.authenticate(CONST.OAUTH2.DEFAULT_PROVIDER_NAME);

				return trans.router.stateService.target('app.content.home');
			}
		});
	}

	angular
		.module('eventManagementApp')
		.run(ChangeStateListener);

	ChangeStateListener.$inject = [
		'$transitions',
		'UserAuthProvider',
		'CONST',
		'$auth'
	];
})(angular);