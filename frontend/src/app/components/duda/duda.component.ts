import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-duda',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './duda.component.html',
  styleUrl: './duda.component.scss'
})
export class DudaComponent {

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  form_duda = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    edad: new FormControl('', [Validators.required, Validators.min(15), Validators.max(80)]),
    pregunta: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  form_respuesta = new FormGroup({
    id_duda: new FormControl('', [Validators.required]),
    respuesta: new FormControl('', [Validators.required]),
    satisfactoria: new FormControl('', [Validators.required]),
  })

  enviar_duda(){
    if(this.form_duda.invalid){
      Swal.fire({
        title: "Error",
        text: "Por favor, rellene todos los campos correctamente",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#004080"
      });
      return;
    }
    this.usuarioService.enviar_duda(this.form_duda.value).subscribe({
      next: (data:any) => {
        const respuesta = data.respuesta;
        Swal.fire({
          title: "Respuesta",
          text: `${respuesta}`,
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#004080",
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      },
      error: (error) => {
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al enviar la duda",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#004080"
        });
      }
    })
  }
}
