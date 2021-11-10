import { GraphContributionService } from './../../../../services/graph-contribution.service';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-technology-form',
  templateUrl: './technology-form.component.html',
  styleUrls: ['./technology-form.component.css'],
})
export class TechnologyFormComponent implements OnInit {
  rol = ['Abierta', 'No Abierta'];

  techForm = new FormGroup({
    nombre: new FormControl(''),
    rol: new FormControl(this.rol[0]),
    url: new FormControl(''),
  });

  constructor(private graphService: GraphContributionService) {}

  ngOnInit() {}

  onFormSubmit(): void {
    this.graphService.setNode(this.techForm.getRawValue());
  }
}
