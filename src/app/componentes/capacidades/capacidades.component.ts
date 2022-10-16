import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Capacidades } from 'src/app/data/Capacidades';
import { AuthService } from 'src/app/servicios/auth.service';
import { CapacidadesService } from 'src/app/servicios/capacidades.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-capacidades',
  templateUrl: './capacidades.component.html',
  styleUrls: ['./capacidades.component.css']
})
export class CapacidadesComponent implements OnInit {
  capacidadesList : Capacidades[] = [];
  isUserLogged : boolean= false;
  capacidadesForm: FormGroup;
  constructor(private datosPortfolio:CapacidadesService,private authService:AuthService, private formBuilder: FormBuilder) { 
    this.capacidadesForm= formBuilder.group(
     { id:[""],
    nombre: ["",[Validators.required, Validators.minLength(3)]],
    porcentaje:[0,[ Validators.pattern(/^[0-9]+$/), Validators.min(0),Validators.max(100)]],
    descripcion:[""]}
    
    );
  }
 
  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.recargarDatos();
}
private recargarDatos(){
this.datosPortfolio.obtenerDatosCapacidades().subscribe(
        (data) => {
              this.capacidadesList = data;
                  }
                                                   )
}
get Nombre(){
  return this.capacidadesForm.get('nombre');

}
get Porcentaje(){
  return this.capacidadesForm.get('porcentaje');

}
get Descripcion(){
  return this.capacidadesForm.get('descripcion');

}

private clearForm(){
  this.capacidadesForm.setValue({
    id:"",
    nombre:"",
    porcentaje:0,
    descripcion:""
   
  });
}

onSubmit(){
  let capacidad: Capacidades = this.capacidadesForm.value;
  if (this.capacidadesForm.get("id")?.value ==""){
  this.datosPortfolio.guardarNuevaCapacidad(capacidad).subscribe(
(newCapacidad : Capacidades)=>{
  this.capacidadesList.push(newCapacidad);
  alert('se agrego correctamente la nueva capacidad');
}
  );
} else //aca seria para dar alta nuevos registros 
{ 
  this.datosPortfolio.modificarCapacidades(capacidad).subscribe(
    ()=>{
      this.recargarDatos();
    }
  )
  alert('los cambios fueros realizados correctamente');
}
}
NuevaCapacidad(){
  this.clearForm();
}
private loadForm(capacidad:Capacidades){
  this.capacidadesForm.setValue({
    id:capacidad.id,
    nombre:capacidad.nombre,
    porcentaje:capacidad.porcentaje,
    descripcion:capacidad.descripcion
   
  });

}
EditarCapacidades(indice : number){
  let capacidad:Capacidades =this.capacidadesList[indice];
  this.loadForm(capacidad);

}
EliminarCapacidades(indice : number){
  let capacidad:Capacidades =this.capacidadesList[indice];
  let i : number = this.capacidadesList.length;
  if (confirm("¿usted esta seguro que quiere eliminar este registro? una vez hecho esto no hay vuleta atras, y debera crear nuevamente el registro")){
    this.datosPortfolio.eliminarCapacidades(capacidad.id).subscribe(
      ()=>{
        this.recargarDatos();
        alert("eliminamos correctamente el item capacidades");
      },err=>{
        alert("no se ah borrado la capacidades");
      }
    )
  }
}
Vacia (): boolean {
  let  vaciaL: boolean = false;
  if (this.capacidadesList.length ==0 && this.authService.isUserLogged()){
    vaciaL =true;
  }else{
    vaciaL=false;
  }
  return vaciaL;

}
}
