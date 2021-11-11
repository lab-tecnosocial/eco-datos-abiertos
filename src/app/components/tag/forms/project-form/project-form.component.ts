import { Observer } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GraphContributionService } from 'src/app/services/graph-contribution.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {

  @Input('close')
  close: Observer<any>;


  tipo = ['Repositorio', 'Visualizacion', 'Analisis'];

  projectForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(this.tipo[0]),
    url: new FormControl('')
  });

  constructor(private graphService: GraphContributionService) {}

  ngOnInit() {}

  onFormSubmit(): void {
    let data = {properties: this.projectForm.getRawValue()};
    data['labels']=['Proyecto'];
    this.graphService.setNode(data);
    this.close.complete();
  }

  closeDialog(){
    this.close.complete();
  }
}
