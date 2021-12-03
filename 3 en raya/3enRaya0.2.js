
//array con las casillas
let c = ["*","*","*","*","*","*","*","*","*"];

//matriz con las casillas que hacen el 3 en raya
let linea = [["c1", "c2", "c3"], ["c4", "c5", "c6"], ["c7", "c8", "c9"],
            ["c1", "c4", "c7"], ["c2", "c5", "c8"], ["c3", "c6", "c9"],
            ["c1", "c5", "c9"], ["c3", "c5", "c7"]];

//array con los numeros de las casillas
let numCasillas = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"];

//variables varias
let casilla, player, cPlayer, winner, tecla, red = 0;

//booleanas
let input1 = false, input2 = false, inside1 = false, inside2 = false;
let playerTurn = true, playerX = false, playerO = false;

//array con las fichas
let fichas = ["x","o"];
 
    //mostrar la cuadricula con el comando window.onload que lo que hace es cargar toda la pagina
    window.onload = cuadricula; //mejora de mi padre para mejorar el codigo y no repetir

//funcion para el boton submit
function submit() {
let tmpX = "", tmpO = "";

        //guarda el interior de los inputs en dos variables
        // mira si esta seleccionada la "x" o la "o"
        player = (document.getElementById("fichaX").checked)? "x" : "o";
        // añadir una "c", solo se pregunta por el numero
        cPlayer = "c" + document.getElementById("casillaIn").value;

    //un if/else para comprobar que el primer input es correcto
    // siempre sera una "x" o una "o"
    if (player === "x" || player === "o") {

        //if para definir los turnos dependiendo de si playerTurn es true o false + el player, para poder avanzar en el juego
        
        // con esto se pone checked, sin tener que seleccionar por turnos
        // playerTurn = true  -> "x"
        // playerTurn = false -> "o"
        // playerX y playerO, para mantener la compatibilidad
        playerX = (playerTurn === true  && player === "x") ? true : false;
        playerO = (playerTurn === false && player === "o") ? true : false;
        document.getElementById("fichaX").checked = !playerTurn;
        document.getElementById("fichaO").checked = playerTurn;
        playerTurn  = !playerTurn;

        document.getElementById("mensajeInputF").innerHTML = "<b>&#10003;</b> - Input valid";     
        input1 = true;
    } else {
        document.getElementById("mensajeInputF").innerHTML = "<b>&#10007;</b> - Input not valid";
        input1 = false;
    } 
     
    //un if/else para comprobar que el segundo input es correcto   
    if (cPlayer == "c1" || cPlayer == "c2" || cPlayer == "c3" || cPlayer == "c4" || cPlayer == "c5" || cPlayer == "c6" || cPlayer == "c7" || cPlayer == "c8" || cPlayer == "c9") {
        document.getElementById("mensajeInputC").innerHTML = "<b>&#10003;</b> - Input valid";
        input2 = true;
    } else {
        document.getElementById("mensajeInputC").innerHTML = "<b>&#10007;</b> - Input not valid"; 
        input2 = false;
    } 

        //un if/else para q cuando los dos inputs son correctos, pueda iniciar el juego
        if (input1 === true && input2 === true) {
            input1 = false;
            input2 = false;
            start();
        }
            console.log(player);
            console.log(cPlayer);
}

//funcion para iniciar el juego
function start() { 

        //bucle for para recorrer el array de fichas
        for (turnos=0; turnos<=fichas.length; turnos++) {
        console.log(turnos);
            //if que complementa a otro if de turnos, si playerX o playerO es true, inicia el codigo
            if (playerX === true) {          
                //if/else que comprueba si lo que ha seleccionado el usuario es igual al interior del array (x, o)
                if (fichas[turnos] === player) { //x es igual a x
                    document.getElementById("mensajeGanador").innerHTML = "";
                    inside1 = true;
                    playerX = false;
                    playerTurn = false; 
                } 
            } else if (playerO === true) {
                if (fichas[turnos] === player) {
                    document.getElementById("mensajeGanador").innerHTML = "";
                    inside1 = true; 
                    playerO = false;
                    playerTurn = true; 
                } 
            } else {
                //if/else para definir que ocurre cuando playerX o playerO son false
                //entendiendo que playerTurn = true, es igual a dejar paso al player 1 (x) y playerTurn = false, es igual a dejar paso al player 2 (o)
                if (playerTurn === true) {
                    document.getElementById("mensajeGanador").innerHTML = "<b>&#10007;</b> - Le toca al PLAYER 1 (X)";
                    break;
                } else {
                    document.getElementById("mensajeGanador").innerHTML = "<b>&#10007;</b> - Le toca al PLAYER 2 (O)";
                    break;
                }
            }
                //if que inicia la funcion para asignar la ficha en la casilla si la booleana es true
                if (inside1 === true) {
                    asignacion();
                }
                //if que comprueba si los dos inside son true, puede iniciar el check y mostrar la cuadricula
                if (inside1 === true && inside2 === true) {
                    inside1 = false;
                    inside2 = false;
                    check();       
                        //if que comprueba q winner contenga x/o para finalizar el bucle for global, deshabilitar el boton, mostrar la cuadricula y el mensaje
                        if (winner === fichas[turnos]) {
                            document.getElementById("submit").style.cursor = "not-allowed";
                            document.getElementById("submit").onclick = "undefined";
                            cuadricula();
                            mensajeGanador();
                            window.onkeypress=enterEnd;
                            break;
                        }
                    //break que para el bucle for de las casillas para mostrar el avance
                    break;
                }
        }        
}

//funcion para asignarle la ficha en la casilla correspondiente
function asignacion() {

    //bucle for que recorre el array de las casillas
    for (i=0; i<=numCasillas.length; i++) {
        console.log(i);
                    //if que comprueba si la casilla del usuario es la misma que la del array
                    if (cPlayer === numCasillas[i]) {
                        //if/else que comprueba que el interior de la casilla del array es un *
                        if (c[i] === "*") {
                            //para poder asignarle la ficha que ha seleccionado el usuario
                            c[i] = player;
                            inside2 = true;
                            console.log("c1: "+c[0]+", c2: "+c[1]+", c3: "+c[2]+", c4: "+c[3]+", c5: "+c[4]+", c6: "+c[5]+", c7: "+c[6]+", c8: "+c[7]+", c9: "+c[8]);       
                        //si ya contiene esa casilla, las fichas x/o entonces salta una alerta informando de que ya se ha usado y que introduzca otra casilla
                        } else if (c[i] === fichas[turnos]) {
                            alert("Esa casilla ya se ha usado");
                            cPlayer = prompt("Selecciona otra casilla");
                            inside2 = true;                           
                        }    
                    }
    }
}


//funcion que hace el check de 3 casillas en linea
function check() {
        cuadricula();
    for (k = 0; k < 9; k++) { //for para recorrer el array de las casillas y ponerlas en gris
            for(e = 0; e < 3; e++){ //for para recorrer el array dentro de la matriz y ponerlas en rojo
                //un if/else para q cuando los dos insides son correctos, pueda iniciar el check
                if (c[1] == fichas[turnos]) {
                    if (c[0] == c[1] && c[1] == c[2]) { //c1 == c2 && c2 == c3
                        winner = c[1]; //c2
                        document.getElementById(numCasillas[k]).style.color = "#E5E5E5"; //pone en gris todas las casillas
                        document.getElementById(linea[0][e]).style.color = "red";   //pone en rojo las casillas que hacen el 3 en raya, con ayuda de una matriz
                    }
                } else if (c[3] == fichas[turnos]) {                                            
                    if (c[3] == c[4] && c[4] == c[5]) { //c4 == c5 && c5 == c6
                        winner = c[3]; //c4
                        document.getElementById(numCasillas[k]).style.color = "#E5E5E5";
                        document.getElementById(linea[1][e]).style.color = "red";
                    }
                } else if (c[7] == fichas[turnos]) {
                    if (c[6] == c[7] && c[7] == c[8]) { //c7 == c8 && c8 == c9 
                        winner = c[7]; //c8
                        document.getElementById(numCasillas[k]).style.color = "#E5E5E5";
                        document.getElementById(linea[2][e]).style.color = "red";
                    }
                } 
                if (c[0] == fichas[turnos]) {          
                       //commprobacion vertical
                    if (c[0] == c[3] && c[3] == c[6]) { //c1 == c4 && c4 == c7
                        winner = c[0]; //c1
                        document.getElementById(numCasillas[k]).style.color = "#E5E5E5";
                        document.getElementById(linea[3][e]).style.color = "red";
                    }
                } else if (c[4] == fichas[turnos]) {     
                    if (c[1] == c[4] && c[4] == c[7]) { //c2 == c5 && c5 == c8
                        winner = c[4]; //c5
                        document.getElementById(numCasillas[k]).style.color = "#E5E5E5";
                        document.getElementById(linea[4][e]).style.color = "red";
                    }            
                } else if (c[2] == fichas[turnos]) {
                    if (c[2] == c[5] && c[5] == c[8]) { //c3 == c6 && c6 == c9 
                        winner = c[2]; //c3
                        document.getElementById(numCasillas[k]).style.color = "#E5E5E5";
                        document.getElementById(linea[5][e]).style.color = "red";
                    }        
                }
                if (c[8] == fichas[turnos]) {
                        //commprobacion diagonal
                    if (c[0] == c[4] && c[4] == c[8]) { //c1 == c5 && c5 == c9
                        winner = c[8]; //c9
                        document.getElementById(numCasillas[k]).style.color = "#E5E5E5";
                        document.getElementById(linea[6][e]).style.color = "red";
                    }
                } else if (c[6] == fichas[turnos]) {                                           
                    if (c[2] == c[4] && c[4] == c[6]) { //c3 == c5 && c5 == c7
                        winner = c[6]; //c7
                        document.getElementById(numCasillas[k]).style.color = "#E5E5E5";
                        document.getElementById(linea[7][e]).style.color = "red";
                    }          
                }
            }
    }    
                    //si todas las casillas estan ocupadas con las fichas x/o entonces es empate y se deshabilita el boton
                    if (c[0] !== "*" && c[1] !== "*" && c[2] !== "*" && c[3] !== "*" && c[4] !== "*" && c[5] !== "*" && c[6] !== "*" && c[7] !== "*" && c[8] !== "*") {
                        document.getElementById("mensajeGanador").innerHTML = "&#11162; DRAW &#11160;";
                        document.getElementById("submit").style.cursor = "not-allowed";
                        document.getElementById("submit").onclick = "undefined";
                        window.onkeypress=enterEnd;
                    }
}               

//funcion para resetear el algoritmo
function restart() {
    let restart = window.location.reload(true); 
}

//funcion que muestra el contenido de la cuadricula
function cuadricula() {
    for (h = 0; h < 9; h++) {
        document.getElementById(numCasillas[h]).innerHTML = c[h]; 
    }
}

//funcion con el mensaje con el ganador
function mensajeGanador() {

        if (winner === "x") {
            document.getElementById("mensajeGanador").innerHTML = "&#11162; Player 1 WINS &#11160;";   
        } else if (winner ==="o") {
            document.getElementById("mensajeGanador").innerHTML = "&#11162; Player 2 WINS &#11160;";
        }
}   

//funcion para que al pulsar "enter", haga la funcion submit() que seria con el boton "submit"
function enter() {
    //una variable con el evento y numero de tecla
    tecla = event.keyCode; 
        //if/else q comprueba q si tecla es igual a 13 (enter), inicia la funcion submit
        if (tecla == 13) {
            submit();
        }
}

//funcion para que al pulsar "enter", haga la funcion restart() que seria con el boton "restart"
function enterEnd() {
    //una variable con el evento y numero de tecla
    tecla = event.keyCode; 
        //if/else q comprueba q si tecla es igual a 13 (enter), inicia la funcion submit
        if (tecla == 13) {
            restart();
        }
}

window.onkeypress=enter;


   

    






