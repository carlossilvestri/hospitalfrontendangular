import { Component, Inject, OnInit } from '@angular/core';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor( public ajustes: SettingsService ) { }

  ngOnInit() {
    // this.colocarCheck();
  }

}
