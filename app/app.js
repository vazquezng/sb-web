require('./js/core/app.ts');
require('./js/news/news.module.js');
require('./js/home/home.module.ts');
require('./js/view_profile/view_profile.module.ts');
require('./js/create_match/create_match.module.ts');
require('./js/play/play.module.ts');
require('./js/login/login.module.ts');
require('./js/friends/friends.module.ts');
require('./js/match_history/match_history.module.ts');
require('./js/match_detail/match_detail.module.ts');
require('./js/user_detail/user_detail.module.ts');
require('./js/my_califications/my_califications.module.ts');
require('./js/feedback/feedback.module.ts');
require('./js/achievements/achievements.module.ts');
require('./js/courts/courts.module.ts');
require('./js/suggested_players/suggested_players.module.ts');

require('./js/admin-canchas/admin-canchas.module');

window.validaNumber = function (e) {
  const tecla = (document.all) ? e.keyCode : e.which;

  // Tecla de retroceso para borrar, siempre la permite
  if (tecla == 8) {
    return true;
  }

  // Patron de entrada, en este caso solo acepta numeros
  const patron = /[0-9]/;
  const tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
};
