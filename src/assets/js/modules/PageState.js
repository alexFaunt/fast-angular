
/**
 * Main menu module
 */

;(function (window, angular) {
	'use strict';

	var app = angular.module(window.appName);

	var PageStateModule = angular.module('PageStateModule', ['MainMenuModule']);

	/* Api for interaction with other components of app */
	PageStateModule.factory('PageStateApi', function(MainMenuApi) {
	    return {
	    	STATES: {},
	        stateList: [],
	        registerState: function (state) {
	        	if (typeof(state.id) === 'string' &&
	        		typeof(state.klass) === 'string' &&
	        		typeof(state.reset) === 'function') {
	        		this.STATES[state.id] = state;
	        	}
	        	else {
	        		// TODO - logger erro
	        	}
	        },
	        addState: function (state) {
	        	if (this.stateList.indexOf(state) === -1) {
	        		this.stateList.push(state);
	        	}
	        },
	        removeState: function (state) {
	        	var idx = this.stateList.indexOf(state);
	        	if (idx > -1) {
	        		this.stateList.splice(idx, 1);
	        	}
	        },
	        toggleState: function (state) {
	        	var idx = this.stateList.indexOf(state);
	        	if (idx > -1) {
	        		this.sateList.splice(idx, 1);
	        	}
	        	else {
	        		this.sateList.push(state);
	        	}
	        },
	        reset: function () {
	        	var i = 0, len = this.stateList.length;
	        	for (; i < len; i +=1) {
	        		this.stateList[i].reset();
	        	}
	        }
	    };
	});

	/* definition and control */
	PageStateModule.directive('pageState',
		function() {

			var PageStateCtrl = function ($scope, $timeout, PageStateApi) {

				var baseClass = 'page-wrapper';

				$scope.state = baseClass;

	            $scope.api = PageStateApi;

	            $scope.$watch('api.stateList', function (newValue, oldValue) {
		        	if (newValue === oldValue) {
		        		return;
		        	}
		        	var state = baseClass,
		        		i = 0,
		        		len = newValue.length;
		        	for (; i < len; i+=1) {
		        		state += ' ' + newValue[i].klass;
		        	}
		        	$scope.state = state;
		        }, true);

		        $scope.reset = function () {
		        	PageStateApi.reset();
		        };
		    };

		    return {
		      	templateUrl: app.STATIC.VIEWS_PATH + 'main.html',
		      	replace: true,
		      	controller: PageStateCtrl
		    };
		}
	);

})(window, angular);