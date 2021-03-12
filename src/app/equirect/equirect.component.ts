import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import * as Marzipano from 'marzipano'

@Component({
  selector: 'app-equirect',
  template: '<div #pano class="pano" id="pano"></div>'
})
export class EquirectComponent implements OnInit {


  @ViewChild('pano') pano: ElementRef

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {

    const panoElement = this.pano.nativeElement

    var viewerOpts = {
      controls: {
        mouseViewMode: 'drag'
      }
    }

    const viewer = new Marzipano.Viewer(panoElement, viewerOpts)

    const limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180)
    const view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);

    const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }])

    const source = Marzipano.ImageUrlSource.fromString("../../assets/angra.jpg")
    // var source = Marzipano.ImageUrlSource.fromString("../assets/tiles/pano/{z}/{y}/{x}.jpg")

    const scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    })

    scene.switchTo()

  }

}
