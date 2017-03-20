export class SuggestedPlayersController 
{   
    static $inject = ['Players', '$scope', '$http', 'PATHS', 'toaster'];

    public users;

    constructor(private Players, private $scope, private $http, private PATHS, toaster){
        
        this.users = Players.data.players;
    }

    public invite(user_id){
        const vm = this;
        this.$http.post(this.PATHS.api + '/match/invite', user_id).then(function(resp){
                if(resp.data.success){
                    vm.toaster.pop({type:'info', body:'Invitación enviada.'})
                }
            });
    }
}

angular.module('SuggestedPlayers')
        .controller('SuggestedPlayersController', ['Players', '$scope', '$http', 'PATHS', 'toaster', SuggestedPlayersController]);
