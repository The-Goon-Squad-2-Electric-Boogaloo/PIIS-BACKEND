import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedFile: File = null;

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  
  title = 'Admin';
  angForm: FormGroup;
  angForm2: FormGroup;
  //name:string = '';
  puntos:number;
  newPuntos:number;
  found:boolean;
  found2:boolean;
  found3:boolean;
  tokenLogin:string= '';
  validation:string;
  rutaArchivo: string;
  rutaNuevaGenerada: string;
  rutaNuevaGenerada2: string;



  constructor(private httpClient:HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private sanitizer: DomSanitizer) {

    this.createForm();
    this.createForm2();
    
  }

  createForm() {
    this.angForm = this.fb.group({
       id: ['', Validators.required ],
       nombre: ['', Validators.required ],
       descripcion: ['', Validators.required ],
       ruta: ['', Validators.required ],
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


  funcionAsincrona(){
    let promise = new Promise((resolve, rejects) => {
      setTimeout(() => {
        console.log("Asincrono task calling callback")
  
          this.putCientifico();
          resolve();
        
      }, 1000);
  
    });
    return promise;
  }
  
  
  
  principalFuncion(){
  
    this.funcionAsincrona().then(() => console.log("Time does flow again"))
    this.subirImagen();
  
  }
  
  
    async subirImagen(){
  
      console.log(this.angForm.get('ruta').value);
      this.rutaArchivo = this.angForm.get('ruta').value;
  
  
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
  
      this.httpClient.post(`https://gameserver.centic.ovh/files?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI`, fd)
    
      .subscribe(
        (data:any) => {
  
          this.rutaNuevaGenerada=data.file;
          console.log('1');
          console.log(this.rutaNuevaGenerada);
          
        }     
      )
   
    }
  
  
    putCientifico(){

      //console.log('2');
      //console.log(this.rutaNuevaGenerada);
      
      if((this.angForm.get('id').value!='') || (this.angForm.get('nombre').value!='') || (this.angForm.get('descripcion').value!='')|| (this.angForm.get('energia').value!='') || (this.angForm.get('precio').value!='') ){
  
  
  
  
      if(this.angForm.get('id').value==1){
  
        this.httpClient.put('https://gameserver.centic.ovh/items/5e90a54c62fbe3777ad14405?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
        {
          
          nombre: this.angForm.get('nombre').value,
          descripcion: this.angForm.get('descripcion').value,
          imagen: this.rutaNuevaGenerada,
          energia: this.angForm.get('energia').value,
          precio: this.angForm.get('precio').value
  
        })
        .subscribe()
  
       }
  
      else if(this.angForm.get('id').value==2){
  
        this.httpClient.put('https://gameserver.centic.ovh/items/5e90a54c62fbe3777ad14406?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
        {
          
          nombre: this.angForm.get('nombre').value,
          descripcion: this.angForm.get('descripcion').value,
          imagen: this.rutaNuevaGenerada,
          energia: this.angForm.get('energia').value,
          precio: this.angForm.get('precio').value
        
        })
        .subscribe()
  
      }
      
      else if(this.angForm.get('id').value==3){
  
        this.httpClient.put('https://gameserver.centic.ovh/items/5e90a54c62fbe3777ad14407?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
        {
          
          nombre: this.angForm.get('nombre').value,
          descripcion: this.angForm.get('descripcion').value,
          imagen: this.rutaNuevaGenerada,
          energia: this.angForm.get('energia').value,
          precio: this.angForm.get('precio').value
        
        })
        .subscribe()
  
      }
      
      else if(this.angForm.get('id').value==4){
  
        this.httpClient.put('https://gameserver.centic.ovh/items/5e90a54c62fbe3777ad14408?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
        {
          
          nombre: this.angForm.get('nombre').value,
          descripcion: this.angForm.get('descripcion').value,
          imagen: this.rutaNuevaGenerada,
          energia: this.angForm.get('energia').value,
          precio: this.angForm.get('precio').value
        
        })
        .subscribe()
  
      }
      
    }
    else{
      console.log('Se deben rellenar todos los campos');
    }
  
      //Acaba put cientifico
      }

}
