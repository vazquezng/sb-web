export class MatchDetailController
{
    static $inject = ['$scope', '$http', '$state', 'PATHS', '$stateParams', 'LoginService'];
    public match;
    public users;
    public user;
    constructor($scope, private $http, private $state, private PATHS, $stateParams, LoginService){
        const vm = this;
        this.user = LoginService.getUser();
        vm.$http.get(vm.PATHS.api + '/match/' + $stateParams.id)
            .then(function(resp){
                vm.match = resp.data.match;
            });

    }

    createFeedback(match_id, user_id){
        const vm = this;
        vm.$state.go('app.feedback', { match_id: match_id, user_id: user_id });
    }


}

angular.module('MatchDetail')
        .controller('MatchDetailController', ['$scope', '$http', '$state', 'PATHS', '$stateParams', 'LoginService', MatchDetailController]);
