import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { config } from 'src/assets/data/config/Config';
import { Educacion } from '../data/Educacion';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }
  obtenerDatos():Observable<any>{
return this.http.get<any>('./assets/data/data.json');
  }
public obtenerDatosEducation():Observable<Educacion[]>{
  return this.http.get<any>( config.baseUrl +"educacion/mostrar");
}

/*obtenerDatosEducacion2():Educacion[]{
  return [
  
      { "nivel":"Primario:",
        "escuela": "Escuela Nro 39 antoña cabral de callait",
        "direccion": "Grandbourg Malvinas Argentinas Bs As",
        "img": "./assets/images/39.webp", 
        "titulo": "primario",
        "desde": "1995",
        "hasta": "2013"
      },
      {"nivel":"secundario:",
        "escuela": "Escuela Media Nro 8 TRATADO DEL PILAR",
        "direccion": "Pilar pelagio Baltazar Luna 1200 Buenos Aires",
        "img": "./assets/images/tratado.jpg", 
        "titulo": "Humanidades y ciencias sociales",
        "desde": "2003",
        "hasta": "2007"
      },
      {
          "nivel": "universitario",
        "escuela": "Universidad Nacional de Lujan",
        "direccion": " Ruta 5 y Av. Constitucion Lujan",
        "titulo": "sistemas de informacion",
        "img": " ./assets/images/lujan.png",
        "desde": "2009",
        "hasta": "actualidad"
      }
  ]
}*/

}
