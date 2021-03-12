import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Marzipano from 'marzipano'

@Component({
  selector: 'app-transition',
  template: `
  <div #transition id="transition"></div>
  <button (click)="changeScene()">toggle</button>  
  `
})
export class TransitionComponent implements OnInit {

  @ViewChild('transition') transition: ElementRef

  beforeSource
  afterSource
  beforeScene
  afterScene
  currentScene
  beforeView
  afterView

  yaw: number = 0
  pitch: number = 0
  fov: number = .5707963267948966

  view

  constructor() { }

  ngOnInit(): void {
  }
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

    this.beforeSource = Marzipano.ImageUrlSource.fromString("../../assets/tiles/{z}/{f}/{y}/{x}.jpg", {
      cubeMapPreviewUrl: "../../assets/tiles/preview.jpg"
    })
    this.beforeView = new Marzipano.RectilinearView({
      "pitch": this.pitch,
      "yaw": this.yaw,
      "fov": this.fov
    }, limiter)

    this.beforeScene = viewer.createScene({
      source: this.beforeSource,
      geometry: geometry,
      view: this.beforeView,
      pinFirstLevel: true
    })

    this.afterSource = Marzipano.ImageUrlSource.fromString("../../assets/tiles/{z}/{f}/{y}/{x}.jpg", {
      cubeMapPreviewUrl: "../../assets/tiles/preview.jpg"
    })
    this.afterView = new Marzipano.RectilinearView({
      "pitch": this.pitch,
      "yaw": this.yaw,
      "fov": this.fov
    }, limiter)

    this.afterScene = viewer.createScene({
      source: this.afterSource,
      geometry: geometry,
      view: this.afterView,
      pinFirstLevel: true
    })

    this.nextScene().switchTo()

  }


  nextScene = () => {
    switch (this.currentScene) {
      case this.beforeScene:
        this.afterScene.view().setPitch(this.beforeScene.view().pitch())
        this.afterScene.view().setYaw(this.beforeScene.view().yaw())
        this.afterScene.view().setFov(this.beforeScene.view().fov())
        return (this.currentScene = this.afterScene)
      case this.afterScene:
        this.beforeScene.view().setPitch(this.afterScene.view().pitch())
        this.beforeScene.view().setYaw(this.afterScene.view().yaw())
        this.beforeScene.view().setFov(this.afterScene.view().fov())
        return (this.currentScene = this.beforeScene)
      default:
        return (this.currentScene = this.beforeScene)
    }
  }

  changeScene = () => {
    this.nextScene().switchTo({
      transitionDuration: 3
    })

  }
}
