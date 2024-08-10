import { Routes } from '@angular/router';
import { DudaComponent } from './components/duda/duda.component';
import { RespuestaComponent } from './components/respuesta/respuesta.component';


export const routes: Routes = [
    { path: 'duda', component: DudaComponent },
    { path: 'respuesta', component: RespuestaComponent },
    { path: '', redirectTo: '/duda', pathMatch: 'full' },
];
