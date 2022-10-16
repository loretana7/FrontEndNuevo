import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Educacion } from 'src/app/data/Educacion';
import { AuthService } from 'src/app/servicios/auth.service';
import { EducacionService } from 'src/app/servicios/educacion.service';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
educacionList : Educacion[] = [];
isUserLogged : boolean= false;
educacionForm: FormGroup;
  constructor(private datosPortfolio:EducacionService,private authService:AuthService, private formBuilder: FormBuilder) { 
    this.educacionForm= formBuilder.group(
     { id:[""],
    nivel: ["",[Validators.required, Validators.minLength(5)]],
    escuela:["",[Validators.required, Validators.minLength(5)]],
    direccion:["",[Validators.required, Validators.minLength(5)]],
    titulo:["",[Validators.required, Validators.minLength(5)]],
    img:[""],
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
this.datosPortfolio.obtenerDatosEducation().subscribe(
        (data) => {
              this.educacionList = data;
                  }
                                                   )
}
get Nivel(){
  return this.educacionForm.get('nivel');

}
get Escuela(){
  return this.educacionForm.get('escuela');

}
get Direccion(){
  return this.educacionForm.get('direccion');

}
get Titulo(){
  return this.educacionForm.get('titulo');

}
get Img(){
  return this.educacionForm.get('img');

}
get Desde(){
  return this.educacionForm.get('desde');

}
get Hasta(){
  return this.educacionForm.get('hasta');

}
private clearForm(){
  this.educacionForm.setValue({
    id:"",
    nivel:"",
    escuela:"",
    direccion:"",
    titulo:"",
    img:"",
    desde: "",
    hasta:""
  });
}
onSubmit(){
  let educacion: Educacion = this.educacionForm.value;
  if (this.educacionForm.get("id")?.value ==""){
  this.datosPortfolio.guardarNuevaEducacion(educacion).subscribe(
(newEducacion : Educacion)=>{
  this.educacionList.push(newEducacion);
  alert('se agrego correctamente la nueva educacion');
}
  );
} else //aca seria para dar alta nuevos registros 
{ 
  this.datosPortfolio.modificarEducacion(educacion).subscribe(
    ()=>{
      this.recargarDatos();
    }
  )
  alert('los cambios fueros realizados correctamente');
}
}
NuevaEducacion(){
  this.clearForm();
}
private loadForm(educacion:Educacion){
  this.educacionForm.setValue({
    id:educacion.id,
    nivel:educacion.nivel,
    escuela:educacion.escuela,
    direccion:educacion.direccion,
    titulo:educacion.titulo,
    img:educacion.img,
    desde: educacion.desde,
    hasta:educacion.hasta
  });

}
EditarEducacion(indice : number){
  let educacion:Educacion =this.educacionList[indice];
  this.loadForm(educacion);

}
EliminarEducacion(indice : number){
  let educacion:Educacion =this.educacionList[indice];
  let i : number = this.educacionList.length;
  if (confirm("¿usted esta seguro que quiere eliminar este registro? una vez hecho esto no hay vuleta atras, y debera crear nuevamente el registro")){
    this.datosPortfolio.eliminarEducacion(educacion.id).subscribe(
      ()=>{
        this.recargarDatos();
        alert("eliminamos correctamente el item educación");
      },err=>{
        alert("no se ah borrado la educacion");
      }
    )
  }
}
Vacia (): boolean {
  let  vaciaL: boolean = false;
  if (this.educacionList.length ==0 && this.authService.isUserLogged()){
    vaciaL =true;
  }else{
    vaciaL=false;
  }
  return vaciaL;

}
}