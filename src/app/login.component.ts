import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from './admin.service';

declare function openForm(): any;
declare function closeForm(): any;

@Component({
  selector: 'loginAdmin',  //Esto no es el problema
  templateUrl: './login.component.html',
  styleUrls: ['./app.component.css']
})
export class LoginComponent {
  
  title = 'Admin';
  angForm2: FormGroup;
  //name:string = '';
  puntos:number;
  newPuntos:number;
  esconder:boolean;
  found:boolean;
  found2:boolean;
  found3:boolean;
  //Estamos simulando que el login funciona bien y devuelve la token
  tokenLogin:string= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI';
  validation:string;
  headers: string[];



  constructor(private httpClient:HttpClient, private fb: FormBuilder, private ruta: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private adminService: AdminService) {

    this.createForm2();
    
  }

  abrirPagina(nombrePagina:string):void{
    this.ruta.navigate([`${nombrePagina}`]);  //Funciona como es debido
    this.found2=true;
    this.esconder=true;
  }


  createForm2() {
    this.angForm2 = this.fb.group({
      user: ['', Validators.required ],
      pass: ['', Validators.required ]

    });
  }



  postLogin(){

    this.found2 = false;
    if((this.angForm2.get('user').value == "ucam2")&&(this.angForm2.get('pass').value == "p27QRsc")){
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
  
    this.abrirPagina('Modificar');
      
    }else
    console.log("error de login");
  }


}