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


  rol = ['Abierta', 'No Abierta'];

  techForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(this.rol[0]),
    url: new FormControl(''),
  });

  constructor(private graphService: GraphContributionService) {}

  ngOnInit() {}

  onFormSubmit(): void {
    this.graphService.setNode(this.techForm.getRawValue());
    this.close.complete();
  }

  closeDialog(){
    this.close.complete();
  }
}
