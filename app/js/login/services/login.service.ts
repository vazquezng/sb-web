import * as angular from 'angular';

function LoginService($uibModal, $state, $rootScope, $http, PATHS){
    let modalInstance;
    let user;

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

    this.logout = function(data){
        window.localStorage.clear();

        (<any>window).location ='/';
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

    this.loginCancha = function(data){
        user = data.user;
        user.admin = true;
        window.localStorage.setItem('token-cancha', data.token.token);
        window.localStorage.setItem('user-cancha', JSON.stringify(data.user));

        $rootScope.$broadcast('login');
        $state.go('app.admin-canchas-profile');
    }

    this.setUserCancha = function(newuser) {
        user = newuser;
        window.localStorage.setItem('user-cancha', JSON.stringify(newuser)); 
    }

    var getUserLocalStorage = () =>{
        const user = window.localStorage.getItem('user');
        return user !== null ? JSON.parse(user) : user;
    }

    var getUserAdminLocalStorage = () =>{
        const user = window.localStorage.getItem('user-cancha');
        return user !== null ? JSON.parse(user) : user;
    }

    user = getUserLocalStorage() || getUserAdminLocalStorage();

    let vm = this;
    $rootScope.$on('logout', function(){
        window.localStorage.clear();
        (<any>window).location ='/';
        $state.reload();
    });

    //
    if(user){
        $http.get(PATHS.api + '/me').then(function(resp){
            vm.setUser(resp.data.user);
        });
    }
}

angular.module('Login')
        .service('LoginService', ['$uibModal', '$state', '$rootScope', '$http','PATHS', LoginService]);
