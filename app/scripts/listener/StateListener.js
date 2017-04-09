(function (angular) {
	'use strict';

	/**
	 * @param $transitions
	 * @param UserAuthentication
	 * @param UserManager
	 * @param CONST
	 * @param $auth
	 * @constructor
	 */
	function ChangeStateListener($transitions, UserAuthentication, UserManager, CONST, $auth) {
		UserAuthentication.setAuth($auth);

		$transitions.onStart({to: ['app.content.events', 'app.content.events.*']}, function (trans) {
			if (!UserManager.isAuthenticated()) {
				UserManager.login(CONST.OAUTH2.DEFAULT_PROVIDER_NAME);

				return trans.router.stateService.target('app.content.home');
			}
		});
	}

	angular
		.module('eventManagementApp')
		.run(ChangeStateListener);

	ChangeStateListener.$inject = [
		'$transitions',
		'UserAuthentication',
		'UserManager',
		'CONST',
		'$auth'
	];
})(angular);