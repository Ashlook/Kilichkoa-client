import { Component, Inject, PLATFORM_ID, APP_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../_service/auth.service';
import { ApiService } from '../_service/api.service';
import { UserResponse } from '../_model/response/user-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appName = `Kilich'koa`;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private auth: AuthService,
    private api: ApiService
  ) { }


  ngOnInit(): void {
    // Gestion admin/active à l'initation du composant
    // Si connecté on recupere en base les valeurs
    if (this.auth.isAuth()) {
      this.api.getUser(this.auth.username).subscribe((res: UserResponse) => {
        this.auth.isActive.next(res.user.active);
        this.auth.isAdmin.next(res.user.admin);
      });
    }
  }

  onActivate(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 50); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16);
    }
  }
}
