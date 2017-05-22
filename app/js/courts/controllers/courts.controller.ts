export class CourtsController 
{   
    static $inject = ['Canchas'];

    public courts;

    constructor(private Canchas){
        const vm = this;
        
        for (let entry of Canchas.data.canchas) {
           entry.center = { latitude: entry.address_lat, longitude: entry.address_lng };
            console.log({ latitude: entry.address_lat, longitude: entry.address_lng });
        }
        vm.courts = Canchas.data.canchas;
        console.log(vm.courts);
    }

}

angular.module('Courts')
        .controller('CourtsController', ['Canchas', CourtsController]);