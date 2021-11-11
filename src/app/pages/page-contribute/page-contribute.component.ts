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

@Component({
  selector: 'app-page-contribute',
  templateUrl: './page-contribute.component.html',
  styleUrls: ['./page-contribute.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContributeComponent implements OnInit {
  readonly testForm = new FormGroup({
    selected: new FormControl('actor'),
  });

  readonly relations$ = new Observable<string[]>();
  readonly nodes$ = new Observable<string[]>();

  selectedFrom: any;
  selectedRelation: any;
  selectedTo: any;

  constructor(
    private graphService: GraphService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private graphServiceContribution: GraphContributionService
  ) {
    this.relations$ = this.graphService.getRelations();
    this.nodes$ = this.graphService.getNodes();
  }
  ngOnInit(): void {}

  submitContribution() {
    console.log(this.graphServiceContribution.getNodes());
    this.showDialog();
  }

  showDialog() {
    this.dialogService
      .open('Gracias por tu contribución.', { label: 'Finalizado', size: 's' })
      .subscribe();
  }

  showDialogNode(content: PolymorpheusContent<TuiDialogContext>, type: string) {
    this.graphServiceContribution.type = type;
    this.dialogService.open(content).subscribe();
  }

  onChange(data:Event,type:string){
    this.graphServiceContribution.type=type;
    this.graphServiceContribution.setNode(data);
    console.log(data)
  }
}
