'use strict';
// CIARAMELLA DAIANA 


class Disco {
    // Propiedades:
    nombre;
    autor;
    codigo;
    pistas;

    // Constructor:
    constructor() {
        this.nombre = '';
        this.autor= '';
        this.codigo= 0;
        this.pistas = [];
        console.info('Nuevo disco creado');
    }
    // Métodos:
    ingresarNombre() {
        return this.solicitarAtributo("nombre",'texto','Ingrese nombre del disco');
    }

    ingresarAutor() {
        return this.solicitarAtributo("autor",'texto','Ingrese nombre del autor del disco');
    }

    ingresarCodigo(discos) {
        return this.solicitarAtributo("codigo",'numero','Ingrese codigo del disco',discos);
    }
    
    guardarPista(pista) {
        this.pistas.push(pista);
    }

    solicitarAtributo(atributo,tipo,mensaje,discos){
        let siguientePaso=true;
        let valorCorrecto=false;
        let valor;
        do {
            valor = prompt(mensaje);
            if(valor==null){
                siguientePaso=!confirm("Deseas salir de la carga?");
            }else{
                valorCorrecto=this.validarFormato(tipo,valor,discos);
                if(!valorCorrecto){
                    alert('El dato ingresado es incorrecto, ingreselo nuevamente');
                }else{
                    this[atributo]=valor;
                }
            }
           
        } while (!valorCorrecto && siguientePaso);
        
        return siguientePaso;
    }

    validarFormato(tipo,valor,discos){
        let valorCorrecto=true;
        switch(tipo){
            case "texto":
                valorCorrecto=isNaN(valor);
                break;
            case "numero":
                valorCorrecto=(
                        ((!isNaN(valor)) && valor >= 1 && valor <= 999)
                        && this.evitarRepeticiones(valor,discos)
                    );
                break;
        }
        return valorCorrecto;
    }
    evitarRepeticiones(codigo,discos){
        let listaFiltrada = discos.filter((disco)=>{
            return disco.codigo==codigo
        });
        return listaFiltrada.length==0;
    }
    calcularDuracion(){
        let duracion=0;
        for (let pista of this.pistas) {
            duracion+=parseInt(pista.duracion);
        }
        return duracion;
    }
    calcularPromedioDuracion(){
        let promedio=0;
        if(this.pistas.length>0){
            promedio=this.calcularDuracion()/this.pistas.length;
        }
        return promedio;
    }
    pistaConMayorDuracion(){
        let pistaMasLarga;

        for (let pistaActual of this.pistas) {
            if(pistaMasLarga==null || pistaMasLarga.duracion<pistaActual.duracion){
                pistaMasLarga=pistaActual;
            }
        }

        return pistaMasLarga!=null?`${pistaMasLarga.nombre} (${pistaMasLarga.duracion})`:'no hay pistas';
    }
    armar(codigo) {
        // Armo la info de cada disco:
        let d = `
            <p>Disco: ${this.nombre} </p>
            <p>Autor: ${this.autor} </p>
            <p>Codigo: ${this.codigo} </p>
            <p>Pistas:${this.armarPistas()}</p>
            <p>Cantidad de pistas: ${this.pistas.length}</p>
            <p>Duración total del disco:  <span ${codigo==this.codigo?" style='font-weight: bold;'":""}>${this.calcularDuracion()}<span></p>
            <p>Promedio de duración del disco: ${this.calcularPromedioDuracion()}</p>
            <p>Pista con mayor duración del disco: ${this.pistaConMayorDuracion()}</p>
        `;
        return d;
    }
    armarPistas(){
        // solicitar la información de cada pista:
        let p = "";
        // Recorro cada una de las pistas:
        for (let pista of this.pistas) {
            p += pista.armar();
        }
        return `<ul>${p}</ul>`;
    }
}

class Pista {
    // Propiedades:
    nombre;
    duracion;

    // Constructor:
    constructor() {
        this.nombre = '';
        this.duracion = 0;
        console.info('Nueva pista creada');
    }

    // Métodos:
    ingresarNombre() {
        return this.solicitarAtributo("nombre",'texto','Ingrese nombre de la pista');
    }

    ingresarDuracion() {
        return this.solicitarAtributo("duracion",'numero','Ingrese duracion de la pista en segundos');
    }

    solicitarAtributo(atributo,tipo,mensaje){
        let siguientePaso=true;
        let valorCorrecto=false;
        let valor;
        do {
            valor = prompt(mensaje);
            if(valor==null){
                siguientePaso=!confirm("Deseas salir de la carga?");
            }else{
                valorCorrecto=this.validarFormato(tipo,valor);
                if(!valorCorrecto){
                    alert('El dato ingresado es incorrecto, ingreselo nuevamente');
                }else{
                    this[atributo]=valor;
                }
            }
           
        } while (!valorCorrecto && siguientePaso);
        
        return siguientePaso;
    }

    validarFormato(tipo,valor){
        let valorCorrecto=true;
        switch(tipo){
            case "texto":
                valorCorrecto=isNaN(valor);
                break;
            case "numero":
                valorCorrecto=((!isNaN(valor)) && valor >= 0 && valor <= 7200);
                break;
        }
        return valorCorrecto;
    }


    leerDuracion() {
        return this.duracion;
    }

    armar() {
        let m = `<li>Nombre: ${this.nombre} - Duracion: <span style="color: ${this.duracion > 180? 'red' : 'black'}" >${this.duracion}</span></li>`;
        return m;
    }
}



// Todos los discos:
let discos = [];

// Funciones:
const Cargar = () => {
    // Variables:
    let disco, pista;

    // Creo el disco:
    disco = new Disco();

    let siguiente = disco.ingresarNombre();//Pido el nombre del disco
    if(siguiente) siguiente = disco.ingresarAutor();//Pido el nombre del autor
    if(siguiente) siguiente = disco.ingresarCodigo(discos);//Pido el código del disco
    if(siguiente){
        // Pistas:
        do {
            // Creo la pista:
            pista = new Pista();
            
            siguiente = pista.ingresarNombre();//Pido nombre de la pista
            if(siguiente) siguiente =pista.ingresarDuracion();//Pido su duración

            // La guardo en el disco:
            if(siguiente) disco.guardarPista(pista);
        } while (siguiente && confirm('¿Quiere ingresar otra pista?'))
    }

    // Guardo al disco en el array:
    if(siguiente){
        discos.push(disco);
        document.getElementById('info').innerHTML = cantidadDeDiscos();
    };
};
const cantidadDeDiscos = () => {
    return `<h2>Cantidad de discos: ${discos.length}</h2>`;
};
const buscarDiscoMasLargo = (lista) => {
    let discoMasLargo;
    for (let disco of lista) {
        if(discoMasLargo==null || disco.calcularDuracion()>discoMasLargo.calcularDuracion()){
            discoMasLargo=disco;
        }
    }
    return discoMasLargo;
}
const Mostrar = () => {
    // Variable que guarda el html generado:
    let html = cantidadDeDiscos();// Muestro el total de discos:
    // Recorro a los discos:
   let discoMasLargo = buscarDiscoMasLargo(discos);

    for (let disco of discos) {
        // Muestro cada alumno:
        html += disco.armar(discoMasLargo.codigo);
        html += '<hr />';
    }
    document.getElementById('info').innerHTML = html;
};
