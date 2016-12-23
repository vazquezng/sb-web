import * as angular from 'angular';

export class MenuController 
{   
    static $inject = [];
    constructor(){

    }
    
    public auth(){
        console.log('open modal login.');
    }
}

angular.module('Home')
        .controller('MenuController', [MenuController]);