var indiceAtual = 0;
var imagensAPI = [];
var segundos = 1;
var tempo = 10000;
var rodouPrimeiro = false;

var urlAPI = 'https://divulgaifes.serra.cefetes.br/api/noticias/';
var headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

headers.append('Access-Control-Allow-Credentials', 'true');

headers.append('GET', 'POST');
headers.append('Authorization', 'Basic ');

fetch(urlAPI)
    .then(response => response.json())
    .then(noticias => {
        noticias.forEach(noticia => {
            if (noticia.oculto == 1){

            } else{
                imagensAPI.push(noticia.link);
            }
        });
        mudarNoticia();
    });

function mudarNoticia() {
    let imagemElemento = document.getElementById('img');
    let videoElemento = document.getElementById('video');

    if (imagensAPI[indiceAtual].endsWith('.mp4')) {

        videoElemento.src = imagensAPI[indiceAtual];

        videoElemento.onloadedmetadata = function() {
            tempo = this.duration * 1000;
        };

        if(rodouPrimeiro == false){
            imagemElemento.style.backgroundImage = 'url("https://divulgaifes.serra.cefetes.br/carregando.png")';
            rodouPrimeiro = true;
            indiceAtual = (indiceAtual - 1);
        } else{
            imagemElemento.style.backgroundImage = '';
            videoElemento.autoplay = true;
            videoElemento.style.opacity = '100%';
            rodouPrimeiro = false;
        }

    } else {
        tempo = 10000;

        videoElemento.src = '';
        videoElemento.style.opacity = '0';
        imagemElemento.style.backgroundImage = `url("${imagensAPI[indiceAtual]}")`;
    }

    clearInterval(intervaloID);
    intervaloID = setInterval(mudarNoticia, tempo);
    indiceAtual = (indiceAtual + 1) % imagensAPI.length;
}

var intervaloID = setInterval(mudarNoticia, tempo);

function contarSegundos() {
    segundos++;
    if (segundos === 1800) {
        window.location.reload(true);
    }
}

setInterval(contarSegundos, 1000);
