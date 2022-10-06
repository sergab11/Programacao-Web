/*
    INF1403 - PROGRAMAÇÃO PARA A WEB
    TRABALHO 1
    LEANDRO GOIS (1811601)
    SÉRGIO GABRIEL (2220652)
*/

// página return-page.html aparece quando ocorre o fim do jogo...
// jogador tem a opção de recomeçar a partida (botaoJoga) ou de retornar ao menu principal (botaoRetorna)

let serieEscolhida = window.location.href.substring(window.location.href.indexOf('#')+1);

onload = function(){
    var botaoJoga = this.document.getElementById("btJoga");
    var botaoRetorna = this.document.getElementById("btRetorna"); 

    botaoJoga.addEventListener("click", trataBotaoJoga);
    botaoRetorna.addEventListener("click", trataBotaoRetorna);
}

function trataBotaoJoga(){
    window.location.href = "mem-game.html#"+serieEscolhida;
}

function trataBotaoRetorna(){
    window.location.href = "index.html";
}
