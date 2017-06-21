class ProfileController {
    static $inject = ['LoginService', '$http', '$state', '$scope', 'PATHS', 'Upload', '$uibModal', 'toaster', '$rootScope'];

    public user;
    public image;
    public avatar;
    public emailFormat = /^[a-z]+[a-z0-9._\-]+@[a-z]+\.[a-z]{2,5}\.?[a-z]{0,5}$/;
    public country;
    public city;
    public address;
    public modalInstance;
    public availabilityList = [];
    public completeForm =false;
    public tabIndex = 0;
    public isSetted = false;

    //always y allDay son variables auxiliares para ahorrar control en el html.
    public always = false;
    public availability =[{allDay: false, morning: false, evening: false, night: false},
                          {allDay: false, morning: false, evening: false, night: false},
                          {allDay: false, morning: false, evening: false, night: false},
                          {allDay: false, morning: false, evening: false, night: false},
                          {allDay: false, morning: false, evening: false, night: false},
                          {allDay: false, morning: false, evening: false, night: false},
                          {allDay: false, morning: false, evening: false, night: false}];

    public stopSave = false;
    constructor (private LoginService, private $http, private $state, private $scope, private PATHS, private Upload, private $uibModal, private toaster, private $rootScope){
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
        // this.user.itn = this.user.itn ? this.user.itn.toString(): this.user.itn;
        this.user.club_member = this.user.club_member ? this.user.club_member.toString(): this.user.club_member;
        console.log(this.user.club_member );
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

    //A la función se le envía el nombre del check box y su valor actual.
    public updateChecks(name, value){

        //Se invierte el valor actual para cambiar su estado
        value = !value;
        //Si es todos los días en cualquier horario, se modifican todos los check boxs con el nuevo valor
        if(name == 'always'){
            this.availability =[  {allDay: value, morning: value, evening: value, night: value},    //LUNES
                                  {allDay: value, morning: value, evening: value, night: value},    //MARTES
                                  {allDay: value, morning: value, evening: value, night: value},    //MIÉRCOLES
                                  {allDay: value, morning: value, evening: value, night: value},    //JUEVES
                                  {allDay: value, morning: value, evening: value, night: value},    //VIERNES
                                  {allDay: value, morning: value, evening: value, night: value},    //SÁBADO
                                  {allDay: value, morning: value, evening: value, night: value}];   //DOMINGO
            this.always = value;
        }
        //Si es en cualquier horario de ese día, se modifican todos los checkbox de ese tab
        else if(name == 'allDay'){
            this.availability[this.tabIndex]={allDay: value, morning: value, evening: value, night: value};
            this.availability[this.tabIndex].allDay = value;
        // Si no es ninguno de los otros, es un momento específico de un día, se cambia ese valor
        }else {
            this.availability[this.tabIndex][name] = value;
        }

        //acá se actualizan los check box para todo el día y todos los días
        this.availability[this.tabIndex].allDay =
            this.availability[this.tabIndex].morning &&
            this.availability[this.tabIndex].evening &&
            this.availability[this.tabIndex].night;

        this.isSetted = false;


        for (let entry of this.availability) {
            if(entry.morning || entry.evening || entry.night){
                this.isSetted = true;
                break;
            }
        }


        this.always =
            this.availability[0].allDay &&
            this.availability[1].allDay &&
            this.availability[2].allDay &&
            this.availability[3].allDay &&
            this.availability[4].allDay &&
            this.availability[5].allDay &&
            this.availability[6].allDay;
    }

    public openModalAvailable(){
        let vm =  this;
        var $paramObj = {user_id: vm.user.id};
        this.$http.post(this.PATHS.api + '/user/retrieveUserAvailability', $paramObj).then(function(resp){

        if(resp.data.availability.length){
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

        vm.modalInstance = vm.$uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'availability-profile',
                size: 'md',
                scope:vm.$scope
            });
        });
    }

    private  saveAvailability(){

        var params = {availability: this.availability};
        const vm = this;
        this.$http.post(this.PATHS.api + '/user/saveAvailability', params).then(function(resp){
            if(resp.data.success){
                vm.toaster.pop({type: 'success', body: 'Tu disponibilidad se guardo correctamente!',timeout: 2000});
                vm.modalInstance.close();
            }else{
                vm.toaster.pop({type: 'error', body: 'Ocurrió un error al guardar tu disponibilidad',timeout: 2000});
            }
        });
    }

    public updateAvailability(weekDay, time){
        var index = this.availabilityList.indexOf(weekDay+'-'+time);
        if(index == -1){
            this.availabilityList[this.availabilityList.length] = weekDay+'-'+time;
        }else{
            this.availabilityList.splice(index,1);
        }
    }

    private getCountryFromAddress(){
        for (var i=0; i < this.address.address_components.length; i++) {
          for (var j=0; j < this.address.address_components[i].types.length; j++) {
            if (this.address.address_components[i].types[j] == "country") {
              return this.address.address_components[i].long_name;
            }
          }
        }
    }

    public save(form){
        const vm = this;
        if(this.address != this.user.address && (!this.address.types || this.address.types[0] != "street_address")){
             vm.toaster.pop({type: 'error', body: 'El campo dirección debe contener una dirección exácta',timeout: 2000});
             return;
        }

        if(form.$valid && !this.stopSave && (this.user.single || this.user.double)){
            this.stopSave = true;
            this.completeForm= false;
            /*this.user.city = this.city && this.city.formatted_address ? this.city.formatted_address : this.city;
            this.user.country =  this.country && this.country.address_components ? this.country.address_components[this.country.address_components.length-1].long_name : this.country;*/
            this.user.city = this.address.types && this.address.types [0]=="street_address" ? this.address.vicinity : this.user.city;
            this.user.country = this.address.types && this.address.types [0]=="street_address" ? this.getCountryFromAddress(): this.user.country;
            this.user.address = this.address && this.address.formatted_address ? this.address.formatted_address : this.address;
            this.user.address_lat = this.address && this.address.geometry ? this.address.geometry.location.lat() : this.user.address_lat;
            this.user.address_lng = this.address && this.address.geometry ? this.address.geometry.location.lng() : this.user.address_lng;

            this.$http.post(this.PATHS.api + '/user', this.user).then(function(resp){
                vm.stopSave = false;
                if(resp.data.success){
                    vm.toaster.pop({type: 'success', body: 'Se guardo correctamente!',timeout: 2000});
                    vm.$rootScope.$broadcast('profile-update');
                    if(!vm.user.complete){
                        vm.user.complete = true;
                        vm.LoginService.setUser(vm.user);
                        vm.$state.go('app.createMatch');
                    }

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
    .controller('ProfileController', ['LoginService', '$http', '$state', '$scope', 'PATHS', 'Upload', '$uibModal', 'toaster', '$rootScope', ProfileController]);
