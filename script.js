let contenedor = document.querySelector('.plantilla');
let matriz = [];
let matrizanterior = [];

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp(){
    let sec = [];
    for(let i = 0; i < 50; i++){
        sec = [];
        aux = [];
        for(let j = 0; j < 100; j++){
            let celula = document.createElement('DIV');
            celula.classList.add('fondo');
            celula.classList.add('fblanco');
            sec.push("0");
            aux.push("0");
            celula.dataset.coord = i + "," + j;
            celula.onclick = cambiar;
            contenedor.appendChild(celula);
        }
        matriz.push(sec);
        matrizanterior.push(aux);
    }
    const btnresetear = document.querySelector('.btnres');
    btnresetear.onclick = resetear;
    const btnjueg = document.querySelector('.btnini');
    btnjueg.onclick = iniciarevento;
    const btnexp = document.querySelector('.btnexp');
    btnexp.onclick = explicacion;
    const informacion = document.querySelector('.btninfo');
    informacion.onclick = ocultar;
}

function cambiar(e){
    const coordenadas = e.target.dataset.coord.toString().split(',');
    if(e.target.classList.contains('fblanco')){
        e.target.classList.remove('fblanco');
        e.target.classList.add('fnegro');
        matriz[coordenadas[0]][coordenadas[1]] = 1;
    }else{
        e.target.classList.add('fblanco');
        e.target.classList.remove('fnegro');
        matriz[coordenadas[0]][coordenadas[1]] = 0;
    }
}

function resetear(e){
    for(let i = 0; i < 50; i++){
        for(let j = 0; j < 100; j++){
            matriz[i][j] = 0;
        }
    }
    const array = document.querySelectorAll('.fondo'); 
    array.forEach(element => {
        if(element.classList.contains('fnegro')){
            element.classList.add('fblanco');
            element.classList.remove('fnegro');
        }
    });
}

function iniciarevento(e){
    console.log(e.target.textContent);
    if(e.target.textContent == 'INICIAR'){
        e.target.textContent = 'PAUSAR';
        jueg = false;
        intervalo=setInterval(juego,1000);   
    }else{
        e.target.textContent = 'INICIAR';
        jueg = true;
    }
}
let jueg = false;
let cont = 0;
let xneg = 0,yneg = 0;
function juego(){
    for(let i = 0; i < 50; i++){
        for(let j = 0; j < 100; j++){
            matrizanterior[i][j] = matriz[i][j];
        }
    }
    for(let i = 0; i < 50; i++){
        for(let j = 0; j < 100; j++){
            cont = 0;
            if(matrizanterior[(i+1)%50][j] == 1) cont++;
            if(matrizanterior[i][(j+1)%100] == 1) cont++;
            if(matrizanterior[(i+1)%50][(j+1)%100] == 1) cont++;
            if(i == 0) xneg = 49;
            else xneg = i-1;
            if(j == 0) yneg = 99;
            else yneg = j-1;
            if(matrizanterior[xneg][(j+1)%100] == 1) cont++;
            if(matrizanterior[xneg][j] == 1) cont++;
            if(matrizanterior[xneg][yneg] == 1) cont++;
            if(matrizanterior[i][yneg] == 1) cont++;
            if(matrizanterior[(i+1)%50][yneg] == 1) cont++;
            if(matrizanterior[i][j] == 1){
                if(cont != 2 && cont != 3){
                    matriz[i][j] = 0;
                }
            }else{
                if(cont == 3){
                    matriz[i][j] = 1;
                }
            }
        }
    }
    const array = document.querySelectorAll('.fondo'); 
    let coordenadas;
    array.forEach(element => {
        coordenadas = element.dataset.coord.toString().split(',');
        if(matriz[coordenadas[0]][coordenadas[1]] == 1){
            if(element.classList.contains('fblanco')){
                element.classList.remove('fblanco');
                element.classList.add('fnegro');
            }
        }else{
            if(element.classList.contains('fnegro')){
                element.classList.add('fblanco');
                element.classList.remove('fnegro');
            }
        }
    });
    if (jueg) {
        clearInterval(intervalo);
    }
}

function explicacion(e){
    const panel = document.querySelector('.info');
    panel.style.display = 'block';
}

function ocultar(e){
    const panel = document.querySelector('.info');
    panel.style.display = 'none';
}