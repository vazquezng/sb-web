var UserDetailController = /** @class */ (function () {
    function UserDetailController(Load, $http, $state, $scope, PATHS, $uibModal, $stateParams, toaster) {
        this.Load = Load;
        this.$http = $http;
        this.$state = $state;
        this.$scope = $scope;
        this.PATHS = PATHS;
        this.$uibModal = $uibModal;
        this.$stateParams = $stateParams;
        this.toaster = toaster;
        this.always = false;
        var vm = this;
        vm.user = Load.data.user;
        vm.user.single = vm.user.single == 1 ? true : false;
        vm.user.double = vm.user.double == 1 ? true : false;
        vm.avatar = Load.data.user.image && Load.data.user.image !== '' ? Load.data.user.image : window.URL_BUCKET + '/img/profile/profile-blank.png';
    }
    UserDetailController.prototype.openModalAvailable = function () {
        var vm = this;
        var $paramObj = { user_id: vm.user.id };
        this.$http.post(this.PATHS.api + '/user/retrieveUserAvailability', $paramObj).then(function (resp) {
            if (resp.data.availability.length) {
                vm.availability = resp.data.availability;
                vm.always =
                    vm.availability[0].allDay &&
                        vm.availability[1].allDay &&
                        vm.availability[2].allDay &&
                        vm.availability[3].allDay &&
                        vm.availability[4].allDay &&
                        vm.availability[5].allDay &&
                        vm.availability[6].allDay;
            }
        });
        this.modalInstance = this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'availability-profile',
            size: 'md',
            scope: this.$scope
        });
    };
    UserDetailController.$inject = ['Load', '$http', '$state', '$scope', 'PATHS', '$uibModal', '$stateParams', 'toaster'];
    return UserDetailController;
}());
angular.module('UserDetail')
    .controller('UserDetailController', ['Load', '$http', '$state', '$scope', 'PATHS', '$uibModal', '$stateParams', 'toaster', UserDetailController]);
