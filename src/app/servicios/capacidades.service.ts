import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/assets/data/config/Config';
import { Capacidades } from '../data/Capacidades';

@Injectable({
  providedIn: 'root'
})
export class CapacidadesService {

  constructor(private http:HttpClient) { }
  obtenerDatos():Observable<any>{
return this.http.get<any>('./assets/data/data.json');
  }
public obtenerDatosCapacidades():Observable<Capacidades[]>{
  return this.http.get<any>( config.baseUrl + "habilidad/mostrar");
}


guardarNuevaCapacidad(capacidades :Capacidades):Observable<Capacidades>{
return this.http.post<any>( config.baseUrl + "habilidad/crear",capacidades);
}
modificarCapacidades(capacidades: Capacidades):Observable<any>{
  return this.http.put<any>( config.baseUrl + "habilidad/modificar" ,capacidades);
}
eliminarCapacidades(id :number):Observable<any>{
  return this.http.delete<any>( config.baseUrl + "habilidad/eliminar/" + id );
}
}
