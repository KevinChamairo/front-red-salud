import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.scss']
})
export class ExpedienteComponent implements OnInit {
  public nameFile : string = ''
  public responseUrl : string = ''
  public diagnostico: any [] = []
  public diagnosticos: any [] = []
  public diagnosticosForm : any []=[]
  constructor(    private fb: FormBuilder,) { }
  mostrarArchivo(){
    if(this.responseUrl !== ''){
      window.open(this.responseUrl, '_blank');
    }
  }
  ngOnInit(): void {
  }

  upload(event: any): void {


  }
  delete(item2:any){
    console.log("item2",item2)
    console.log("aea",this.diagnostico.filter(item=>item.id == item2))
    console.log("array", this.diagnostico)
    let filtrado = this.diagnostico.filter((item) => item.id!== item2)
    this.diagnostico =  filtrado
  }

  addComent(item:any){
    item.comentario = true
    let index = this.diagnostico.findIndex(i => i.id == item.id)

    this.diagnostico[index] = item

  }
  addDiagnostico(){
    this.diagnostico.push({
      id: this.diagnostico.length
    })



      this.diagnosticosForm.push(
        this.fb.group({
          id: [this.diagnostico.length],
          diagnostico: [''],
          tipo : [''],
          motivo: [''],
          comentario: [''],
        })
      );


      console.log("form",this.diagnosticosForm[0].value)

  }

}
