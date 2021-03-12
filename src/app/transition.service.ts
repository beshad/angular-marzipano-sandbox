import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class TransitionService {

  constructor() { }

  public readonly manageState = (currentScene, newScene): void => {
    const pitch: number = currentScene.view().pitch()
    const yaw: number = currentScene.view().yaw()
    newScene.view().setPitch(pitch)
    newScene.view().setYaw(yaw)
  }

}
