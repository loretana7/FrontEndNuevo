import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experiencias } from 'src/app/data/Experiencias';
import { AuthService } from 'src/app/servicios/auth.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  isUserLogged: boolean = false;
  experienciasList: Experiencias[] = [];
  experienciasForm: FormGroup;
  constructor(private datosPortfolio:ExperienciaService,private authService:AuthService, private formBuilder: FormBuilder) { 
    this.experienciasForm= formBuilder.group(
     { id:[""],
    posicion: ["",[Validators.required, Validators.minLength(5)]],
    lugar:["",[Validators.required, Validators.minLength(5)]],
    img:[""],
    direccion:["",[Validators.required, Validators.minLength(5)]],
    horario:["",[Validators.required]],
    desde: ["",[Validators.required, Validators.minLength(2)]],
    hasta:["",[Validators.required, Validators.minLength(2)]] }
    );
    
   
  
  }
 

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();

this.recargarDatos();
}
private recargarDatos(){
 // console.log(this.isUserLogged = this.authService.isUserLogged());
this.datosPortfolio.obtenerDatosExperiencia().subscribe(
        (data) => {
              this.experienciasList = data;
                  }
                                                   )
}
get Posicion(){
  return this.experienciasForm.get('posicion');

}
get Lugar(){
  return this.experienciasForm.get('lugar');

}
get Direccion(){
  return this.experienciasForm.get('direccion');

}
get Horario(){
  return this.experienciasForm.get('horario');

}
get Img(){
  return this.experienciasForm.get('img');

}
get Desde(){
  return this.experienciasForm.get('desde');

}
get Hasta(){
  return this.experienciasForm.get('hasta');

}
private clearForm(){
  this.experienciasForm.setValue({
    id:"",
    posicion:"",
    lugar:"",
    img:"",
    direccion:"",
    horario:"",
    desde: "",
    hasta:""
  });
 

}
onSubmit(){
  let experiencias: Experiencias = this.experienciasForm.value;
  if (this.experienciasForm.get("id")?.value ==""){
  this.datosPortfolio.guardarNuevaExperiencia(experiencias).subscribe(
(newExperiencia : Experiencias)=>{
  this.experienciasList.push(newExperiencia);
  alert('se agrego correctamente la nueva experiencia');
}
  );
} else //aca seria para dar alta nuevos registros 
{ 
  this.datosPortfolio.modificarExperiencia(experiencias).subscribe(
    ()=>{
      this.recargarDatos();
    }
  )
  alert('los cambios fueros realizados correctamente');
}
}
NuevaExperiencia(){
  this.clearForm();
}
private loadForm(experiencia:Experiencias){
  this.experienciasForm.setValue({
    id:experiencia.id,
    posicion:experiencia.posicion,
    lugar:experiencia.lugar,
    img:experiencia.img,
    direccion:experiencia.direccion,
    horario:experiencia.horario,
    desde: experiencia.desde,
    hasta:experiencia.hasta
  
 
  });

}
EditarExperiencia(indice : number){
  let experiencia:Experiencias =this.experienciasList[indice];
  this.loadForm(experiencia);

}
EliminarExperiencia(indice : number){
  let experiencia:Experiencias =this.experienciasList[indice];
  let i : number = this.experienciasList.length;
  if (confirm("¿usted esta seguro que quiere eliminar este registro? una vez hecho esto no hay vuleta atras, y debera crear nuevamente el registro")){
    this.datosPortfolio.eliminarExperiencia(experiencia.id).subscribe(
      ()=>{
        this.recargarDatos();
        alert("eliminamos correctamente el item experiencia");
      },err=>{
        alert("no se ah borrado la experiencia");
      }
    )
  }
}
Vacia (): boolean {
  let  vaciaL: boolean = false;
  if (this.experienciasList.length ==0 && this.authService.isUserLogged()){
    vaciaL =true;
  }else{
    vaciaL=false;
  }
  return vaciaL;

}
}
