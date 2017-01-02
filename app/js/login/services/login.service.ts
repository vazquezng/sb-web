import * as angular from 'angular';

function LoginService($uibModal, $state, $rootScope){   
    let modalInstance;
    let user;
    
    user = window.localStorage.getItem('user');
    user = user !== null ? JSON.parse(user) : user;
    this.init = function(){
        const tplLogin = <string> require('../views/login.html');
        console.log('init login');

        modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: tplLogin,
            controller: 'LoginController',
            controllerAs: 'vm',
            size: 'md'
        });
    };

    this.login = function(data){
        user = data.user;

        window.localStorage.setItem('token', data.token.token);
        window.localStorage.setItem('user', JSON.stringify(data.user));

        if(data.newuser){
            $rootScope.$broadcast('login');
            $state.go('app.profile');
        }else if(data.state){
            $rootScope.$broadcast('login');
            $state.go(data.state);
        }else{
            $state.reload();
        }

        modalInstance.close();
    }

    this.isAuth =  function(){
        return !(user === null);
    }

    this.getUser = function(){
        return user;
    }

    this.setUser = function(newuser){
        user = newuser;
        window.localStorage.setItem('user', JSON.stringify(newuser));
    }
}

angular.module('Login')
        .service('LoginService', ['$uibModal', '$state', '$rootScope', LoginService]);