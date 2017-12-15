const MyCalificationsController = /** @class */ (function () {
  function MyCalificationsController(Califications, $state, $uibModal, PATHS, $http, $scope) {
    this.Califications = Califications;
    this.$state = $state;
    this.$uibModal = $uibModal;
    this.PATHS = PATHS;
    this.$http = $http;
    this.$scope = $scope;
    const vm = this;
    this.feedbacks = Califications.data.feedbacks;
  }
  MyCalificationsController.prototype.openModalFeedback = function (feedback) {
    const vm = this;
    const $paramObj = { id_match: feedback.id_match, id_user_from: feedback.id_user_from, id_user_to: feedback.id_user_to };
    vm.$http.post(`${this.PATHS.api}/feedback/detail`, $paramObj).then((resp) => {
      vm.$scope.feedback = resp.data.feedback;
      vm.$scope.match = resp.data.match;
      vm.$scope.user_from = resp.data.user_from;
    });
    vm.modalInstance = vm.$uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'feedback-detail',
      size: 'md',
      scope: vm.$scope,
    });
  };
  MyCalificationsController.$inject = ['Califications', '$state', '$uibModal', 'PATHS', '$http', '$scope'];
  return MyCalificationsController;
}());
angular.module('MyCalifications')
  .controller('MyCalificationsController', ['Califications', '$state', '$uibModal', 'PATHS', '$http', '$scope', MyCalificationsController]);
