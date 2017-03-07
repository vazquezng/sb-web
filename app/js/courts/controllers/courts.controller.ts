import * as moment from 'moment';



export class CourtsController
{
    static $inject = ['Canchas', '$scope', '$http', '$state', 'PATHS', 'LoginService', 'toaster'];

    public user;
    public avatar;
    constructor(private Canchas, $scope, private $http, private $state, private PATHS, private LoginService, private toaster){
        this.user = LoginService.getUser();
        this.avatar = LoginService.isAuth() && this.user.image && this.user.image !== '' ? this.user.image : (<any>window).URL_BUCKET+'/img/profile/profile-blank.png';
    }

   
}

angular.module('Courts')
        .controller('CourtsController', ['Canchas', '$scope', '$http', '$state', 'PATHS', 'LoginService', 'toaster', CourtsController]);
