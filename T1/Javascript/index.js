/*
    INF1403 - PROGRAMAÇÃO PARA A WEB
    TRABALHO 1
    LEANDRO GOIS (1811601)
    SÉRGIO GABRIEL (2220652)
*/

// página index.html trata, obviamente, do menu principal do jogo
// jogador, após preencher o campo com seu email e o mesmo ser validado, poderá começar a jogar (botaoNovoJogo)
// jogador também poderá ler informações (botaoSobre) sobre o jogo

mostraSobre = true;

onload = function(){
    trocaEstadoSobre();
    escondeDivEmailInvalido();
    var botaoSobre = this.document.getElementById("btSobre");
    var botaoNovoJogo = this.document.getElementById("btNovoJogo"); 

    botaoSobre.addEventListener("click", trataBotaoSobre);
    botaoNovoJogo.addEventListener("click", trataEmailEBotaoNovoJogo);
}

function trataEmailEBotaoNovoJogo(){
    var EmailInForm = document.getElementById("text_email").value;
    var reg = /^([a-z0-9_\-\.])+\@(gmail|hotmail|live)+\.com$/;

    if (reg.test(EmailInForm)) {
        escondeDivEmailInvalido();
        window.open("mem-game.html","_self");
    } else {
        mostraDivEmailInvalido();
    }
}

function trataBotaoSobre(){
    trocaEstadoSobre();
}

function trocaEstadoSobre(){
    var divSobreTexto = this.document.getElementById("divSobreTexto");
    var divSobreDevs = this.document.getElementById("divSobreDevs");

    if(mostraSobre === false){
        mostraSobre = true;
        divSobreTexto.style.visibility = 'visible'; 
        divSobreDevs.style.visibility = 'visible'; 
    }
    else{
        mostraSobre = false;
        divSobreTexto.style.visibility = 'hidden'; 
        divSobreDevs.style.visibility = 'hidden'; 
    }
}

function escondeDivEmailInvalido(){
    var divEmailInvalido = this.document.getElementById("emailInv");
    divEmailInvalido.style.visibility = 'hidden';
}

function mostraDivEmailInvalido(){
    var divEmailInvalido = this.document.getElementById("emailInv");
    divEmailInvalido.style.visibility = 'visible'; 
}