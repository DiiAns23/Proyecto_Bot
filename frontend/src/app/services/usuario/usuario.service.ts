import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  http = inject(HttpClient);
  router = inject(Router);

  enviar_duda(formulario:any){
    const ruta = 'https://pap.fixsolutionss.com/api/usuario/nueva_pregunta';
    return this.http.post(ruta, formulario, { headers: { 'Content-Type': 'application/json' } });
  }

  respuesta_correcta(formulario:any){
    const ruta = 'https://pap.fixsolutionss.com/api//usuario/respuesta_correcta';
    return this.http.post(ruta, formulario, { headers: { 'Content-Type': 'application/json' } });
  }

  dudas(){
    const ruta = 'https://pap.fixsolutionss.com/api/usuario/dudas';
    return this.http.get(ruta, { headers: { 'Content-Type': 'application/json' } });
  }
}
