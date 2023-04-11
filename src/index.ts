
import Game from './core/desktop/Game';
import GameMobile from './core/mobile/Game';

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    new GameMobile();
}else{
    new Game();
}

window.addEventListener('touchend', function () {
    var elem = document.documentElement;
    elem.requestFullscreen();
})