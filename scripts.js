

// Función para obtener elementos
var el = function (element) {
    if (element.charAt(0) === "#") { // Si me pasan un ID...
        return document.querySelector(element); // ... devuelve un elemento único
    }

    return document.querySelectorAll(element); // Sino, devuelve un nodelist
};

// Variables
var tanteador = el("#intentos"), // Etiqueta donde se muestra total intentos
    carta1 = "", // id carta 1
    carta2 = "", // id carta 2
    valor1 = "", // valor primera carta elegida
    valor2 = "", // valor segunda carta elegida
    intentos = 0, // Contador de intentos
    limite = 20, // limite intentos
    aciertos = 0;
destapadas = 0;

var cambia = function (id) {

    var x = document.getElementsByClassName("memo-card");
    var i;
    for (i = 0; i < x.length; i++) {
        if (x[i].dataset.id == id) {
            x[i].querySelector("#card").className = "opaco";
            x[i].querySelector("#ask").className = "oculto";
        }

    }
};

var oculta = function (id) {
    //alert("estoy ocultando");
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
    //alert("estoy quitando clic");
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
    //tanteador.innerHTML = "C1: " + carta1 + " V1: " + valor1 + " C2: " + carta2 + " V2: " + valor2 + " D:" + destapadas + " i: " + intentos;
    tanteador.innerHTML = " Total de intentos: " + intentos;
};

var mostrar = function (p) {
    if (destapadas < 2) {
        if (destapadas == 0 && p.dataset.id != carta1 && p.dataset.id != carta2) {
            valor1 = p.dataset.value;
            carta1 = p.dataset.id;
            destapadas = 1;
            cambia(carta1);
            tantos();
        } else {
            if (destapadas == 1 && p.dataset.id != carta1 && p.dataset.id != carta2) {
                valor2 = p.dataset.value;
                carta2 = p.dataset.id;
                destapadas = 2;
                intentos++;
                if (limite == intentos) { alert("Límite de intentos alcanzado"); reiniciar(); }
                cambia(carta2);
                tantos();
            }
        }


        if (valor1 == valor2 && valor1 != "" && carta1 != carta2 && carta1 != "" && carta2 != "") {
            //alert('asertado con: ' + p.dataset.value);
            clearTimeout(t);
            quita_clic(carta1);
            quita_clic(carta2);
            valor1 = "";
            valor2 = "";
            carta1 = "";
            carta2 = "";
            destapadas = 0;
            aciertos++;
            if (aciertos == 10) { alert("Felicitaciones has ganado!"); reiniciar(); }
        }

        if (destapadas > 0) {
            t = setTimeout(function () {
                oculta(carta1);
                carta1 = "";
                if (carta2 != "") { oculta(carta2); carta2 = ""; }
                destapadas = 0;
                tantos();
                clearTimeout(t);
            }, 2000);
        }

    }
};

var reiniciar = function () {
    window.location = window.location;
};

