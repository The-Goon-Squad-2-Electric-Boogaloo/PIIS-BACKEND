import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from './admin.service';
//import { type } from 'os';
import { types } from 'util';

@Component({
  selector: 'modificarAdmin',
  templateUrl: './modificar.component.html',
  styleUrls: ['./app.component.css']
})


export class ModificarComponent {

  selectedFile: File = null;

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  
  title = 'Modificar';
  angForm: FormGroup;
  angForm2: FormGroup;
  //name:string = '';
  puntos:number;
  newPuntos:number;
  cientificosCargados:boolean;
  mostrarVacio:boolean;
  mostrar1:boolean;
  mostrar2:boolean;
  mostrar3:boolean;
  mostrar4:boolean;
  found:boolean;
  found2:boolean;
  found3:boolean;
  //Estamos simulando que el login funciona bien y devuelve la token
  tokenLogin:string= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI';
  validation:string;
  rutaNuevaGenerada: string;
  rutaNuevaGenerada2: string;
  headers: string[];


      //Parametros para coger la informacion de los centeficos 
      i:number = 0;
      descCientifico:string [] = [];
      nombreCientifico:string[] = [];
      rutaImagen:string [] = [];
      ruta:string = 'https://gameserver.centic.ovh';
      preciosCientificos:number [] = [];
      energiasCientificos:number [] = [];



  constructor(private httpClient:HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private sanitizer: DomSanitizer, private adminService: AdminService) {

    this.createForm();
    this.createForm2();
    
  }

  createForm() {
    this.angForm = this.fb.group({
       //id: ['', Validators.required],
       nombre: ['', Validators.required ],
       descripcion: ['', Validators.required ],
       energia: ['', Validators.required ],
       precio: ['', Validators.required ]

    });
  }

  createForm2() {
    this.angForm2 = this.fb.group({
      user: ['', Validators.required ],
      pass: ['', Validators.required ]

    });
  }

  postLogin(){

    this.found2 = false;
    this.httpClient.post('https://gameserver.centic.ovh/auth/login', 
    {
      user:this.angForm2.get('user').value,
      password:this.angForm2.get('pass').value

    })
    .subscribe(
      (data:any) => {

        console.log(data);

        //if(data.length){

          this.tokenLogin = data.token;
          this.found2 = true;

        //}

      }     
    )


  }

  ////////////////////////////////////////
  mostrarCientifico1(){     
    if(this.cientificosCargados!=true){
    this.getCientificos();
    this.cientificosCargados=true;
  }
    this.mostrar1=true;
    this.mostrar2=false;
    this.mostrar3=false;
    this.mostrar4=false;
    this.mostrarVacio=true;
  }///////////////////////////////////////

  mostrarCientifico2(){
    if(this.cientificosCargados!=true){
      this.getCientificos();
      this.cientificosCargados=true;
    }
    this.mostrar1=false;
    this.mostrar2=true;
    this.mostrar3=false;
    this.mostrar4=false;
    this.mostrarVacio=true;
  }///////////////////////////////////////

  mostrarCientifico3(){
    if(this.cientificosCargados!=true){
      this.getCientificos();
      this.cientificosCargados=true;
    }
    this.mostrar1=false;
    this.mostrar2=false;
    this.mostrar3=true;
    this.mostrar4=false;
    this.mostrarVacio=true;
  }///////////////////////////////////////

  mostrarCientifico4(){
    if(this.cientificosCargados!=true){
      this.getCientificos();
      this.cientificosCargados=true;
    }
    this.mostrar1=false;
    this.mostrar2=false;
    this.mostrar3=false;
    this.mostrar4=true;
    this.mostrarVacio=true;
  }///////////////////////////////////////



  getCientificos(){
        
    this.adminService.getCientificos()
    .subscribe(
      
      resp => {
        
        console.log(resp);
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);
          let i=0;
       for(const data of resp.body){
        
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

  funcionAsincrona(){
    let promise = new Promise((resolve, rejects) => {
      setTimeout(() => {
        
          this.putCientifico();
          resolve();
        
      }, 500);
  
    });
    return promise;
  }
  
  funcionAsincrona2(){
    let promise = new Promise((resolve, rejects) => {
      setTimeout(() => {
        console.log()
  
          location.reload();
          resolve();
        
      }, 600);
  
    });
    return promise;
  }

  
  principalFuncion(){
  
    this.funcionAsincrona().then(() => console.log("ERA UN DOMINGO POR LA TARDE EN LOS COCHES DE CHOQUE"))
    this.funcionAsincrona2().then(() => console.log("PIRIBIRIBIRIBIRIBIRI"))
    this.subirImagen();

  }
  
  
    async subirImagen(){
  
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
  
      //this.httpClient.post(`https://gameserver.centic.ovh/files?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI`, fd)
      
      this.adminService.subirImagen(fd)
      .subscribe(
        (data:any) => {
  
          this.rutaNuevaGenerada=data.file;
          console.log('1');
          console.log(this.rutaNuevaGenerada);
          
        }     
      )
   
    }
  
  
    putCientifico(){
      //if((this.angForm.get('id').value!='') || (this.angForm.get('nombre').value!='') || (this.angForm.get('descripcion').value!='')|| (this.angForm.get('energia').value!='') || (this.angForm.get('precio').value!='') ){
      if((this.angForm.get('nombre').value!='') || (this.angForm.get('descripcion').value!='')|| (this.angForm.get('energia').value!='') || (this.angForm.get('precio').value!='') ){
        if(this.mostrar1==true){
      //if(this.angForm.get('id').value==1){
  
        /*
        this.httpClient.put('https://gameserver.centic.ovh/items/5e90a54c62fbe3777ad14405?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
        {
          
          nombre: this.angForm.get('nombre').value,
          descripcion: this.angForm.get('descripcion').value,
          imagen: this.rutaNuevaGenerada,
          energia: this.angForm.get('energia').value,
          precio: this.angForm.get('precio').value
  
        })
        */
       this.adminService.putCientifico1(this.angForm, this.rutaNuevaGenerada)
        .subscribe()
  
       }
  
      else if(this.mostrar2==true){
        
       /* 
        this.httpClient.put('https://gameserver.centic.ovh/items/5e90a54c62fbe3777ad14406?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
        {
          
          nombre: this.angForm.get('nombre').value,
          descripcion: this.angForm.get('descripcion').value,
          imagen: this.rutaNuevaGenerada,
          energia: this.angForm.get('energia').value,
          precio: this.angForm.get('precio').value
        
        })
        */
       this.adminService.putCientifico2(this.angForm, this.rutaNuevaGenerada)
        .subscribe()

  
      }
      
      else if(this.mostrar3==true){
  
        this.adminService.putCientifico3(this.angForm, this.rutaNuevaGenerada)
        .subscribe()
  
      }
      
      else if(this.mostrar4==true){
  
        /*
        this.httpClient.put('https://gameserver.centic.ovh/items/5e90a54c62fbe3777ad14408?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
        {
          
          nombre: this.angForm.get('nombre').value,
          descripcion: this.angForm.get('descripcion').value,
          imagen: this.rutaNuevaGenerada,
          energia: this.angForm.get('energia').value,
          precio: this.angForm.get('precio').value
        
        })
        */
       this.adminService.putCientifico4(this.angForm, this.rutaNuevaGenerada)
        .subscribe()
  
      }
      
    }
    else{
      console.log('Se deben rellenar todos los campos');
    }
  

      //Acaba put cientifico
      }

 // funcionF(){
   // if(this.mostrar1==true)
    //this.angForm.get('id').value=1;
    //console.log(this.angForm.get('id').value);
//  }

}
