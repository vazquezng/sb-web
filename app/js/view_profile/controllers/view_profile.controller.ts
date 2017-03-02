class ProfileController {
    static $inject = ['LoginService', '$http', '$state', '$scope', 'PATHS', 'Upload', '$uibModal', 'toaster'];

    public user;
    public image;
    public avatar;

    public country;
    public city;
    public address;
    public modalInstance;
    public completeForm =false;
    constructor (private LoginService, private $http, private $state, private $scope, private PATHS, private Upload, private $uibModal, private toaster){
        if(!LoginService.isAuth()){
            $state.go('app.home');
        }  
        this.user = LoginService.getUser();
        let vm =  this;
        vm.avatar = this.user.image && this.user.image !== '' ? this.user.image : (<any>window).URL_BUCKET+'/img/profile/profile-blank.png';
        this.city = this.user.city;
        this.country = this.user.country;
        this.address = this.user.address;

        this.user.game_level = this.user.game_level ? this.user.game_level.toString(): this.user.game_level;
        this.user.itn = this.user.itn ? this.user.itn.toString(): this.user.itn;
        this.user.single = (this.user.single==1);
        this.user.double = (this.user.double==1);

        $scope.$watch('image', function(newImage, lastImage){
            if(newImage && newImage !== lastImage){
                var formData = new FormData();
                formData.append("file", newImage);
                vm.Upload.upload({
                    url: vm.PATHS.api + '/user/profile/image',
                    data: {file: newImage, 'name': vm.user.name}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    vm.user.image = resp.data;
                    vm.avatar = resp.data;
                    
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt:any) {
                    //let progressPercentage:any = parseInt( 100.0 * evt.loaded / evt.total );
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }   
        });

        
        $scope.save = function(){
            vm.saveAvailability();
        };
    }

    public openModalAvailable(){
        this.modalInstance = this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'availability-profile',
            size: 'md',
            scope:this.$scope
        });
    }

    private  saveAvailability(){
        this.modalInstance.close();
    }

    public save(form){
        if(form.$valid){
            this.user.city = this.city && this.city.formatted_address ? this.city.formatted_address : this.city;
            this.user.country =  this.country && this.country.address_components ? this.country.address_components[this.country.address_components.length-1].long_name : this.country;
            this.user.address = this.address && this.address.formatted_address ? this.address.formatted_address : this.address;
            this.user.address_lat = this.address && this.address.geometry ? this.address.geometry.location.lat() : this.user.lat;
            this.user.address_lng = this.address && this.address.geometry ? this.address.geometry.location.lng() : this.user.lng;

            const vm = this;
            this.$http.post(this.PATHS.api + '/user', this.user).then(function(resp){
                if(resp.data.success){
                    vm.toaster.pop({type: 'success', body: 'Se guardo correctamente!',timeout: 2000});
                    vm.LoginService.setUser(vm.user);
                    //vm.$state.reload();
                }else{
                    vm.toaster.pop({type: 'error', body: 'Hubo un error, intente más tarde',timeout: 2000});
                }
            });
        }else{
            //Darle un mensaje al usuario de que debe completar los datos
            this.completeForm= true;
        }
    }
}

angular.module('Profile')
    .controller('ProfileController', ['LoginService', '$http', '$state', '$scope', 'PATHS', 'Upload', '$uibModal', 'toaster', ProfileController]);


