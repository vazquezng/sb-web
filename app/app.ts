//(<any>window).google = require('google-maps'); 
//(<any>window).google.KEY = 'AIzaSyDZOdwsf3vZEFQws7WldOWKeibaWiMjJCg';
//(<any>window).google.LIBRARIES = ['geometry', 'places'];
//(<any>window).AWS = require('aws-sdk/global');
require('./js/core/app.ts');
require('./js/home/home.module.ts');
require('./js/view_profile/view_profile.module.ts');
require('./js/create_match/create_match.module.ts');
require('./js/play/play.module.ts');
require('./js/login/login.module.ts');

(<any>window).validaNumber =  function(e){
    let tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla==8){
        return true;
    }
        
    // Patron de entrada, en este caso solo acepta numeros
    let patron =/[0-9]/;
    let tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}