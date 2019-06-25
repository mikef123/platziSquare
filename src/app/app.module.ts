import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { ResaltarDirective } from './directives/resaltar.directive';
import { ContarClicksDirective } from './directives/contar-clicks.directive';
import { Routes, RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { LugaresComponent } from './lugares/lugares.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LugaresService } from './services/lugares.service';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule} from '@angular/fire/auth'
import { Observable } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { CrearComponent } from './crear/crear.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { linkifystrPipe } from './pipes/linkystr.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBU1o8BdsDZ0-p-LEZNgiqkjZA3vTrgBUg',
    authDomain: 'platzisquare-1555036542504.firebaseapp.com',
    databaseURL: 'https://platzisquare-1555036542504.firebaseio.com',
    projectId: 'platzisquare-1555036542504',
    storageBucket: 'platzisquare-1555036542504.appspot.com',
    messagingSenderId: '685305350928'
  }
};

const appRoutes: Routes = [
  {path:'', component: LugaresComponent},
  {path:'lugares', component: LugaresComponent},
  {path:'detalle/:id', component: DetalleComponent},
  {path:'contacto', component: ContactoComponent},
  {path:'crear/:id', component: CrearComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    linkifystrPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'PlatziSquare'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAokeFPjsGUD9OElN1-By5fDCZsXBo3Mt8'
    }),
  ],
  providers: [LugaresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
