var FeedbackController = /** @class */ (function () {
    function FeedbackController(Load, $http, $state, PATHS, $stateParams, toaster) {
        this.Load = Load;
        this.$http = $http;
        this.$state = $state;
        this.PATHS = PATHS;
        this.$stateParams = $stateParams;
        this.toaster = toaster;
        this.complete = false;
        var vm = this;
        vm.match = Load.data.match;
        vm.user = Load.data.user;
        vm.complete = Load.data.complete;
        vm.avatar = this.user.image && this.user.image !== '' ? this.user.image : window.URL_BUCKET + '/img/profile/profile-blank.png';
    }
    FeedbackController.prototype.saveFeedback = function () {
        var vm = this;
        if (!vm.feedback) {
            return;
        }
        vm.feedback.id_user_to = vm.user.id;
        vm.feedback.id_match = vm.match.id;
        console.log(vm.feedback);
        this.$http.post(this.PATHS.api + '/feedback/save', vm.feedback).then(function (resp) {
            if (resp.data.success) {
                vm.toaster.pop({ type: 'success', body: 'Tu feedback se guardo correctamente!', timeout: 2000 });
                vm.$state.go('app.match_detail', { id: vm.$stateParams.match_id });
            }
            else {
                vm.toaster.pop({ type: 'error', body: resp.data.errorMessage, timeout: 2000 });
                vm.$state.go('app.match_detail', { id: vm.$stateParams.match_id });
            }
        });
    };
    FeedbackController.$inject = ['Load', '$http', '$state', 'PATHS', '$stateParams', 'toaster'];
    return FeedbackController;
}());
angular.module('Feedback')
    .controller('FeedbackController', ['Load', '$http', '$state', 'PATHS', '$stateParams', 'toaster', FeedbackController]);
