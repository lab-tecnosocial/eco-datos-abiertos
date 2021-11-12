import { GraphService } from './../../services/graph.service';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Data, DataSet, Edge, Node, VisNetworkService } from 'ngx-vis';
import { DataView } from 'vis-data';

import { MoveToOptions, Options } from 'vis-network';
import { Router } from '@angular/router';
import {
  ScrollToConfigOptions,
  ScrollToService,
} from '@nicky-lenaers/ngx-scroll-to';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css'],
})
export class PageHomeComponent implements OnInit, OnDestroy {
  title = 'vis';
  scaleFactor = 0.2;
  public visNetwork = 'networkId1';
  public visNetworkData: Data;
  public nodes: DataSet<Node>;
  public edges: DataSet<Edge>;
  public visNetworkOptions: Options;
  public searching = false;

  public selectedNode: any;
  items = ['Individuo', 'Organizacion'];
  testValue = new FormControl(this.items[0]);
  open = false;

  public view: DataView<Node>;
  public viewDefault: DataView<Node>;

  public constructor(
    private visNetworkService: VisNetworkService,
    private scrollToService: ScrollToService,
    private graphService: GraphService,
    private ngxLoader: NgxUiLoaderService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {}

  public networkInitialized(): void {
    this.ngxLoader.stop();
    this.visNetworkService.on(this.visNetwork, 'click');
    this.visNetworkService.click.subscribe((eventData: any[]) => {
      this.toggleSearch();
      const d = eventData[1].nodes;
      if (eventData[0] === this.visNetwork && d.length > 0) {
        this.selectedNode = this.nodes.get(d);
        this.toggle(true);
      }
    });
  }

  setFilter(type: string) {
    this.view = new DataView(this.nodes, {
      filter: function (item) {
        return item.group == type;
      },
    });
  }
  selectedNodeSearch = null;
  itemsNode = null;
  showVis = false;

  public ngOnInit(): void {
    this.ngxLoader.start();
    this.graphService.getGraph().subscribe((data) => {
      this.nodes = new DataSet<Node>(data.nodes);
      this.edges = new DataSet<Edge>(data.edges);
      this.initializeGraph();

      const graph = { nodes: data.nodes, edges: data.edges };
      sessionStorage.setItem('graph', JSON.stringify(graph));
      this.setSelect(data);

    });
  }

  setSelect(data: any) {
    this.itemsNode = data.nodes.map((n) => {
      return {
        value: n.id,
        label: n.label,
        properties: n.properties,
      };
    });
  }

  initializeGraph() {
    this.visNetworkData = { nodes: this.nodes, edges: this.edges };
    this.viewDefault = new DataView(this.nodes);
    this.visNetworkOptions = {
      nodes: {
        shape: 'dot',
        mass: 1,
        size: 16,
        shapeProperties: {
          borderRadius: 1,
        },
      },
    };
    this.showVis=false;
    console.log('xxx')
  }

  public zoomIn(): void {
    //console.log(this.visNetworkService.getScale(this.visNetwork));
    const op: MoveToOptions = {
      scale: this.clampZoom(
        this.visNetworkService.getScale(this.visNetwork) + this.scaleFactor,
        0.1,
        2
      ),
      animation: {
        duration: 200,
        easingFunction: 'easeOutQuad',
      },
    };
    this.visNetworkService.moveTo(this.visNetwork, op);
  }

  public zoomOut(): void {
    //console.log(this.visNetworkService.getScale(this.visNetwork));
    const op: MoveToOptions = {
      scale: this.clampZoom(
        this.visNetworkService.getScale(this.visNetwork) - this.scaleFactor,
        0.1,
        2
      ),
      animation: {
        duration: 200,
        easingFunction: 'easeOutQuad',
      },
    };
    this.visNetworkService.moveTo(this.visNetwork, op);
  }

  public fit(): void {
    this.visNetworkService.fit(this.visNetwork, {
      animation: {
        duration: 250,
        easingFunction: 'easeOutQuad',
      },
    });
  }

  public scrollDown(): void {
    //console.log('GO TO');
    const config: ScrollToConfigOptions = {
      target: `destination_about`,
      duration: 250,
      easing: 'easeInOutQuint',
    };
    //console.log(config.target);
    this.scrollToService.scrollTo(config);
  }

  public ngOnDestroy(): void {
    this.visNetworkService.off(this.visNetwork, 'click');
  }

  private clampZoom(current: number, min: number, max: number) {
    return Math.min(Math.max(current, min), max);
  }

  toggle(open: boolean) {
    this.open = open;
  }

  setDefault() {
    this.nodes.update(this.viewDefault.get());
    this.visNetworkService.setData(this.visNetwork, {
      nodes: this.viewDefault.get(),
      edges: this.edges,
    });
  }

  filter(filt: string) {
    //console.log(this.view.get());

    this.setFilter(filt);
    this.nodes.update(this.view.get());

    this.visNetworkService.setData(this.visNetwork, {
      nodes: this.view.get(),
      edges: this.edges,
    });
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>) {
    this.dialogService.open(content).subscribe();
  }

  search() {
    this.searching = true;
  }

  toggleSearch() {
    this.searching = false;
  }

  onChange(event: any) {
    //console.log(this.selectedNodeSearch);
    if (this.selectedNodeSearch) {
      const a = this.visNetworkService.getPositions(
        this.visNetwork,
        this.selectedNodeSearch.value
      );
      console.log(a[this.selectedNodeSearch.value]);
      this.visNetworkService.moveTo(this.visNetwork, {
        position: a[this.selectedNodeSearch.value],
        animation: {
          duration: 1000,
          easingFunction: 'easeOutQuad',
        },
        scale: 1.5,
      });
    }
    this.toggleSearch();
  }
}
