import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { CapacidadesComponent } from './componentes/capacidades/capacidades.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { NavComponent } from './componentes/nav/nav.component';
import {HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { Portfolio2Component } from './componentes/portfolio2/portfolio2.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { FooterComponent } from './componentes/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    EducacionComponent,
    CapacidadesComponent,
    ProyectosComponent,
    NavComponent,
    Portfolio2Component,
    LoginComponent,
    ExperienciaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
  
    HttpClientModule,
       AppRoutingModule,
       FormsModule,
       ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
