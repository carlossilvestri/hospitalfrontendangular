import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { map, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  label = '';

  constructor(
    private router: Router,
    public title: Title,
    public meta: Meta
   ) {

    this.getDataRoute()
      .subscribe( (data: any) => {

        this.label = data.titulo;
        this.title.setTitle( this.label );

        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.label
        };

        this.meta.updateTag(metaTag);

      });

  }

  getDataRoute() {

    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd  ),
       filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
       map( (evento: ActivationEnd) => evento.snapshot.data )
    );
  }
  ngOnInit() {
    console.log(this.getDataRoute());
  }
}
