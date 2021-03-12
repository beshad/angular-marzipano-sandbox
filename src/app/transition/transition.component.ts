import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
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

  public beforeSource
  public afterSource
  public beforeScene
  public afterScene
  public currentScene
  public beforeView
  public afterView

  public yaw: number = 0
  public pitch: number = 0
  public fov: number = .5707963267948966

  constructor() { }

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


  private readonly nextScene = () => {
    switch (this.currentScene) {
      case this.beforeScene:
        this.manageState(this.beforeScene, this.afterScene)
        return (this.currentScene = this.afterScene)
      case this.afterScene:
        this.manageState(this.afterScene, this.beforeScene)
        return (this.currentScene = this.beforeScene)
      default:
        return (this.currentScene = this.beforeScene)
    }
  }

  private readonly manageState = (currentScene, newScene): void => {
    const pitch: number = currentScene.view().pitch()
    const yaw: number = currentScene.view().yaw()
    const fov: number = currentScene.view().fov()
    newScene.view().setPitch(pitch)
    newScene.view().setYaw(yaw)
    newScene.view().setFov(fov)
  }

  public changeScene = (): void => {
    this.nextScene().switchTo({
      transitionDuration: 1000
    })

  }
}
