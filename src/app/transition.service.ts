import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class TransitionService {

  constructor() { }

  public readonly manageState = (currentScene, newScene): void => {
    newScene.view().setParameters({
      pitch: currentScene.view().pitch(),
      yaw: currentScene.view().yaw()
    })
    
  }

}
