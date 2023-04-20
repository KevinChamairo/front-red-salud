import { LocalStorageStoreService } from './../auth/LocalStorage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public clase: string = 'min';

  constructor(private LocalStorage: LocalStorageStoreService,private router: Router) {}

  ngOnInit(): void {

    this.validarUser()


  }

  oyc(s: string): void {
    if (s == 'opened') {
      this.clase = 'max';
    } else {
      this.clase = 'min';
    }
  }
  validarUser(){
   let token = this.LocalStorage.getItem('token')
   console.log("ese es el token", token)
   if (token == '') {
    this.router.navigate(['/auth']);
   }
   
  }
  class(): string {
    return this.clase;
  }
}
