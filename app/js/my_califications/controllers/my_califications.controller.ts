export class MyCalificationsController 
{   
    static $inject = ['Califications', '$state', '$uibModal', 'PATHS', '$http', '$scope'];

    public feedbacks;
    public feedback;
    public match;
    public modalInstance;

    constructor(private Califications, private $state, private $uibModal, private PATHS, private $http, private $scope){
        const vm = this;
        this.feedbacks = Califications.data.feedbacks;
    }


    public openModalFeedback(feedback){
        let vm =  this;
        var $paramObj = {id_match: feedback.id_match , id_user_from: feedback.id_user_from, id_user_to: feedback.id_user_to };
        vm.$http.post(this.PATHS.api + '/feedback/detail', $paramObj).then(function(resp){
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
            scope: vm.$scope
        });
    }
}

angular.module('MyCalifications')
        .controller('MyCalificationsController', [ 'Califications', '$state', '$uibModal', 'PATHS', '$http', '$scope', MyCalificationsController]);