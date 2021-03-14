import { Injectable, ElementRef } from '@angular/core'
import * as Marzipano from 'marzipano'


@Injectable({
  providedIn: 'root'
})
export class TransitionService {

  private currentScene

  private readonly limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180, 120 * Math.PI / 180)

  private readonly geometry = new Marzipano.CubeGeometry([
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

  private readonly view = new Marzipano.RectilinearView({
    "pitch": 0,
    "yaw": 0,
    "fov": .5707963267948966
  }, this.limiter)


  public readonly createMarzipanoScene = (viewer, tilesPath: string) => {

    const source = Marzipano.ImageUrlSource.fromString(tilesPath)
    return viewer.createScene({
      source,
      geometry: this.geometry,
      view: this.view,
      pinFirstLevel: true
    })
  }

  private readonly maintainPointOfView = (currentScene, nextScene): void => {
    nextScene.view().setParameters({
      pitch: currentScene.view().pitch(),
      yaw: currentScene.view().yaw()
    })

  }

  public readonly nextScene = (beforeScene, afterScene) => {
    switch (this.currentScene) {
      case beforeScene:
        this.maintainPointOfView(beforeScene, afterScene)
        return (this.currentScene = afterScene)
        case afterScene:
        this.maintainPointOfView(afterScene, beforeScene)
        return (this.currentScene = beforeScene)
      default:
        return (this.currentScene = beforeScene)
    }
  }

}
