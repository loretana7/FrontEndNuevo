import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AcercaDe } from 'src/app/data/AcercaDe';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { config } from 'src/assets/data/config/Config';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  acercaDeList : AcercaDe[] = [];
  isUserLogged : boolean= false;
 
  AcercaDeForm: FormGroup;
  constructor(private datosPortfolio:AcercaDeService,private authService:AuthService, private formBuilder: FormBuilder) { 
    this.AcercaDeForm= formBuilder.group(
     { id:[""],
    apellido: ["",[Validators.required, Validators.minLength(4)]],
    nombre:["",[Validators.required, Validators.minLength(3)]],
    edad:[0,[Validators.pattern(/^[0-9]+$/), Validators.min(20),Validators.max(100)]],
    informacion:["",[Validators.required, Validators.minLength(5)]],
    email: ["", [Validators.required, Validators.email]],
    titulo:["",[Validators.required, Validators.minLength(2)]] ,
    img:[""]}
    );
    
   
    
  }
 

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();

this.recargarDatos();
}
private recargarDatos(){
 // console.log(this.isUserLogged = this.authService.isUserLogged());
this.datosPortfolio.obtenerDatosAcercaDe().subscribe(
        (data) => {
              this.acercaDeList = data;
                  }
                                                   )
}
get Apellido(){
  return this.AcercaDeForm.get('apellido');

}
get Nombre(){
  return this.AcercaDeForm.get('nombre');

}
get Edad(){
  return this.AcercaDeForm.get('edad');

}
get Informacion(){
  return this.AcercaDeForm.get('informacion');

}
get Img(){
  return this.AcercaDeForm.get('img');

}
get Email(){
  return this.AcercaDeForm.get('email');

}
get Titulo(){
  return this.AcercaDeForm.get('titulo');

}
private clearForm(){
  this.AcercaDeForm.setValue({
    id:"",
    nombre:"",
    apellido:"",
    edad:"",
    informacion:"",
    email:"",
    titulo: "",
    img:""
  });

}
onSubmit(){
  let acercaDe: AcercaDe = this.AcercaDeForm.value;
  if (this.AcercaDeForm.get("id")?.value ==""){
  this.datosPortfolio.guardarNuevaAcercaDe(acercaDe).subscribe(
(newAcercaDe : AcercaDe)=>{
  this.acercaDeList.push(newAcercaDe);
  alert('se agrego correctamente la nueva educacion');
}
  );
} else //aca seria para dar alta nuevos registros 
{ 
  this.datosPortfolio.modificarAcercaDe(acercaDe).subscribe(
    ()=>{
      this.recargarDatos();
    }
  )
  alert('los cambios fueros realizados correctamente');
}
}
NuevaAcercaDe(){
  this.clearForm();
}
private loadForm(acercaDe:AcercaDe){
  this.AcercaDeForm.setValue({
    id:acercaDe.id,
    apellido:acercaDe.apellido,
    nombre:acercaDe.nombre,
    edad:acercaDe.edad,
    informacion:acercaDe.informacion, 
    email: acercaDe.email,
    titulo:acercaDe.titulo,
    img:acercaDe.img

  });

}
EditarAcercaDe(indice : number){
  let acercaDe:AcercaDe =this.acercaDeList[indice];
  this.loadForm(acercaDe);

}
Vacia (): boolean {
  let  vaciaL: boolean = false;
  if (this.acercaDeList.length ==0 && this.authService.isUserLogged()){
    vaciaL =true;
  }else{
    vaciaL=false;
  }
  return vaciaL;

}
EliminarAcercaDe(indice : number){
  let acercaDe:AcercaDe =this.acercaDeList[indice];
  let i : number = this.acercaDeList.length;
  if (confirm("¿usted esta seguro que quiere eliminar este registro? una vez hecho esto no hay vuleta atras, y debera crear nuevamente el registro")){
    this.datosPortfolio.eliminarAcercaDe(acercaDe.id).subscribe(
      ()=>{
        this.recargarDatos();
        alert("eliminamos correctamente el item acercaDe");
      },err=>{
        alert("no se ah borrado AcercaDe");
      }
    )
  }
}

}
