export class UserDetailController
{
    static $inject = ['Load','$http', '$state', '$scope', 'PATHS', '$uibModal', '$stateParams', 'toaster'];

    public user;
    public avatar;
    public modalInstance;
    public availabilityList = [];
    public timeList = [ '08:00','08:30',
                        '09:00','09:30',
                        '10:00','10:30',
                        '11:00','11:30',
                        '12:00','12:30',
                        '13:00','13:30',
                        '14:00','14:30',
                        '15:00','15:30',
                        '16:00','16:30',
                        '17:00','17:30',
                        '18:00','18:30',
                        '19:00','19:30',
                        '20:00','20:30',
                        '21:00','21:30',
                        '22:00','22:30',
                        '23:00','23:30'];
    public dayList = [ '0', '1', '2', '3', '4', '5', '6'];
    constructor(private Load, private $http, private $state, private $scope, private PATHS, private $uibModal, private $stateParams, private toaster){
        const vm = this;
        vm.user = Load.data.user;
        vm.user.single = vm.user.single == 1? true : false;
        vm.user.double = vm.user.double == 1? true : false;
        vm.avatar = Load.data.user.image && Load.data.user.image !== '' ? Load.data.user.image : (<any>window).URL_BUCKET+'/img/profile/profile-blank.png';
        
    }

    public openModalAvailable(){
        let vm =  this;
        this.$http.post(this.PATHS.api + '/user/retrieveUserAvailability').then(function(resp){
            if(resp.data.availability){
                vm.availabilityList = resp.data.availability;
            }
        });
        this.modalInstance = this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'availability-profile',
            size: 'md',
            scope:this.$scope
        });
    }

}

angular.module('UserDetail')
        .controller('UserDetailController', ['Load','$http', '$state', '$scope', 'PATHS', '$uibModal', '$stateParams', 'toaster', UserDetailController]);
