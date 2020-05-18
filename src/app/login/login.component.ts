import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from '../admin.service';

declare function openForm(): any;
declare function closeForm(): any;

@Component({
  selector: 'loginAdmin',  //Esto no es el problema
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent {
  
  title = 'Admin';
  angForm2: FormGroup;
  //name:string = '';
  puntos:number;
  newPuntos:number;
  esconder:boolean;
  usuarioVacio:boolean;
  contrasenaVacia:boolean;
  found2:boolean;
  conectado:string;
  //Estamos simulando que el login funciona bien y devuelve la token
  tokenLogin:string= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI';
  validation:string;
  headers: string[];



  constructor(private httpClient:HttpClient, private fb: FormBuilder, private ruta: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private adminService: AdminService) {

    this.createForm2();
    
  }

  //Cuando se inicia la aplicacion cargamos el valor estamosConectados, este indica si nos debemos saltar el login o no
  ngOnInit(){
    this.getConectado();
  }


  //Metodo que se encarga de cargar el valor estamosConectados
  getConectado(){

    this.adminService.getCientificos()
    .subscribe(
      
      resp => {
        
        console.log(resp);
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);
          let i=0;

          //El valor se encuentra en un campo del cientifico 1 en vez de crear un item nuevo solo con ese campo
          //Esto se ha hecho porque simplifica el codigo reduciendo una iteracion del bucle ademas de reutilizar la peticion getCientificos
          for(const data of resp.body){
        
            if(i==0){
            this.conectado=data.estamosConectados;
            
              //Cuando el campo esta a "no" no permitira saltarse el login cuando actualicemos la pagina
              if(this.conectado=="si"){
                this.abrirPagina('Modificar');
              }

            }//
            
            i++;
          }     
       
      }     
    )

  }

  //Metodo que se encarga de volcar en el html el componente indicado por parametro
  abrirPagina(nombrePagina:string):void{
    this.ruta.navigate([`${nombrePagina}`]);
    //Ocultamos la seccion del login
    this.found2=true;
    this.esconder=true;
  }

  //Formulario localizado en el html donde introduciremos el usuario y la contrasena
  createForm2() {
    this.angForm2 = this.fb.group({
      user: ['', Validators.required ],
      pass: ['', Validators.required ]

    });
  }


  //Peticion que se encarga de logearnos en el servidor
  postLogin(){

    this.found2 = false;
    if(this.angForm2.get('user').value == "ucam2")
    this.usuarioVacio=false;
    if(this.angForm2.get('pass').value == "p27QRsc")
    this.contrasenaVacia=false;

    //Si el usuario y la contrasena son los indicados la peticion se realiza y pedimos el token del servidor
    if((this.angForm2.get('user').value == "ucam2")&&(this.angForm2.get('pass').value == "p27QRsc")){
    this.httpClient.post('https://gameserver.centic.ovh/auth/login', 
    {
      user:this.angForm2.get('user').value,
      password:this.angForm2.get('pass').value

    })
    .subscribe(
      (data:any) => {

        console.log(data);

          //Guardamos el token
          this.tokenLogin = data.token;
          this.found2 = true;


      }     
    )
  
    //Llamamos al metodo abrirPagina para volcar el componente Modificar
    this.abrirPagina('Modificar');
      
    }
    
    else{
      //Si alguno de los campos esta vacio saltara un popup indicandolo
      console.log('Usuario o contrasena incorrectos');
      if(this.angForm2.get('user').value != "ucam2")
      this.usuarioVacio=true;
      if(this.angForm2.get('pass').value != "p27QRsc")
      this.contrasenaVacia=true;
    }

  }


}