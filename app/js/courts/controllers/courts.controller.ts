export class CourtsController 
{   
    static $inject = ['Canchas'];

    public courts=[];

    constructor(private Canchas){
        const vm = this;
        
        for (let entry of Canchas.data.canchas) {
            if(entry.complete == 1 && entry.state == 'confirmed'){
                entry.center = { latitude: entry.address_lat, longitude: entry.address_lng };
                vm.courts[vm.courts.length] = entry;
            }
        }
    }

    public filterCourts(str){
        const vm = this;
        console.log(str);
    }

}

angular.module('Courts')
        .controller('CourtsController', ['Canchas', CourtsController]);