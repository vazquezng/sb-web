import * as angular from 'angular';

function LoginService($auth, $uibModal){   
    this.init = function(){
        const tplLogin = <string> require('../views/login.html');
        console.log('init login');

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: tplLogin,
            controller: 'LoginController',
            controllerAs: 'vm',
            size: 'md'
        });
    };

    this.authenticate = function(provider:string){
        $auth.authenticate(provider).then(function(response) {
            console.log(response);
        })
        .catch(function(response) {
            console.log(response);
        });
    };
}

angular.module('Login')
        .service('LoginService', ['$auth', '$uibModal', LoginService]);