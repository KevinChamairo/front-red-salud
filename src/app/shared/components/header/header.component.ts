import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LocalStorageStoreService } from '../../../auth/LocalStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public breadcrumbsUrl: any;
  public breadcrumbsUrlLenght: number = 0;
  private subscriptions: Subscription[] = [];
  public userSesion: any = []
  constructor(private router: Router, private LocalStorage: LocalStorageStoreService) {}

  ngOnInit(): void {
    this.userSesion = JSON.parse(this.LocalStorage.getItem('user'))

    this.breadcrumbsUrl = this.splitBreadcrumbsUrl(this.router.url);
    this.breadcrumbsUrlLenght = this.breadcrumbsUrl;

    const sub01 = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((res) => {
        const { url } = res as NavigationEnd;
        this.breadcrumbsUrl = this.splitBreadcrumbsUrl(url);
      });
      console.log("sub01",this.breadcrumbsUrl)
      for (let index = 0; index < this.breadcrumbsUrl.length; index++) {
        
        const element = this.breadcrumbsUrl[index];
        console.log("aca veremos", element)
        
        if(element == 'mesadepartes'){
          console.log("entre1")
          this.breadcrumbsUrl[index] = 'Mesa de Partes '
        }

        if(element == 'documentosRecibidos'){
          console.log("entre2")
          this.breadcrumbsUrl[index]= 'Documentos Recibidos '
        }
      
        
      }
      
      console.log("ruteado", this.breadcrumbsUrl)
    this.subscriptions.push(sub01);
  }

  ngOnDestroy(): void {
    console.log("aea")
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public splitBreadcrumbsUrl(s: string): any {
    let d = s.split('/');
    let w = d.slice(1, 9);
    return w;
  }

  public logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('token');
    localStorage.removeItem('modules')
    localStorage.removeItem('user')
    // window.location.href = 'http://localhost:4203//holding';
    window.location.href = 'https://holding.gruporedsalud.com/holding';
  }
}
