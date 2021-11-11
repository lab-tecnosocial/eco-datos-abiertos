import { Observer } from 'rxjs';
import { GraphContributionService } from './../../../../services/graph-contribution.service';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-technology-form',
  templateUrl: './technology-form.component.html',
  styleUrls: ['./technology-form.component.css'],
})
export class TechnologyFormComponent implements OnInit {

  @Input('close')
  close: Observer<any>;


  type = ['Abierta', 'No Abierta'];

  techForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(this.type[0]),
    url: new FormControl(''),
  });

  constructor(private graphService: GraphContributionService) {}

  ngOnInit() {}

  onFormSubmit(): void {
    let data = {properties: this.techForm.getRawValue()};
    data['labels']=['Tecnologia'];
    this.graphService.setNode(data);
    this.close.complete();
  }

  closeDialog(){
    this.close.complete();
  }
}
