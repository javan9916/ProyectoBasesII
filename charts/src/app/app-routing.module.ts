import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';

export const ROUTES : Routes = [
  {
      path: '', redirectTo: 'charts', pathMatch: 'full'
  },
  {
    path: 'charts', component: ChartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
