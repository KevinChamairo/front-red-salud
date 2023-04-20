import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acordeon-medicinas',
  templateUrl: './acordeon-medicinas.component.html',
  styleUrls: ['./acordeon-medicinas.component.scss']
})
export class AcordeonMedicinasComponent implements OnInit {
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
