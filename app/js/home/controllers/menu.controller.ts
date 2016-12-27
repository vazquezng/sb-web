import * as angular from 'angular';

class MenuController 
{   
    static $inject = [];

    public user;
    constructor(private LoginService){
        this.user = LoginService.getUser();
    }
    
    public auth(){
       this.LoginService.init();
    }
}

angular.module('Home')
        .controller('MenuController', ['LoginService', MenuController]);