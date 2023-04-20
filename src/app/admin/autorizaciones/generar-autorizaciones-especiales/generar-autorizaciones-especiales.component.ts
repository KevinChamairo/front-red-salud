import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AutorizacionesService } from '../services/autorizaciones.service';

@Component({
  selector: 'app-generar-autorizacion',
  templateUrl: './generar-autorizaciones-especiales.component.html',
  styleUrls: ['./generar-autorizaciones-especiales.component.scss']
})
export class GenerarAutorizacionesEspecialesComponent implements OnInit {
  public filtroFG = new FormGroup({});
  public dniError : boolean = false
  public oaError: boolean = false
  public loading: boolean = false;
  public mostrartabla: boolean = false;
  public dataAfiliado : any [] = [];
  public ordenAtencion : string = ''
  constructor(private fb: FormBuilder, private services: AutorizacionesService) {}

  ngOnInit(): void {

    this.filtroFG = this.fb.group({
      dni: ['', Validators.required],
      oa: ['', Validators.required],
    });
  }



  consultar(){

    if(this.filtroFG.valid){
      let bodyRequest = {
        dni : this.filtroFG.get('dni')?.value,
        oa : this.filtroFG.get('oa')?.value
      }

      this.loading = true;
      try {
        this.services.consultarAfiliado(bodyRequest).subscribe((data: any) => {
          this.loading = false;

          if(data.error){
            this.mostrartabla = false
            this.dataAfiliado = []
            alert('Error no se Encontro al Asegurado')
          }else{
            this.mostrartabla = true;
            this.dataAfiliado = data
            this.ordenAtencion =  this.filtroFG.get('oa')?.value
          }


        });
      } catch (error) {
        this.loading = false

        alert('Ocurrio un error')
      }

    }else{
      alert("Complete los campos")
    }

  }



  resetear(e:any){
    if (e == 'limpiar') {
      this.mostrartabla = false


    }
  }
}
