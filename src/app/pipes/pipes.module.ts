import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Mis Pipes
import { ImagenPipe } from '../pipes/imagen.pipe';

@NgModule({
  declarations: [ImagenPipe],
  imports: [],
  exports: [ImagenPipe],
})
export class PipesModule {}
