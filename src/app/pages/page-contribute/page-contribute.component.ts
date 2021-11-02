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

@Component({
  selector: 'app-page-contribute',
  templateUrl: './page-contribute.component.html',
  styleUrls: ['./page-contribute.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContributeComponent {
  readonly relations$ = new Observable<string[]>();
  readonly nodes$ = new Observable<string[]>();

  

  selectedFrom : any;
  selectedRelation: any;
  selectedTo: any;

  constructor(
    private graphService: GraphService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {
    this.relations$ = this.graphService.getRelations();
    this.nodes$ = this.graphService.getNodes();
  }


  submitContribution() {

    console.log(this.selectedFrom);
    console.log(this.selectedRelation);
    console.log(this.selectedTo);
    this.showDialog();
  }

  showDialog() {
    this.dialogService
      .open('Gracias por tu contribución.', { label: 'Finalizado', size: 's' })
      .subscribe();
  }

  showDialogNode(content: PolymorpheusContent<TuiDialogContext>) {
	        this.dialogService.open(content).subscribe();
	    }

  
}
