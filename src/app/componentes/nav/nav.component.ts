import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isUserLogged: boolean = false;
  miPortfolio:any;
  constructor(private datosPortfolio:PortfolioService, private authService: AuthService) { }

  ngOnInit(): void {
   
    this.datosPortfolio.obtenerDatos().subscribe(data => {
    
     
      this.miPortfolio = data;
      this.isUserLogged = this.authService.isUserLogged();
    });
 
  }
  logout(): void {
    this.authService.logout();
    this.isUserLogged = false;
    window.location.reload();
  }

}
