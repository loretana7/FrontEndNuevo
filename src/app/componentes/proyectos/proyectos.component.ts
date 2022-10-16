import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyectos } from 'src/app/data/Proyectos';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProyectosService } from 'src/app/servicios/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  
  proyectosList : Proyectos[] = [];
  isUserLogged : boolean= false;
  proyectosForm: FormGroup;
  constructor(private datosPortfolio:ProyectosService,private authService:AuthService, private formBuilder: FormBuilder) { 
    this.proyectosForm= formBuilder.group(
     { id:[""],
    nombre: ["",[Validators.required, Validators.minLength(5)]],
    descripcion:["",[Validators.required, Validators.minLength(5)]],
    desde: ["",[Validators.required, Validators.minLength(2)]],
    hasta:["",[Validators.required, Validators.minLength(2)]] ,
    img:[""]}
    
 
    );
   
    
  }
 

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();

this.recargarDatos();
}
private recargarDatos(){
 // console.log(this.isUserLogged = this.authService.isUserLogged());
this.datosPortfolio.obtenerDatosProyecto().subscribe(
        (data) => {
              this.proyectosList = data;
                  }
                                                   )
}
get Nombre(){
  return this.proyectosForm.get('nombre');

}
get Descripcion(){
  return this.proyectosForm.get('descripcion');

}


get Desde(){
  return this.proyectosForm.get('desde');

}
get Hasta(){
  return this.proyectosForm.get('hasta');

}
get Img(){
  return this.proyectosForm.get('img');

}
private clearForm(){
  this.proyectosForm.setValue({
    id:"",
    nombre:"",
    descripcion:"",
    desde: "",
    hasta:"",
    img:""
    
  });

}
onSubmit(){
  let proyectos: Proyectos = this.proyectosForm.value;
  if (this.proyectosForm.get("id")?.value ==""){
  this.datosPortfolio.guardarNuevoProyecto(proyectos).subscribe(
(newProyecto : Proyectos)=>{
  this.proyectosList.push(newProyecto);
  alert('se agrego correctamente el nuevo proyecto');
}
  );
} else //aca seria para dar alta nuevos registros 
{ 
  this.datosPortfolio.modificarProyecto(proyectos).subscribe(
    ()=>{
      this.recargarDatos();
    }
  )
  alert('los cambios fueros realizados correctamente');
}
}
NuevoProyecto(){
  this.clearForm();
}
private loadForm(proyecto:Proyectos){
  this.proyectosForm.setValue({
    id:proyecto.id,
    nombre:proyecto.nombre,
    descripcion:proyecto.descripcion,
    desde: proyecto.desde,
    hasta:proyecto.hasta,
    img:proyecto.img
   
  });
 
}
EditarProyecto(indice : number){
  let proyectos:Proyectos =this.proyectosList[indice];
  this.loadForm(proyectos);

}
EliminarProyecto(indice : number){
  let proyecto:Proyectos =this.proyectosList[indice];
  let i : number = this.proyectosList.length;
  if (confirm("¿usted esta seguro que quiere eliminar este registro? una vez hecho esto no hay vuleta atras, y debera crear nuevamente el registro")){
    this.datosPortfolio.eliminarProyecto(proyecto.id).subscribe(
      ()=>{
        this.recargarDatos();
        alert("eliminamos correctamente el proyecto");
      },err=>{
        alert("no se ah borrado el proyecto");
      }
    )
  }
}
Vacia (): boolean {
  let  vaciaL: boolean = false;
  if (this.proyectosList.length ==0 && this.authService.isUserLogged()){
    vaciaL =true;
  }else{
    vaciaL=false;
  }
  return vaciaL;

}
}
