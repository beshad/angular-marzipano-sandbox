import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import * as Marzipano from 'marzipano';

import { TransitionService } from '../transition.service';

@Component({
  selector: 'app-transition',
  template: `
    <div #transition id="transition"></div>
    <button (click)="setScene()">toggle</button>
  `,
})
export class TransitionComponent implements OnInit {
  @ViewChild('transition') transition: ElementRef<HTMLInputElement>;

  private beforeScene;
  private afterScene;

  constructor(
    private transitionService: TransitionService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //  just for testing
    this.renderer.setStyle(
      this.transition.nativeElement,
      'border',
      '5px solid #f66'
    );

    const viewer = new Marzipano.Viewer(this.transition.nativeElement, {
      stage: { progressive: true },
    });

    this.beforeScene = this.transitionService.createMarzipanoScene(
      viewer,
      '../../assets/tiles/kop4/{z}/{f}/{y}/{x}.jpg'
    );
    this.afterScene = this.transitionService.createMarzipanoScene(
      viewer,
      '../../assets/tiles/kop5/{z}/{f}/{y}/{x}.jpg'
    );

    this.setScene();
  }

  public setScene = (): void => {
    this.transitionService
      .nextScene(this.beforeScene, this.afterScene)
      .switchTo({
        transitionDuration: 1000,
      });
  };
}
