import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-respuesta',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './respuesta.component.html',
  styleUrl: './respuesta.component.scss'
})
export class RespuestaComponent implements OnInit {
  @ViewChild('dataTable', { static: false }) table: ElementRef = new ElementRef('table-dudas');
  columnas:any = [];

  listado_dudas:any = [];

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(){
    
    this.usuarioService.dudas().subscribe({
      next: (data:any) => {
        this.listado_dudas = data.dudas;
        this.columnas = Object.keys(this.listado_dudas[0]);
        if(this.table && this.table.nativeElement){
          this.iniciar_tabla();
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  iniciar_tabla(){
    const labelData = {
      placeholder: 'Buscar...',
      searchTitle: 'Buscar dentro de la tabla',
      perPage: 'Registros por página',
      noRows: 'No se encontraron registros',
      info: 'Registros de {start} a {end} de {rows} (Página {page} de {pages} páginas)',
    }
    
//  let data_table = new (window as any).simpleDatatables.DataTable(this.table.nativeElement, {
    let data_table = new (window as any).simpleDatatables.DataTable(this.table.nativeElement, {
      data: {
        headings: this.columnas,
        data: this.listado_dudas
      },
      labels: labelData,
      });

      (window as any).datatable = data_table;
  }  

}
