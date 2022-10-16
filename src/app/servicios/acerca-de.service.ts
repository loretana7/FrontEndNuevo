import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/assets/data/config/Config';
import { AcercaDe } from '../data/AcercaDe';

@Injectable({
  providedIn: 'root'
})
export class AcercaDeService {

  constructor(private http:HttpClient) { }
  obtenerDatos():Observable<any>{
return this.http.get<any>('./assets/data/data.json');
  }
public obtenerDatosAcercaDe():Observable<AcercaDe[]>{
  return this.http.get<any>( config.baseUrl +"acercaDe/mostrar");
}


guardarNuevaAcercaDe(acercaDe :AcercaDe):Observable<AcercaDe>{
return this.http.post<any>( config.baseUrl + "acercaDe/crear",acercaDe);
}
modificarAcercaDe(acercaDe: AcercaDe):Observable<any>{
  return this.http.put<any>( config.baseUrl + "acercaDe/modificar" ,acercaDe);
}
eliminarAcercaDe(id :number):Observable<any>{
  return this.http.delete<any>( config.baseUrl + "acercaDe/eliminar/" + id );
}
}
