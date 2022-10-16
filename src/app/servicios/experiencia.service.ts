import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/assets/data/config/Config';
import { Experiencias } from '../data/Experiencias';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
    
  constructor(private http:HttpClient) { }

public obtenerDatosExperiencia():Observable<Experiencias[]>{
  return this.http.get<any>( config.baseUrl +"experiencia/mostrar");
}


guardarNuevaExperiencia(experiencias :Experiencias):Observable<Experiencias>{
return this.http.post<any>( config.baseUrl + "experiencia/crear",experiencias);
}
modificarExperiencia(experiencias: Experiencias):Observable<any>{
  return this.http.put<any>( config.baseUrl + "experiencia/modificar" ,experiencias);
}
eliminarExperiencia(id :number):Observable<any>{
  return this.http.delete<any>( config.baseUrl + "experiencia/eliminar/" + id );
}

}

