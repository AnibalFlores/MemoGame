// Ejercicio de Práctica Memo-Game
// UTN Paraná TSP Laboratorio 4
// Alumno: Flores Aníbal H.
// 25-08-2018

document.addEventListener("DOMContentLoaded", function () { repartirfichas(); });

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}



// Función para obtener elementos
var el = function (elemento) {
    if (elemento.charAt(0) === "#") { // Si paso un ID...
        return document.querySelector(elemento); // ... devuelvo un elemento único
    }

    return document.querySelectorAll(elemento); // Sino, devuelvo un nodelist
};

// Variables
var cartas = [
    'chrome.svg',
    'facebook.svg',
    'firefox.svg',
    'google-icon.svg',
    'html-5.svg',
    'instagram-icon.svg',
    'internetexplorer.svg',
    'javascript.svg',
    'opera.svg',
    'twitter.svg',
    'chrome.svg',
    'facebook.svg',
    'firefox.svg',
    'google-icon.svg',
    'html-5.svg',
    'instagram-icon.svg',
    'internetexplorer.svg',
    'javascript.svg',
    'opera.svg',
    'twitter.svg'];

var tanteador = el("#intentos"), // Etiqueta donde se muestra total intentos
    carta1 = "", // id carta 1
    carta2 = "", // id carta 2
    valor1 = "", // valor primera carta elegida
    valor2 = "", // valor segunda carta elegida
    intentos = 0, // Contador de intentos
    limite = 30, // limite intentos
    aciertos = 0,
    destapadas = 0;

var repartirfichas = function () {
    shuffle(cartas);
    board = document.querySelector("#tablero");
    console.log("Repartiendo las fichas");
    for (i = 0; i < 20; i++) {
        
        card = document.createElement("div");
        card.classList.add("memo-card");
        card.setAttribute("data-id", i.toString());
        card.setAttribute("data-value", cartas[i]);
        card.setAttribute("onclick", "clic(this)");
        elem = document.createElement("img");
        elem.src = 'images/ask.svg';
        elem.setAttribute("id", "ask");
        elem.setAttribute("class", "opaco");
        card.appendChild(elem);
        elem = document.createElement("img");
        elem.src = 'images/' + cartas[i];
        elem.setAttribute("id", "card");
        elem.setAttribute("class", "oculto");
        card.appendChild(elem);
        board.appendChild(card);
    }
}

var muestra = function (id) {
    ////Recorremos todo el board y mostramos solo la carta con el id correspondiente
    var x = document.getElementsByClassName("memo-card");// x obtiene la coleccion de memo-cards
    var i;//indice para recorrer el arreglo
    for (i = 0; i < x.length; i++) {
        if (x[i].dataset.id == id) {//es la card que quiero?
            x[i].querySelector("#card").className = "opaco";//hago visible la carta
            x[i].querySelector("#ask").className = "oculto";//y oculto el signo de pregunta 
        }

    }
};

var oculta = function (id) {
    //Recorremos todo el board y ocultamos solo la carta con el id correspondiente
    var x = document.getElementsByClassName("memo-card");
    var i;
    for (i = 0; i < x.length; i++) {
        if (x[i].dataset.id == id) {
            x[i].querySelector("#card").className = "oculto";
            x[i].querySelector("#ask").className = "opaco";
        }

    }

};

var quita_clic = function (id) {
    //Recorremos todo el board y fijamos solo la carta con el id correspondiente
    var x = document.getElementsByClassName("memo-card");
    var i;
    for (i = 0; i < x.length; i++) {
        if (x[i].dataset.id == id) {
            x[i].querySelector("#card").className = "opaco";
            x[i].querySelector("#ask").className = "oculto";
            x[i].onclick = null;
        }

    }

};

var tantos = function () {
    //tanteador.innerHTML = "C1: " + carta1 + " V1: " + valor1 + " C2: " + carta2 + " V2: " + valor2 + " D:" + destapadas + " I: " + intentos;
    tanteador.innerHTML = " Intentos restantes: " + (limite - intentos) + " Aciertos: " + aciertos + "/10";
};

var clic = function (p) {
    if (destapadas < 2) {
        if (destapadas == 0 && p.dataset.id != carta1 && p.dataset.id != carta2) {
            valor1 = p.dataset.value;
            carta1 = p.dataset.id;
            destapadas = 1;
            muestra(carta1);
        } else {
            if (destapadas == 1 && p.dataset.id != carta1 && p.dataset.id != carta2) {
                valor2 = p.dataset.value;
                carta2 = p.dataset.id;
                destapadas = 2;
                intentos++;//considero un intento a un par de cartas y lo cuento 
                if (limite == intentos) { alert("Lo siento: límite de intentos alcanzado"); reiniciar(); }
                muestra(carta2);
            }
            tantos();//mostramos intentos y aciertos
        }


        if (valor1 == valor2 && valor1 != "" && carta1 != carta2 && carta1 != "" && carta2 != "") {
            clearTimeout(t);
            quita_clic(carta1);
            quita_clic(carta2);
            valor1 = "";
            valor2 = "";
            carta1 = "";
            carta2 = "";
            destapadas = 0;
            aciertos++;
            tantos();
            if (aciertos == 10) { alert("Felicitaciones has ganado!"); reiniciar(); }
        }

        if (destapadas > 0) {
            t = setTimeout(function () {
                oculta(carta1);
                carta1 = "";
                if (carta2 != "") { oculta(carta2); carta2 = ""; }
                destapadas = 0;
                clearTimeout(t);
            }, 2500);
        }

    }
};

var reiniciar = function () {
    window.location = window.location;
};

