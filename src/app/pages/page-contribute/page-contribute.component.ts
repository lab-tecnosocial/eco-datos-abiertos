import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { GraphService } from './../../services/graph.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
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
  customFrom = false;
  customTo = false;

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
      this.isLoggedin = user != null;
    });
  }

  submitContribution() {
    //console.log(this.graphServiceContribution.getNodes());
    //console.log(this.graphServiceContribution.getRelation());

    this.graphServiceContribution
      .contribute({
        nodes: this.graphServiceContribution.getNodes(),
        relation: this.graphServiceContribution.getRelation(),
      })
      .subscribe();

    this.selectedRelation = undefined;
    this.nodeFrom = undefined;
    this.nodeTo = undefined;
    this.customFrom = false;
    this.customTo = false;
    this.graphServiceContribution.clear();
    this.showDialog();
  }

  showDialog() {
    this.dialogService
      .open('Gracias por tu contribuci??n.', { label: 'Finalizado', size: 's' })
      .subscribe();
  }
  showDialogNode(content: PolymorpheusContent<TuiDialogContext>, type: string) {
    this.clearNode(type, true);
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

  clearNode(type: string, custom: boolean): void {
    switch (type) {
      case 'FROM':
        this.customFrom = custom;
        this.graphServiceContribution.fromNode = undefined;
        this.nodeFrom = undefined;
        break;

      default:
        this.customTo = custom;
        this.graphServiceContribution.toNode = undefined;
        this.nodeTo = undefined;
        break;
    }
  }
}
