export class MatchDetailController
{
    static $inject = ['$scope', '$http', '$state', 'PATHS', '$stateParams', 'LoginService', 'toaster'];
    public match;
    public users;
    public user;
    constructor($scope, private $http, private $state, private PATHS, $stateParams, LoginService, private toaster){
        const vm = this;
        this.user = LoginService.getUser();
        vm.$http.get(vm.PATHS.api + '/match/' + $stateParams.id)
            .then(function(resp){
                vm.match = resp.data.match;
            });

    }

    public acceptUser(matchPlayerId){
        
        const vm = this;
        var $paramObj = {id: matchPlayerId, state: 'confirmed'};
        
        this.$http.post(this.PATHS.api + '/match/updatePlayerRequest', $paramObj).then(function(resp){
            if(resp.data.success){
                vm.toaster.pop({type: 'success', body: 'Confirmaste al usuario!',timeout: 2000});
                vm.$state.go('app.matchHistory');
            }else{
                vm.toaster.pop({type: 'error', body: 'No se pudo confirmar el usuario',timeout: 2000});
            }
        });
    }

    public refuseUser(matchPlayerId){
        const vm = this;
        var $paramObj = {id: matchPlayerId, state: 'rejected'};
        
        this.$http.post(this.PATHS.api + '/match/updatePlayerRequest', $paramObj).then(function(resp){
            if(resp.data.success){
                vm.toaster.pop({type: 'success', body: 'Rechazaste al usuario!',timeout: 2000});
                vm.$state.go('app.matchHistory');
            }else{
                vm.toaster.pop({type: 'error', body: 'No se pudo rechazar el usuario',timeout: 2000});
            }
        });
    }

    public acceptMatch(matchPlayerId){
        
        const vm = this;
        var $paramObj = {id: matchPlayerId, state: 'confirmed'};
        
        this.$http.post(this.PATHS.api + '/match/updatePlayerRequest', $paramObj).then(function(resp){
            if(resp.data.success){
                vm.toaster.pop({type: 'success', body: 'Confirmaste el partido!',timeout: 2000});
                vm.$state.go('app.matchHistory');
            }else{
                vm.toaster.pop({type: 'error', body: 'No se pudo confirmar el partido',timeout: 2000});
            }
        });
    }

    public refuseMatch(matchPlayerId){
        const vm = this;
        var $paramObj = {id: matchPlayerId, state: 'invitationDeclined'};
        
        this.$http.post(this.PATHS.api + '/match/updatePlayerRequest', $paramObj).then(function(resp){
            if(resp.data.success){
                vm.toaster.pop({type: 'success', body: 'Rechazaste el partido!',timeout: 2000});
                vm.$state.go('app.matchHistory');
            }else{
                vm.toaster.pop({type: 'error', body: 'No se pudo rechazar el partido',timeout: 2000});
            }
        });
    }

    createFeedback(match_id, user_id){
        const vm = this;
        vm.$state.go('app.feedback', { match_id: match_id, user_id: user_id });
    }


}

angular.module('MatchDetail')
        .controller('MatchDetailController', ['$scope', '$http', '$state', 'PATHS', '$stateParams', 'LoginService', 'toaster', MatchDetailController]);
