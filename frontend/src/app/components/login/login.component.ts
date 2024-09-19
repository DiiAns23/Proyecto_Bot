import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide: boolean = true;

  form_login = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    recuerdame: new FormControl(false),
  })

  
  login(){
    if(this.form_login.invalid){
      Swal.fire({
        title: "Error",
        text: "Por favor, rellene todos los campos correctamente",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#004080"
      });
      return;
    }

    const usuario = this.form_login.get('usuario')?.value;
    const password = this.form_login.get('password')?.value;
    const recuerdame = this.form_login.get('recuerdame')?.value;

    if(usuario==='admin_pap' && password==='admin_pap'){
      Swal.fire({
        title: "Bienvenido",
        text: "Has iniciado sesión correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#004080"
      });
    }else{
      Swal.fire({
        title: "Error",
        text: "Usuario o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#004080"
      });
    }
  }


}
