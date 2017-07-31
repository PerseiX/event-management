(function (angular) {
	'use strict';

	/**
	 * @param $transitions
	 * @param UserManager
	 * @param CONST
	 * @param UserAuthentication
	 * @param $auth
	 * @param Breadcrumbs
	 * @constructor
	 */
	function ChangeStateListener($transitions, UserManager, CONST, UserAuthentication, $auth, Breadcrumbs) {
		UserAuthentication.setAuth($auth);

		$transitions.onStart({
			to: ['app.content.*', 'app.content.events.*', 'app.content.events.*.*', 'app.content.events.*.*.*']
		}, function (trans) {
			//Update breadcrumbs during refresh
			Breadcrumbs.updateBreadcrumbsArray(trans);

			let seconds = new Date().getTime() / 1000;
			let userRepository = UserManager.getUser();
			seconds = Math.round(seconds);

			if (userRepository.getAccessTokenExpiresAt() < seconds + 120 && userRepository.getRefreshTokenExpiresAt() > seconds) {
				return UserManager.refreshToken()
					.then(function () {
						return trans.router.stateService.target(trans.$to(), trans.params("to"));
					})
					.catch(function () {
						return trans.router.stateService.target('app.content.login');
					});
			}

			if (!UserManager.isAuthenticated()) {
				return UserManager.login(CONST.OAUTH2.DEFAULT_PROVIDER_NAME)
					.then(function () {
						return trans.router.stateService.target(trans.$to(), trans.params("to"));
					})
					.catch(function () {
						return trans.router.stateService.target('app.content.login');
					});
			}

			if (trans.$to().name === 'app.content.login' && UserManager.isAuthenticated() === true) {
				return trans.router.stateService.target('app.content.home');
			}
		});

	}

	angular
		.module('eventManagementApp')
		.run(ChangeStateListener);

	ChangeStateListener.$inject = [
		'$transitions',
		'UserManager',
		'CONST',
		'UserAuthentication',
		'$auth',
		'Breadcrumbs'
	];
})(angular);