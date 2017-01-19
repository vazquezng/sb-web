export class FeedbackController 
{   
    static $inject = ['$http', '$state', 'PATHS', '$stateParams'];

    public match;
    public user;
    public feedback;

    constructor(private $http, private $state, private PATHS, $stateParams){
        
        const vm = this;
        vm.$http.get(vm.PATHS.api + '/feedback/detail/' + $stateParams.match_id + '/' + $stateParams.user_id)
            .then(function(resp){
                vm.match = resp.data.match;
                vm.user = resp.data.user;
            });
    }

    public saveFeedback(){
        const vm = this;
        
        if(!vm.feedback){
            return;
        }
        
        vm.feedback.id_user_to = vm.user.id;
        vm.feedback.id_match = vm.match.id;
        console.log(vm.feedback);
        this.$http.post(this.PATHS.api + '/feedback/save', vm.feedback).then(function(resp){
            if(resp.data.success){
                vm.$state.go('app.home');
            }
        });
    }

    
}

angular.module('Feedback')
        .controller('FeedbackController', ['$http', '$state', 'PATHS', '$stateParams', FeedbackController]);