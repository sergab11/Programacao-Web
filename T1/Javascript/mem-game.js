/*
    INF1403 - PROGRAMAÇÃO PARA A WEB
    TRABALHO 1
    LEANDRO GOIS ()
    SÉRGIO GABRIEL (2220652)
*/

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

let counter = 0;
let firstSelection = "";
let secondSelection = "";

onload = function () {
    atribuiImagensNasDivs();
    trataCartas();
}

function atribuiImagensNasDivs(){
    for(var i=0; i<20; i++){
        var string_time = vetorPathImagens[i].substr(vetorPathImagens[i].indexOf('/')+1);

        var objImgEscudo = this.document.getElementById("id_"+string_time);
        objImgEscudo.src = vetorPathImagens[i]+".png";

        var objImgEscudo = this.document.getElementById("id_"+string_time+"1");
        objImgEscudo.src = vetorPathImagens[i]+".png";
    }
}

function trataCartas(){
    const cartas = document.querySelectorAll(".Cartas .Carta");

    cartas.forEach((Carta) => {
        Carta.addEventListener("click", () => {
            Carta.classList.add("clicked");

            if(counter === 0) {
                firstSelection = Carta.getAttribute("escudo");
                counter++;
            }
            else {
                secondSelection = Carta.getAttribute("escudo");
                counter = 0;

                if(firstSelection === secondSelection){
                    const correctcartas = document.querySelectorAll(
                        ".Carta[escudo='" + firstSelection + "']"
                    );

                    correctcartas[0].classList.add("checked");
                    correctcartas[0].classList.remove("clicked");
                    correctcartas[1].classList.add("checked");
                    correctcartas[1].classList.remove("clicked");

                } else{
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