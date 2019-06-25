import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { debug } from 'util';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-crear',
    templateUrl: './crear.component.html'
})
export class CrearComponent {
    lugar: any = {};
    id: any = null;
    constructor(private lugarService: LugaresService, private route: ActivatedRoute) {
        this.id = this.route.snapshot.params['id'];
        if (this.id !== 'new') {
            this.lugarService.getLugar(this.id)
                .valueChanges().subscribe((lugar) => {
                    this.lugar = lugar;
                });
        }
    }
    guardarLugar() {
        let direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
        this.lugarService.obtenerGeoData(direccion)
            .subscribe((result: any) => {
                this.lugar.lat = result.results[0].geometry.location.lat;
                this.lugar.lng = result.results[0].geometry.location.lng;
                if (this.id !== 'new') {
                    this.lugarService.editarLugar(this.lugar);
                    alert('Negocio modificado con éxito!');
                }
                else {
                    this.lugar.id = Date.now().toString();;
                    this.lugarService.guardarLugar(this.lugar);
                    alert('Negocio guardado con éxito!');
                }
                this.lugar = {};
            });
    }
}