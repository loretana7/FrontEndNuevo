import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/assets/data/config/Config';
import { Educacion } from '../data/Educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  constructor(private http:HttpClient) { }
  obtenerDatos():Observable<any>{
return this.http.get<any>('./assets/data/data.json');
  }
public obtenerDatosEducation():Observable<Educacion[]>{
  return this.http.get<any>( config.baseUrl +"educacion/mostrar");
}


guardarNuevaEducacion(educacion :Educacion):Observable<Educacion>{
return this.http.post<any>( config.baseUrl + "educacion/crear",educacion);
}
modificarEducacion(educacion: Educacion):Observable<any>{
  return this.http.put<any>( config.baseUrl + "educacion/modificar" ,educacion);
}
eliminarEducacion(id :number):Observable<any>{
  return this.http.delete<any>( config.baseUrl + "educacion/eliminar/" + id );
}
}
