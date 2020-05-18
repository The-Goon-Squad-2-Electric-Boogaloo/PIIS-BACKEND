import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from '../admin.service';
//import { type } from 'os';
import { types } from 'util';

@Component({
  selector: 'modificarAdmin',
  templateUrl: './modificar.component.html',
  styleUrls: ['../app.component.css']
})


export class ModificarComponent {

  selectedFile: File = null;

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }


  title = 'Modificar';
  angForm: FormGroup;
  angForm2: FormGroup;
  //name:string = '';
  puntos: number;
  newPuntos: number;
  cientificosCargados: boolean;
  mostrarVacio: boolean;
  nombreVacio: boolean;
  descripcionVacio: boolean;
  energiaVacio: boolean;
  precioVacio: boolean;
  cientificoVacio: boolean;
  mostrar1: boolean = false;
  mostrar2: boolean = false;
  mostrar3: boolean = false;
  mostrar4: boolean = false;
  estamosConectados: string;
  //Estamos simulando que el login funciona bien y devuelve la token
  tokenLogin: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI';
  validation: string;
  rutaNuevaGenerada: string;
  rutaNuevaGenerada2: string;
  headers: string[];


  //Parametros para coger la informacion de los centeficos 
  i: number = 0;
  descCientifico: string[] = [];
  nombreCientifico: string[] = [];
  rutaImagen: string[] = [];
  ruta: string = 'https://gameserver.centic.ovh';
  preciosCientificos: number[] = [];
  energiasCientificos: number[] = [];



  constructor(private httpClient: HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private sanitizer: DomSanitizer, private adminService: AdminService) {

    this.createForm();

  }

  mostrarpantalla() {
    console.log("mostrando modificar html");
  }
  //Formulario localizado en el html donde introduciremos la nueva informacion de los campos
  createForm() {
    this.angForm = this.fb.group({
      //id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      energia: ['', Validators.required],
      precio: ['', Validators.required]

    });
  }


  //Metodo que muestra un desplegable con el cientifico almacenado en la posicion 0 del array
  mostrarCientifico1() {
    if (this.cientificosCargados != true) {
      this.getCientificos();
      this.cientificosCargados = true;
    }
    this.mostrar1 = true;
    this.mostrar2 = false;
    this.mostrar3 = false;
    this.mostrar4 = false;
    this.mostrarVacio = true;
    this.cientificoVacio = false;
  }

  //Metodo que muestra un desplegable con el cientifico almacenado en la posicion 1 del array
  mostrarCientifico2() {
    if (this.cientificosCargados != true) {
      this.getCientificos();
      this.cientificosCargados = true;
    }
    this.mostrar1 = false;
    this.mostrar2 = true;
    this.mostrar3 = false;
    this.mostrar4 = false;
    this.mostrarVacio = true;
    this.cientificoVacio = false;
  }

  //Metodo que muestra un desplegable con el cientifico almacenado en la posicion 2 del array
  mostrarCientifico3() {
    if (this.cientificosCargados != true) {
      this.getCientificos();
      this.cientificosCargados = true;
    }
    this.mostrar1 = false;
    this.mostrar2 = false;
    this.mostrar3 = true;
    this.mostrar4 = false;
    this.mostrarVacio = true;
    this.cientificoVacio = false;
  }

  //Metodo que muestra un desplegable con el cientifico almacenado en la posicion 3 del array
  mostrarCientifico4() {
    if (this.cientificosCargados != true) {
      this.getCientificos();
      this.cientificosCargados = true;
    }
    this.mostrar1 = false;
    this.mostrar2 = false;
    this.mostrar3 = false;
    this.mostrar4 = true;
    this.mostrarVacio = true;
    this.cientificoVacio = false;
  }


  //Metodo que guarda los cientificos guardados en el servidor en un array para su posterior uso en el programa
  getCientificos() {

    this.adminService.getCientificos()
      .subscribe(

        resp => {

          console.log(resp);
          const keys = resp.headers.keys();
          this.headers = keys.map(key =>
            `${key}: ${resp.headers.get(key)}`);
          let i = 0;
          for (const data of resp.body) {

            this.nombreCientifico[i] = data.nombre;
            this.descCientifico[i] = data.descripcion;
            this.rutaImagen[i] = this.ruta.concat(data.imagen).toString();
            this.energiasCientificos[i] = data.energia;
            this.preciosCientificos[i] = data.precio;
            i++;
          }
        }
      )
    //
  }

  //Funciones asincronas que permiten ejecutar en orden subirImagen > putCientifico > refrescar pagina
  //Con esto conseguimos que putCientifico pueda usar un valor que subirImagen devuelve
  funcionAsincrona() {
    let promise = new Promise((resolve, rejects) => {
      setTimeout(() => {

        this.putCientifico(); //Modificar cientifico
        resolve();

      }, 500);

    });
    return promise;
  }

  funcionAsincrona2() {
    let promise = new Promise((resolve, rejects) => {
      setTimeout(() => {
        console.log()

        location.reload(); //Refresca la pagina
        resolve();

      }, 600);

    });
    return promise;
  }


  cerrarSesion() {

    //Peticion para indicar que no nos saltaremos el login la proxima vez que se actualice la pagina
    this.adminService.enviarDesconectado()
      .subscribe()
    location.reload(); //Refresca la pagina
  }


  principalFuncion() {

    this.funcionAsincrona().then(() => console.log("Se ejecuta la segunda")) //Modificar cientifico
    this.subirImagen(); //Se ejecuta la primera

  }


  async subirImagen() {

    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);


    this.adminService.subirImagen(fd)
      .subscribe(
        (data: any) => {

          this.rutaNuevaGenerada = data.file;
          console.log('1');
          console.log(this.rutaNuevaGenerada);

        }
      )

  }


  putCientifico() {

    if (this.angForm.get('nombre').value != '')
      this.nombreVacio = false;
    if (this.angForm.get('descripcion').value != '')
      this.descripcionVacio = false;
    if (this.angForm.get('energia').value != '')
      this.energiaVacio = false;
    if (this.angForm.get('precio').value != '')
      this.precioVacio = false;

    if ((this.mostrar1 == false) && (this.mostrar2 == false) && (this.mostrar3 == false) && (this.mostrar4 == false)) {
      console.log('No se ha seleccionado un cientifico');
      this.cientificoVacio = true;
    }

    //Comprobacion de que los campos no estan vacios
    else if ((this.angForm.get('nombre').value != '') && (this.angForm.get('descripcion').value != '') && (this.angForm.get('energia').value != '') && (this.angForm.get('precio').value != '')) {

      //Si el cientifico 1 esta seleccionado lo modificamos
      if (this.mostrar1 == true) {

        //Peticion que permite saltarnos el login al actualizar la pagina
        this.adminService.enviarConectado()
          .subscribe()
        //Modificamos los campos
        this.adminService.putCientifico1(this.angForm, this.rutaNuevaGenerada)
          .subscribe()
      }

      //Si el cientifico 2 esta seleccionado lo modificamos
      else if (this.mostrar2 == true) {

        //Peticion que permite saltarnos el login al actualizar la pagina
        this.adminService.enviarConectado()
          .subscribe()
        //Modificamos los campos
        this.adminService.putCientifico2(this.angForm, this.rutaNuevaGenerada)
          .subscribe()
      }

      //Si el cientifico 3 esta seleccionado lo modificamos
      else if (this.mostrar3 == true) {

        //Peticion que permite saltarnos el login al actualizar la pagina
        this.adminService.enviarConectado()
          .subscribe()
        //Modificamos los campos
        this.adminService.putCientifico3(this.angForm, this.rutaNuevaGenerada)
          .subscribe()
      }

      //Si el cientifico 4 esta seleccionado lo modificamos
      else if (this.mostrar4 == true) {

        //Peticion que permite saltarnos el login al actualizar la pagina
        this.adminService.enviarConectado()
          .subscribe()
        //Modificamos los campos
        this.adminService.putCientifico4(this.angForm, this.rutaNuevaGenerada)
          .subscribe()
      }
      this.funcionAsincrona2().then(() => console.log("Se ejecuta la tercera")) //Refresca la pagina despues de modificar cientifico
    }
    else {
      //Si alguno de los campos esta vacio saltara un texto indicandolo
      console.log('Se deben rellenar todos los campos');

      if (this.angForm.get('nombre').value == '')
        this.nombreVacio = true;
      if (this.angForm.get('descripcion').value == '')
        this.descripcionVacio = true;
      if (this.angForm.get('energia').value == '')
        this.energiaVacio = true;
      if (this.angForm.get('precio').value == '')
        this.precioVacio = true;

    }

    //Acaba put cientifico
  }


}
