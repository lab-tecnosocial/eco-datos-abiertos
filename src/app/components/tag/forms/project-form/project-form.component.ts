import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GraphContributionService } from 'src/app/services/graph-contribution.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {


  tipo = ['Repositorio', 'Visualizacion', 'Analisis'];

  projectForm = new FormGroup({
    nombre: new FormControl(''),
    tipo: new FormControl(this.tipo[0]),
    url: new FormControl('')
  });

  constructor(private graphService: GraphContributionService) {}

  ngOnInit() {}

  onFormSubmit(): void {
    this.graphService.setNode(this.projectForm.getRawValue());
  }
}
