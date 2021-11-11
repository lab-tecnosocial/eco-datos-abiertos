import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { GraphService } from './../../services/graph.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { GraphContributionService } from 'src/app/services/graph-contribution.service';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-page-contribute',
  templateUrl: './page-contribute.component.html',
  styleUrls: ['./page-contribute.component.css'],
})
export class PageContributeComponent implements OnInit {
  readonly testForm = new FormGroup({
    selected: new FormControl('actor'),
  });

  readonly relations$ = new Observable<string[]>();
  readonly nodes$ = new Observable<string[]>();
  user$: SocialUser;
  selectedRelation: any;
  nodeFrom: any;
  nodeTo: any;
  dialog: Observable<any>;
  isLoggedin: boolean;

  constructor(
    private graphService: GraphService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private graphServiceContribution: GraphContributionService,
    private socialAuthService: SocialAuthService
  ) {
    this.relations$ = this.graphService.getRelations();
    this.nodes$ = this.graphService.getNodes();
  }
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user$ = user;
      this.isLoggedin = (user != null);
    });
  }

  submitContribution() {
    console.log(this.graphServiceContribution.getNodes());
    console.log(this.graphServiceContribution.getRelation());
    this.showDialog();
  }

  showDialog() {
    this.dialogService
      .open('Gracias por tu contribución.', { label: 'Finalizado', size: 's' })
      .subscribe();
  }
  showDialogNode(content: PolymorpheusContent<TuiDialogContext>, type: string) {
    this.graphServiceContribution.type = type;
    this.dialog = this.dialogService.open(content);
    this.dialog.subscribe();
  }

  onChange(data: any, type: string) {
    this.graphServiceContribution.type = type;
    this.graphServiceContribution.setNode(data);
    console.log(data);
  }

  onRelationChange(rel: any) {
    this.graphServiceContribution.setRelation(rel);
  }

  selectedFrom() {
    return this.graphServiceContribution.getNodes().from;
  }

  selectedTo() {
    return this.graphServiceContribution.getNodes().to;
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
