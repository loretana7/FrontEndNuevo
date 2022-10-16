import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/assets/data/config/Config';
import { Proyectos } from '../data/Proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  constructor(private http:HttpClient) { }
  obtenerDatos():Observable<any>{
return this.http.get<any>('./assets/data/data.json');
  }
public obtenerDatosProyecto():Observable<Proyectos[]>{
  return this.http.get<any>( config.baseUrl +"proyecto/mostrar");
}


guardarNuevoProyecto(proyecto :Proyectos):Observable<Proyectos>{
return this.http.post<any>( config.baseUrl + "proyecto/crear",proyecto);
}
modificarProyecto(proyecto: Proyectos):Observable<any>{
  return this.http.put<any>( config.baseUrl + "proyecto/modificar" ,proyecto);
}
eliminarProyecto(id :number):Observable<any>{
  return this.http.delete<any>( config.baseUrl + "proyecto/eliminar/" + id );
}
}
