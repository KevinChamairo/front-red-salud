import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { LocalStorageStoreService } from '../../LocalStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private ar: ActivatedRoute, private router: Router,private services: AuthService,private LocalStorage : LocalStorageStoreService) {}
  public loading: boolean = false
  ngOnInit(): void {
    this.ar.params.subscribe((e) => {
      this.login(e.token);
    });
  }

  login(token: string): any {
    this.services
      .login(
        token
      )
      .subscribe((data: any) => {
        console.log("data",data)
        

 
        if (data.success) {
          this.LocalStorage.setItem('modules', JSON.stringify(data.data.modules))
          this.LocalStorage.setItem('token',data.data.token)
          this.LocalStorage.setItem('user',JSON.stringify(data.data.user))
          localStorage.setItem('userToken', token);
          
          this.router.navigate(['/admin']);
          this.loading = false;
        } else {
          this.router.navigate(['/auth']);
          this.loading = false;
        }
      })

  }
}
