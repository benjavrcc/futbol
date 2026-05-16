async function obtenerjugador(){
    const response = await fetch('futbolistas.json');
    const jugadores = await response.json();
    const numero = Math.floor(Math.random() * jugadores.length);
    const player = jugadores[numero];
    const n = player.length
    console.log("Futbolistas cargados");
    return {player, n}
}

let palabraSecreta="";
let digitos=0;

const futbol = document.getElementById("futboldle");


const botonEnviar = document.getElementById("boton-enviar");
document.getElementById("intento-usuario").addEventListener("keydown", (e) => {
    if (e.key === "Enter") botonEnviar.click();
});
document.getElementById("intento-letra").addEventListener("keydown", (e) => {
    if (e.key === "Enter") botonLetra.click();
});
const botonLetra = document.getElementById("boton-letra");
const iniciar = document.getElementById("boton-obtener");
const playagain =document.getElementById("reiniciar");

let vidas=0;
let casillasllenadas=0;
playagain.style.display='none';
iniciar.addEventListener('click', async () => {
    vidas=6;
    casillasllenadas=0;
    actualizarahorcado(1);
    const output= await obtenerjugador();
    palabraSecreta=  output.player.toUpperCase();
    digitos= output.n;
    const fila = document.getElementById("fila-nombre");
    fila.innerHTML = ""; 

    for (let i = 1; i <= digitos; i++) {
        const casilla = document.createElement("div");
        casilla.classList.add("casilla");
        casilla.id = `f1-c${i}`;
        fila.appendChild(casilla);
        };
    iniciar.style.display = 'none';
});

playagain.addEventListener('click', async () => {
    vidas=6;
    casillasllenadas=0;
    actualizarahorcado(1);
    const output= await obtenerjugador();
    palabraSecreta=  output.player.toUpperCase();
    digitos= output.n;
    const fila = document.getElementById("fila-nombre");
    fila.innerHTML = ""; 

    for (let i = 1; i <= digitos; i++) {
        const casilla = document.createElement("div");
        casilla.classList.add("casilla");
        casilla.id = `f1-c${i}`;
        fila.appendChild(casilla);
        };

    iniciar.style.display = 'none';
    playagain.style.display='none';
});

function llenarcasilla(x, letra) {
    const casilla = document.getElementById(`f1-c${x}`);
    casilla.textContent = letra;
};

function actualizarahorcado(n) {
    const ahorcado = document.getElementById("imagen-ahorcado");
    ahorcado.src = `fotos/AH${n}.png`;
};

botonLetra.onclick = function() {
    const char = document.getElementById("intento-letra");
    const letra= char.value.toUpperCase();
    const n = palabraSecreta.length
    let indice=0;

    for (let i=0; i<n;i++){
        if(palabraSecreta[i]===" "){
            llenarcasilla(i+1, "-");
            casillasllenadas+=1;
        }
    };

    for (let i = 0; i < n; i++){
        if (letra===palabraSecreta[i]){
            llenarcasilla(i+1,letra);
            casillasllenadas+=1;
        } else {
            indice+=1;
        } 
    };

    if (indice===n && vidas>0){
        vidas-=1;
        const k = 7-vidas;
        actualizarahorcado(k);
    };

    if (vidas<=0){
        const fila = document.getElementById("fila-nombre");
        fila.innerHTML = ""; 
        const ahorcado = document.getElementById("imagen-ahorcado");
        ahorcado.src = `fotos/game_over.png`;
        playagain.style.display = "block";
    };
    char.value = "";

};

botonEnviar.onclick = function() {
    const entrada = document.getElementById("intento-usuario");
    const intento = entrada.value.toUpperCase();

    if (intento!==palabraSecreta ) {
        alert("Te equivocaste, intentalo denuevo!");
        if (vidas<0){
            const fila = document.getElementById("fila-nombre");
            fila.innerHTML = ""; 
            const ahorcado = document.getElementById("imagen-ahorcado");
            ahorcado.src = `fotos/game_over.png`;
            playagain.style.display = "block";
        };
        return;
    }

    if (intento === palabraSecreta) {
        alert("¡Encontraste al jugador LEGENDARIO!");
        location.reload();
        return;
    };
    entrada.value = "";
};
    




const botonOscuro = document.getElementById("boton-oscuro");
botonOscuro.onclick = function() {
    document.body.classList.toggle("dark-mode");
};
