import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogService } from '@taiga-ui/core';
import { GraphContributionService } from 'src/app/services/graph-contribution.service';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.css'],
})
export class ActorFormComponent implements OnInit {

  constructor(
    private graphService: GraphContributionService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
  ) {}

  items = ['Individuo', 'Organización'];
  sector = [
    'Sociedad Civil',
    'Gobierno',
    'Empresa',
    'Academia',
    'Medio de Comunicación',
  ];
  grupo = [
    'Periodistas',
    'Activistas',
    'Cientista de Datos',
    'Desarrolladores',
    'Investigadores',
  ];
  rol = ['Productores', 'Intermediarios'];

  actorForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    tipo: new FormControl(this.items[0]),
    sector: new FormControl(this.sector[0]),
    grupo: new FormControl(this.grupo[0]),
    rol: new FormControl(this.rol[0]),
    url: new FormControl('',Validators.required)
  });

  onFormSubmit(): void {
    this.graphService.setNode(this.actorForm.getRawValue());
  }

  ngOnInit() {}
}
