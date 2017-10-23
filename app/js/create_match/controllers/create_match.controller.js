import moment from 'moment';

var CreateMatchController = /** @class */ (function () {
    function CreateMatchController($scope, $http, $state, PATHS, LoginService, toaster, Canchas) {
        this.$http = $http;
        this.$state = $state;
        this.PATHS = PATHS;
        this.LoginService = LoginService;
        this.toaster = toaster;
        this.Canchas = Canchas;
        this.match = {
            date: new Date((new Date()).getTime() + 24 * 60 * 60 * 1000),
            hour: new Date(moment('15:30', 'HH:mm')),
            id_cancha: null,
            address: '',
            address_lat: '',
            address_lng: '',
            game_level_from: '2.5',
            game_level_to: '2.5',
            type: '',
            sexo: 'mixto'
        };
        this.partner_club = '0';
        this.date = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000);
        this.mytime = new Date(moment('15:30', 'HH:mm'));
        this.ismeridian = true;
        this.canchas = [];
        this.stopSave = false;
        if (!LoginService.isAuth()) {
            $state.go('app.home');
        }
        else if (!LoginService.getUser().complete) {
            toaster.pop({ type: 'error', body: 'Debe completar su perfil primero.' });
            $state.go('app.profile');
        }
        this.canchas = Canchas.data.canchas;
        this.map = { center: { latitude: -34.6038966, longitude: -58.3817433 }, zoom: 14 };
    }
    CreateMatchController.prototype.validateTime = function () {
        if (!this.match.hour) {
            this.toaster.pop({ type: 'info', body: 'Ingresaste un horario incorrecto. Recordá que los partidos se pueden jugar de 8 a 23hs y que la hora se encuentra en formato 24hs.' });
            return false;
        }
        if (this.match.hour.getHours() < 8 || (this.match.hour.getHours() > 23 || (this.match.hour.getHours() == 23 && this.match.hour.getMinutes() == 30))) {
            this.toaster.pop({ type: 'info', body: 'El partido no puede hacerse antes de las 8 hs ni después de las 23 hs.' });
            return false;
        }
        if (this.match.hour.getMinutes() != 0 && this.match.hour.getMinutes() != 30) {
            this.toaster.pop({ type: 'info', body: 'En la hora del partido, solo se admiten intervalos de 30 minutos.' });
            this.match.hour = new Date(moment('15:30', 'HH:mm'));
            return false;
        }
        return true;
    };
    CreateMatchController.prototype.validateDateTime = function () {
        var now = new Date();
        if (this.match.date.getFullYear() == now.getFullYear() && this.match.date.getMonth() == now.getMonth()
            && this.match.date.getDate() == now.getDate() && this.match.hour < now) {
            this.toaster.pop({ type: 'info', body: 'La fecha y/o hora ya pasarón.' });
            this.match.hour = new Date(moment('15:30', 'HH:mm'));
            return false;
        }
        return true;
    };
    CreateMatchController.prototype.changePartnerClub = function () {
        var _this = this;
        if (this.partner_club != 'Custom') {
            var cancha = this.canchas.find(function (c) { return c.id == _this.partner_club; });
            if (cancha) {
                this.map.center.latitude = cancha.address_lat;
                this.map.center.longitude = cancha.address_lng;
                this.market = { latitude: cancha.address_lat, longitude: cancha.address_lng };
                this.match.id_cancha = this.partner_club;
                this.match.club_name = cancha.name;
                this.match.address = cancha.address;
                this.match.address_lat = cancha.address_lat;
                this.match.address_lng = cancha.address_lng;
            }
        }
        else {
            this.address = null;
            this.match.id_cancha = null;
            this.match.club_name = '';
            this.match.address = null;
            this.match.address_lat = null;
            this.match.address_lng = null;
        }
    };
    CreateMatchController.prototype.changeAddress = function () {
        if (this.address.geometry && this.address.geometry.location) {
            this.map.center.latitude = this.address.geometry.location.lat();
            this.map.center.longitude = this.address.geometry.location.lng();
            this.market = { latitude: this.address.geometry.location.lat(), longitude: this.address.geometry.location.lng() };
            this.match.address = this.address.formatted_address;
            this.match.address_lat = this.address.geometry.location.lat();
            this.match.address_lng = this.address.geometry.location.lng();
        }
    };
    CreateMatchController.prototype.validateYears = function () {
        if (!this.match.years_from || !this.match.years_to) {
            this.toaster.pop({ type: 'info', body: 'Los campos "Edad desde" y "Edad hasta" son obligatorios.' });
            return false;
        }
        if (this.match.years_from <= 17) {
            this.match.years_from = 18;
            this.toaster.pop({ type: 'info', body: 'La "Edad desde" debe ser mayor a 17 años.' });
            return false;
        }
        if (this.match.years_from > 100) {
            this.match.years_to = null;
            this.toaster.pop({ type: 'info', body: 'La "Edad desde" debe ser menor a 100 años.' });
            return false;
        }
        if (this.match.years_from > this.match.years_to) {
            this.match.years_to = null;
            this.toaster.pop({ type: 'info', body: 'La "Edad desde" debe ser menor a la "Edad hasta".' });
            return false;
        }
        return true;
    };
    CreateMatchController.prototype.validateLevel = function () {
        if (this.match.game_level_from > this.match.game_level_to) {
            this.match.game_level_to = this.match.game_level_from;
            this.toaster.pop({ type: 'info', body: 'El "Nivel desde" debe ser menor o igual al "Nivel hasta".' });
            return false;
        }
        return true;
    };
    CreateMatchController.prototype.save = function (form) {
        if (!this.validateTime() || !this.validateDateTime() || !this.validateYears() ||
            !this.validateLevel()) {
            return;
        }
        var vm = this;
        if (form.$valid && !this.stopSave) {
            this.stopSave = !this.stopSave;
            this.match.hour = this.match.hour.toLocaleTimeString();
            this.$http.post(this.PATHS.api + '/match', this.match).then(function (resp) {
                if (resp.data.success) {
                    vm.$state.go('app.suggested_players', { match_id: resp.data.match_id });
                }
                else {
                    if (resp.data.errorMessage) {
                        vm.toaster.pop({ type: 'warn', body: resp.data.errorMessage });
                    }
                }
            });
        }
        else {
            this.toaster.pop({ type: 'info', body: 'Debe completar todos los datos.' });
        }
    };
    CreateMatchController.$inject = ['$scope', '$http', '$state', 'PATHS', 'LoginService', 'toaster', 'Canchas'];
    return CreateMatchController;
}());
angular.module('CreateMatch')
    .controller('CreateMatchController', ['$scope', '$http', '$state', 'PATHS', 'LoginService', 'toaster', 'Canchas', CreateMatchController]);
