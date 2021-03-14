import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core'
import * as Marzipano from 'marzipano'

import { TransitionService } from '../transition.service'

@Component({
  selector: 'app-transition',
  template: `
  <div #transition id="transition"></div>
  <button (click)="changeScene()">toggle</button>  
  `
})
export class TransitionComponent implements OnInit {

  @ViewChild('transition') transition: ElementRef<HTMLInputElement>

  private beforeScene
  private afterScene
  private currentScene

  constructor(private transitionService: TransitionService, private renderer: Renderer2) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {

    //  just for testing
    this.renderer.setStyle(this.transition.nativeElement, 'border', '5px solid #f66')

    const viewer = new Marzipano.Viewer(this.transition.nativeElement, { stage: { progressive: true } })

    this.beforeScene = this.transitionService.constructMarzipanoView(viewer, "../../assets/tiles/kop4/{z}/{f}/{y}/{x}.jpg")
    this.afterScene = this.transitionService.constructMarzipanoView(viewer, "../../assets/tiles/kop5/{z}/{f}/{y}/{x}.jpg")

    this.nextScene().switchTo()

  }

  private readonly nextScene = () => {
    switch (this.currentScene) {
      case this.beforeScene:
        this.transitionService.manageState(this.beforeScene, this.afterScene)
        return (this.currentScene = this.afterScene)
      case this.afterScene:
        this.transitionService.manageState(this.afterScene, this.beforeScene)
        return (this.currentScene = this.beforeScene)
      default:
        return (this.currentScene = this.beforeScene)
    }
  }

  public changeScene = (): void => {
    this.nextScene().switchTo({
      transitionDuration: 1000
    })

  }
}
