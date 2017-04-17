import * as moment from 'moment';

class CanchasLoginController
{
  constructor($http, PATHS, $state, toaster, LoginService){
    const token = localStorage.getItem('token-cancha');
    if(token){
      $state.go('app.admin-canchas-profile');
    }

    this.$http = $http;
    this.PATHS = PATHS;
    this.$state = $state;
    this.toaster = toaster;
    this.LoginService = LoginService;
  }

  auth(form){
    if(form.$valid){
      const vm = this;
      vm.$http.post(`${this.PATHS.api}/canchas/auth`, 
        {email:this.email, password: this.password})
      .then((resp)=>{
        if(!resp.data.error){
          vm.LoginService.loginCancha(resp.data);
        }else{
          vm.toaster.error('Hubo un error, intente más tarde.');
        }
        
      });
    }
  }
}

angular.module('AdminCanchas')
        .controller('CanchasLoginController', ['$http', 'PATHS', '$state', 'toaster', 'LoginService', CanchasLoginController]);
