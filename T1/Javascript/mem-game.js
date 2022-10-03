/*
    INF1403 - PROGRAMAÇÃO PARA A WEB
    TRABALHO 1
    LEANDRO GOIS (1811601)
    SÉRGIO GABRIEL (2220652)
*/

// mem-game.js possui todas as regras do jogo e o processamento das interações com o usuário

vetorPathImagens = ["Imagens/bahia",
    "Imagens/bota",
    "Imagens/cap",
    "Imagens/ceara",
    "Imagens/corint",
    "Imagens/cru",
    "Imagens/fla",
    "Imagens/flu",
    "Imagens/fort",
    "Imagens/galo",
    "Imagens/goias",
    "Imagens/gremio",
    "Imagens/inter",
    "Imagens/naut",
    "Imagens/palm",
    "Imagens/santos",
    "Imagens/saop",
    "Imagens/sport",
    "Imagens/vasco",
    "Imagens/vito",
];
let numberOfTeams = 40;
let checker = 0;
let contaCartasIguais = 0;
RandomizedArray = [""];
duplicatedTeamArray = [""];
comparisonArray = [""];
let counter = 0;
let firstSelection = "";
let secondSelection = "";

onload = function() {
    trataCartas();
    atribuiImagensNasDivs();
    listaPosicoes();
}

function listaPosicoes() {
    for (var x = 0; x < 40; x++)
        for (var y = 0; y < 40; y++)
            if (x != y) // posicoes iguais não são tratados
                if (RandomizedArray[x] === RandomizedArray[y]) //encontrou igual
                    comparisonArray[x] = y;
}

function atribuiImagensNasDivs() {
    for (var i = 0; i < 40; i++) {
        var objImgEscudo = this.document.getElementById("id_" + i);
        objImgEscudo.src = RandomizedArray[i] + ".png";
    }
}

function sorteioCartas() {
    while (checker < numberOfTeams) {
        var j = 0,
            i = 0,
            found = 0;
        var checkName1;
        let valor = Math.floor(Math.random() * 20);
        for (; i < checker; i++) { //percorre array procurando time
            if (vetorPathImagens[valor] == RandomizedArray[i]) { //encontrou time!
                checkName1 = (vetorPathImagens[valor] + "1");
                for (; j < duplicatedTeamArray.length; j++) { //procura no array de times duplicados
                    if (checkName1 == duplicatedTeamArray[j]) { //encontrou time duplicado!
                        found = 1;
                        break;
                    }
                }
                if (found == 1) { //existe time e time duplicado: zera tudo, novo valor
                    j = 0;
                    i = -1;
                    found = 0;
                    valor = Math.floor(Math.random() * 20);
                } else { //existe time, mas nao existe esse time duplicado
                    duplicatedTeamArray[j] = checkName1;
                }
            }
        }
        RandomizedArray[checker] = vetorPathImagens[valor]; //adiciona o time no array de times
        checker++;
    }
}

function trataCartas() {
    const cartas = document.querySelectorAll(".Cartas .Carta");
    sorteioCartas();
    cartas.forEach((Carta) => {
        Carta.addEventListener("click", () => {
            Carta.classList.add("clicked");
            if (counter === 0) {
                firstSelection = Carta.getAttribute("escudo");
                counter++;
            } else {
                secondSelection = Carta.getAttribute("escudo");
                counter = 0;
                if (comparisonArray[firstSelection] == secondSelection) {
                    console.log("entrou!");
                    const correctcartas = document.querySelectorAll(".Carta[escudo='" + firstSelection + "']");
                    const correctcartas2 = document.querySelectorAll(".Carta[escudo='" + secondSelection + "']");
                    correctcartas[0].classList.add("checked");
                    correctcartas[0].classList.remove("clicked");
                    correctcartas2[0].classList.add("checked");
                    correctcartas2[0].classList.remove("clicked");
                    contaCartasIguais++;
                    //se o jogador encontrar todos os pares de cartas, ele aguarda 2,5 segundos e é direcionado à página de fim de jogo
                    if(contaCartasIguais == 20){
                        sleep(2500).then(() => {
                            window.open("return-page.html","_self");
                        });    
                        //sleep(2000);
                        //window.open("return-page.html","_self");
                    }
                } else {
                    const incorrectcartas = document.querySelectorAll(".Carta.clicked");
                    setTimeout(() => {
                        incorrectcartas[0].classList.remove("clicked");
                        incorrectcartas[1].classList.remove("clicked");
                    }, 800);
                }
            }
        })
    });
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
