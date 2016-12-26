import * as angular from 'angular';

class MenuController 
{   
    static $inject = [];
    constructor(private LoginService){

    }
    
    public auth(){
       this.LoginService.init();
    }
}

angular.module('Home')
        .controller('MenuController', ['LoginService', MenuController]);