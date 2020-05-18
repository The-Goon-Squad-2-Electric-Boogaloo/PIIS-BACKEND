import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  ruta:string = 'https://gameserver.centic.ovh';

  constructor(private httpClient:HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  
  //Metodo que llama a la funcion get items de POSTMAN, se hace mediante la URL y una peticion tipo get. Devuelve un array de cientificos al componente
  getCientificos(): Observable<HttpResponse<any[]>>{
    return this.httpClient.get<any[]>('https://gameserver.centic.ovh/items?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI', { observe: 'response' });

   }

   //Metodo que se encarga de subir una imagen seleccionada al POSTMAN y devuelve una ruta url para su posterior uso en putCientificos
   subirImagen(fd: FormData): Observable<string>{

    return this.httpClient.post<string>(`https://gameserver.centic.ovh/files?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI`, fd);
   }

   //Metodo que se encarga de modificar los campos del cientifico 1 en el POSTMAN
   putCientifico1(angForm: FormGroup, ruta: String): Observable<any>{

    return  this.httpClient.put('https://gameserver.centic.ovh/items/5e90a54c62fbe3777ad14405?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
    {
      
      nombre: angForm.get('nombre').value,
      descripcion: angForm.get('descripcion').value,
      imagen: ruta,
      energia: angForm.get('energia').value,
      precio: angForm.get('precio').value

    })
   }

   //Metodo que se encarga de modificar los campos del cientifico 2 en el POSTMAN
   putCientifico2(angForm: FormGroup, ruta: String): Observable<any>{

    return this.httpClient.put('https://gameserver.centic.ovh/items/5e90a59262fbe3777ad14406?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
    {
      
      nombre: angForm.get('nombre').value,
      descripcion: angForm.get('descripcion').value,
      imagen: ruta,
      energia: angForm.get('energia').value,
      precio: angForm.get('precio').value
    

    })


   }
   
   //Metodo que se encarga de modificar los campos del cientifico 3 en el POSTMAN
   putCientifico3(angForm: FormGroup, ruta: String): Observable<any>{
     return this.httpClient.put('https://gameserver.centic.ovh/items/5e90a66462fbe3777ad14407?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
     {
       
       nombre: angForm.get('nombre').value,
       descripcion: angForm.get('descripcion').value,
       imagen: ruta,
       energia: angForm.get('energia').value,
       precio: angForm.get('precio').value
     
     })
   }

   //Metodo que se encarga de modificar los campos del cientifico 4 en el POSTMAN
   putCientifico4(angForm: FormGroup, ruta: String): Observable<any>{
     return this.httpClient.put('https://gameserver.centic.ovh/items/5e90a67f62fbe3777ad14408?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
     {                           
       
       nombre: angForm.get('nombre').value,
       descripcion: angForm.get('descripcion').value,
       imagen: ruta,
       energia: angForm.get('energia').value,
       precio: angForm.get('precio').value
     
     })
   }


  //Metodo que se encarga de modificar el campo estamosConectados permitiendo saltarse el login cuando actualicemos la pagina despues de modificar un cientifico
  enviarConectado(): Observable<any>{

    return  this.httpClient.put('https://gameserver.centic.ovh/items/5e90a54c62fbe3777ad14405?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
    {
      
      estamosConectados: "si"

    })
  }

  //Metodo que se encarga de cerrar nuestra sesion despues de haber hecho todos los cambios que deseemos a los cientificos
  //Cuando el campo esta a "no" no permitira saltarse el login cuando actualicemos la pagina
  enviarDesconectado(): Observable<any>{

    return  this.httpClient.put('https://gameserver.centic.ovh/items/5e90a54c62fbe3777ad14405?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',
    {
      
      estamosConectados: "no"

    })
  }


}
