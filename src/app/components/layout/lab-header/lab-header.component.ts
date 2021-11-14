import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractTuiThemeSwitcher } from '@taiga-ui/cdk';
import { VisNetworkService } from 'ngx-vis';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-lab-header',
  templateUrl: './lab-header.component.html',
  styleUrls: ['./lab-header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LabHeaderComponent
  extends AbstractTuiThemeSwitcher
  implements OnInit
{
  public enabled = false;
  open = false;
  toggle(open: boolean) {
    this.open = open;
  }

  public constructor(
    private router: Router,
    @Inject(DOCUMENT) documentRef: any,
    private socialAuthService: SocialAuthService
  ) {
    super(documentRef as Document);
  }
  user: SocialUser;
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  goToHome(): void {
    this.router.navigateByUrl('/').then((r) => {});
  }

  contribute(): void {
    console.log('x');
    this.router.navigateByUrl('/contribuir').then((r) => {});
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
