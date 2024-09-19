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

  async enviar_duda(){
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

    let respuesta = '';
    await this.usuarioService.enviar_duda(this.form_duda.value).subscribe({
      next: (data:any) => {
        this.form_respuesta.get('id_duda')?.setValue(data.id_duda);
        this.form_respuesta.get('respuesta')?.setValue(data.respuesta);
        respuesta = data.respuesta;
        if(respuesta.includes('No se encontró')){
          Swal.fire({
            title: "Respuesta",
            text: `${respuesta}`,
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#004080",
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(() => {
            window.location.reload();
          });
        }else{
          this.get_respuesta(respuesta);
        }
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

  async get_respuesta(respuesta:any){
    const {value: select} = await Swal.fire({
      title: "Respuesta",
      text: `${respuesta}`,
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#004080",
      input: "select",
      inputOptions: {
        Si: 'Si',
        No: 'No'
      },
      inputPlaceholder: "¿La respuesta fue satisfactoria?",
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          debugger;
          if (value === "No") {
            this.form_respuesta.get('satisfactoria')?.setValue('0');
            this.usuarioService.respuesta_correcta(this.form_respuesta.value).subscribe({});
            resolve();
          } else if(value === "Si"){
            this.form_respuesta.get('satisfactoria')?.setValue('1');
            this.usuarioService.respuesta_correcta(this.form_respuesta.value).subscribe({});
            resolve();
          }else{
            resolve("Por favor, selecciona una opción");
          }
        });
      }
    });
    if(select === 'No'){
      Swal.fire({
        title: "Respuesta",
        text: `Gracias por enviar tu duda, te responderemos lo más pronto posible por correo electrónico.`,
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#004080",
      }).then(() => {
        window.location.reload();
      });
    }else if(select === 'Si'){
      Swal.fire({
        title: "Respuesta",
        text: `Gracias por tu respuesta.`,
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#004080",
      }).then(() => {
        window.location.reload();
      });
    }
  }
}
