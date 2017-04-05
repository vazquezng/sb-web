class CanchasCreateController { 
  constructor($http, PATHS, $state) {
    console.log('CanchasCreateController');
    this.$http = $http;
    this.PATHS = PATHS;
    this.$state = $state;
  }

  create(form){
    if(form.$valid && (this.password === this.password_repeat)){
      const vm = this;
      this.$http.post(this.PATHS.api + '/canchas', 
        {name:this.name, email:this.email, password:this.password})
      .then((resp) => {
        localStorage.setItem('user-cancha', JSON.stringify(resp.data.user));
        localStorage.setItem('token-cancha', resp.data.token.token);

        vm.$state.go('app.admin-canchas-profile');
      });
    }
  }
}

class CanchasProfileController
{ 

  constructor($http, PATHS, toaster, $state, $scope, Upload){
    const token = localStorage.getItem('token-cancha');
    if(!token) {
      $state.go('app.admin-canchas');
    }
    const vm = this;
    this.user = JSON.parse(localStorage.getItem('user-cancha'));
    this.Upload = Upload;
    this.$http = $http;
    this.PATHS = PATHS;
    this.toaster = toaster;
    this.stopSave =  false;
    this.avatar = this.user.image || '';
    this.address = this.user.address || '';
    $scope.$watch('image', function(newImage, lastImage){
          if(newImage && newImage !== lastImage){
              var formData = new FormData();
              formData.append("file", newImage);
              vm.Upload.upload({
                  url: vm.PATHS.api + '/canchas/profile/image',
                  data: {file: newImage, 'name': vm.user.name}
              }).then(function (resp) {
                  console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                  vm.user.image = resp.data;
                  vm.avatar = resp.data;
                  
              }, function (resp) {
                  console.log('Error status: ' + resp.status);
              }, function (evt) {
                  //let progressPercentage:any = parseInt( 100.0 * evt.loaded / evt.total );
                  //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
              });
          }   
      });
  }

  save(form){
    const vm = this;
    if( ( !this.user.address && !this.user.address_lat && !this.user.address_lng) && (this.address && (!this.address.types || this.address.types [0]!="street_address" )) ){
        vm.toaster.pop({type: 'error', body: 'El campo dirección debe contener una dirección exácta',timeout: 2000});
        return;
    }

    if(form.$valid && !this.stopSave){
      this.stopSave = true;
      this.user.address = this.address && this.address.formatted_address ? this.address.formatted_address : this.address;
      this.user.address_lat = this.address && this.address.geometry ? this.address.geometry.location.lat() : this.user.lat;
      this.user.address_lng = this.address && this.address.geometry ? this.address.geometry.location.lng() : this.user.lng;
      this.$http.put(this.PATHS.api + '/canchas', this.user).then(function(resp){
        vm.stopSave = false;
        if(resp.data.success){
            vm.toaster.pop({type: 'success', body: 'Se guardo correctamente!',timeout: 2000});
            localStorage.setItem('user-cancha', JSON.stringify(resp.data.user));
        }else{
            vm.toaster.pop({type: 'error', body: 'Hubo un error, intente más tarde',timeout: 2000});
        }
      }, () =>{
        vm.stopSave = false;
        vm.toaster.pop({type: 'error', body: 'Hubo un error, intente más tarde',timeout: 2000});
      });
    }    
  }
}

angular.module('AdminCanchas')
        .controller('CanchasCreateController', ['$http', 'PATHS', '$state', CanchasCreateController])
        .controller('CanchasProfileController', ['$http', 'PATHS', 'toaster', '$state', '$scope', 'Upload', CanchasProfileController]);
