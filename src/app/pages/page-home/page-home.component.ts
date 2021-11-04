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

  public selectedNode: any;
  items = ['Individuo', 'Organizacion'];
  testValue = new FormControl(this.items[0]);
  open = false;

  public view: DataView<Node>;

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
      const d = eventData[1].nodes;
      if (eventData[0] === this.visNetwork && d.length > 0) {
        // console.log(this.nodes.get(d));
        this.selectedNode = this.nodes.get(d);
        this.toggle(true);
      }
    });
  }

  public ngOnInit(): void {
    this.ngxLoader.start();
    this.graphService.getGraph().subscribe((data) => {
      this.nodes = new DataSet<Node>(data.nodes);
      this.edges = new DataSet<Edge>(data.edges);
      this.visNetworkData = { nodes: this.nodes, edges: this.edges };

      this.view = new DataView(this.nodes, {
        filter: function (item) {
          return item.group == 'Tecnologia';
        },
      });

      this.visNetworkOptions = {
        nodes: {
          shape: 'dot',
          mass: 1,
          size: 16,
          shapeProperties: {
            borderRadius: 1,
          },
        },
        edges: {
          arrows: {
            to: true,
          },
        },
      };
    });
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

  filter() {
    console.log(this.view.get());

    this.nodes.update(this.view.get());

    this.visNetworkService.setData(this.visNetwork, {
      nodes: this.view.get(),
      edges: this.edges,
    });
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>) {
    this.dialogService.open(content).subscribe();
  }
}
