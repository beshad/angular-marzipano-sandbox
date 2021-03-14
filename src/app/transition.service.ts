import { Injectable } from '@angular/core'
import * as Marzipano from 'marzipano'

@Injectable({
  providedIn: 'root'
})
export class TransitionService {
  
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
  
  constructor() { }

  constructMarzipanoView = (viewer, tile) => {

    const source = Marzipano.ImageUrlSource.fromString(tile)
    return  viewer.createScene({
      source,
      geometry: this.geometry,
      view: this.view,
      pinFirstLevel: true
    })
  }

  public readonly manageState = (currentScene, newScene): void => {
    newScene.view().setParameters({
      pitch: currentScene.view().pitch(),
      yaw: currentScene.view().yaw()
    })

  }

}
