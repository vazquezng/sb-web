export class FriendsController 
{   
    static $inject = [];
    constructor(){
    }
}

angular.module('Friends')
        .controller('FriendsController', [FriendsController]);