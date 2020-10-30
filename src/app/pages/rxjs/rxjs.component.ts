import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// tslint:disable-next-line:import-blacklist

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  subscription: Subscription;

  constructor() {}
  ngOnInit() {
  }

}
