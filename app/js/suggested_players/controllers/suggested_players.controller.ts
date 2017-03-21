export class SuggestedPlayersController 
{   
    static $inject = ['Players', '$scope', '$http', '$stateParams', 'PATHS', 'toaster'];

    public users;

    public toaster;
    
    public match_id;
    

    constructor(private Players, private $scope, private $http, private $stateParams, private PATHS, toaster){
        this.toaster = toaster;
        this.users = Players.data.players;
        this.match_id = $stateParams.match_id;
    }

    public invite(user_id){
        const vm = this;
        var paramObj = {user_id: user_id, match_id: this.match_id};
        this.$http.post(this.PATHS.api + '/match/invite', paramObj).then(function(resp){
                if(resp.data.success){
                    vm.toaster.pop({type:'info', body:'Invitación enviada.'})
                }
            });
    }
}

angular.module('SuggestedPlayers')
        .controller('SuggestedPlayersController', ['Players', '$scope', '$http', '$stateParams', 'PATHS', 'toaster', SuggestedPlayersController]);
