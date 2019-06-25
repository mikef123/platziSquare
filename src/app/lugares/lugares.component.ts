import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  animations : [
    trigger('contenedorAnimable', [
      state('inicial', style({
        opacity: 0,
        backgroundColor: 'blue',
        transform: 'rotate3d(0,0,0,0deg)'
      })),
      state('final', style({
        opacity:1,
        backgroundColor: 'green',
        transform: 'rotate3d(5,10,20,40deg)'
      })),
      transition('inicial => final', animate(1000)),
      transition('final => inicial', animate(500)),

    ] )
  ]
})
export class LugaresComponent {
  title = 'PlatziSquare';
  state= 'final';
  lat:number = 4.6171368;
  lng:number = -74.0887572;
  lugares = null;
  animar() {
    this.state = (this.state === 'final') ? 'inicial' : 'final';
  }
  constructor(private lugaresService: LugaresService){
    lugaresService.getLugares()
    .subscribe(lugares => {
      this.lugares =lugares
    });
  }
}
