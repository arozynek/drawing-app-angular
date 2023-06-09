import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DrawComponent } from './draw/draw.component';


const routes: Routes = [
  {
    path: '',
    component: DrawComponent,
  },
 
  {
    path: 'about',
    component: AboutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
