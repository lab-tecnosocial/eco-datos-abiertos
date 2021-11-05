import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphService } from 'src/app/services/graph.service';

@Component({
  selector: 'app-page-data',
  templateUrl: './page-data.component.html',
  styleUrls: ['./page-data.component.css']
})
export class PageDataComponent implements OnInit {

  readonly projects$ = new Observable<any[]>();
  constructor(private graphService: GraphService) {
    this.projects$ = this.graphService.getProjects();
  }

  ngOnInit(): void {}

}
