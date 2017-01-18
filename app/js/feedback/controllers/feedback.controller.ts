export class FeedbackController 
{   
    static $inject = ['$scope', '$http', '$state', 'PATHS', '$stateParams'];

    public match;
    public user;
    public feedback;

    constructor($scope, private $http, private $state, private PATHS, $stateParams){
        
        const vm = this;
        vm.$http.get(vm.PATHS.api + '/match/feedbackInfo/' + $stateParams.match_id + '/' + $stateParams.user_id)
            .then(function(resp){
                vm.match = resp.data.match;
                vm.user = resp.data.user;
            });
        $scope.save = function(){
            vm.saveFeedback();
        };
    }

    public saveFeedback(){
        const vm = this;
        this.$http.post(this.PATHS.api + '/match/saveFeedback', vm.feedback).then(function(resp){
            if(resp.data.success){
                vm.$state.go('app.home');
            }
        });
    }

    
}

angular.module('Feedback')
        .controller('FeedbackController', ['$scope', '$http', '$state', 'PATHS', '$stateParams', FeedbackController]);