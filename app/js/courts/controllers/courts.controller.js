const CourtsController = /** @class */ (function () {
  function CourtsController(Canchas) {
    this.Canchas = Canchas;
    this.courts = [];
    const vm = this;
    for (let _i = 0, _a = Canchas.data.canchas; _i < _a.length; _i++) {
      const entry = _a[_i];
      if (entry.complete === 1 && entry.state === 'confirmed') {
        entry.center = { latitude: entry.address_lat, longitude: entry.address_lng };
        vm.courts[vm.courts.length] = entry;
      }
    }
  }
  CourtsController.prototype.filterCourts = function (str) {
    const vm = this;
    console.log(str);
  };

  CourtsController.$inject = ['Canchas'];

  return CourtsController;
}());

angular.module('Courts')
  .controller('CourtsController', ['Canchas', CourtsController]);
