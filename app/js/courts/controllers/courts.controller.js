var CourtsController = /** @class */ (function () {
    function CourtsController(Canchas) {
        this.Canchas = Canchas;
        this.courts = [];
        var vm = this;
        for (var _i = 0, _a = Canchas.data.canchas; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.complete == 1 && entry.state == 'confirmed') {
                entry.center = { latitude: entry.address_lat, longitude: entry.address_lng };
                vm.courts[vm.courts.length] = entry;
            }
        }
    }
    CourtsController.prototype.filterCourts = function (str) {
        var vm = this;
        console.log(str);
    };
    CourtsController.$inject = ['Canchas'];
    return CourtsController;
}());
angular.module('Courts')
    .controller('CourtsController', ['Canchas', CourtsController]);
