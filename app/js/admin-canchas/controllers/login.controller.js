import * as moment from 'moment';

class CanchasLoginController
{
  constructor($http, PATHS, $state, toaster){
    const token = localStorage.getItem('token-cancha');
    if(token){
      $state.go('app.admin-canchas-profile');
    }

    this.$http = $http;
    this.PATHS = PATHS;
    this.$state = $state;
    this.toaster = toaster;
  }

  auth(form){
    if(form.$valid){
      const vm = this;
      vm.$http.post(`${this.PATHS.api}/canchas/auth`, 
        {email:this.email, password: this.password})
      .then((resp)=>{
        if(!resp.data.error){
          localStorage.setItem('user-cancha', JSON.stringify(resp.data.user));
          localStorage.setItem('token-cancha', resp.data.token.token);
          vm.$state.go('app.admin-canchas-profile');
        }else{
          vm.toaster.error('Hubo un error, intente más tarde.');
        }
        
      });
    }
  }
}

angular.module('AdminCanchas')
        .controller('CanchasLoginController', ['$http', 'PATHS', '$state', 'toaster', CanchasLoginController]);
