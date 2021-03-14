import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
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

  @ViewChild('transition') transition: ElementRef

  public beforeScene
  public afterScene
  public currentScene

  constructor(private transitionService: TransitionService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {

    const panoElement = this.transition.nativeElement
    const viewer = new Marzipano.Viewer(panoElement, { stage: { progressive: true } })

    // Create geometry.
    const geometry = new Marzipano.CubeGeometry([
      {
        "tileSize": 256,
        "size": 256,
        "fallbackOnly": true
      },
      {
        "tileSize": 512,
        "size": 512
      },
      {
        "tileSize": 512,
        "size": 1024
      }
    ])

    // Create view.
    const limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180, 120 * Math.PI / 180)

    const beforeSource = Marzipano.ImageUrlSource.fromString("../../assets/tiles/kop4/{z}/{f}/{y}/{x}.jpg")
    const beforeView = new Marzipano.RectilinearView({
      "pitch": 0,
      "yaw": 0,
      "fov": .5707963267948966
    }, limiter)

    this.beforeScene = viewer.createScene({
      source: beforeSource,
      geometry: geometry,
      view: beforeView,
      pinFirstLevel: true
    })

    const afterSource = Marzipano.ImageUrlSource.fromString("../../assets/tiles/kop5/{z}/{f}/{y}/{x}.jpg")
    const afterView = new Marzipano.RectilinearView({
      "pitch": 0,
      "yaw": 0,
      "fov": .5707963267948966
    }, limiter)

    this.afterScene = viewer.createScene({
      source: afterSource,
      geometry: geometry,
      view: afterView,
      pinFirstLevel: true
    })

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
