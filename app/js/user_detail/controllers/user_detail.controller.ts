export class UserDetailController
{
    static $inject = ['Load','$http', '$state', 'PATHS', '$stateParams', 'toaster'];

    public user;
    constructor(private Load, private $http, private $state, private PATHS, private $stateParams, private toaster){
        const vm = this;
        vm.user = Load.data.user;
        
    }

}

angular.module('UserDetail')
        .controller('UserDetailController', ['Load','$http', '$state', 'PATHS', '$stateParams', 'toaster', UserDetailController]);
