import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [
  { path: 'e', component: DataTableComponent }, // Correct path syntax
  { path: '', redirectTo: 'e', pathMatch: 'full' } // Redirect root to 'e'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


