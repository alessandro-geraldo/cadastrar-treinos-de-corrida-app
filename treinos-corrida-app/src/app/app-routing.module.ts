import { AuthenticationGuard } from './util/authentication.guard';
import { CorridaComponent } from './corrida/corrida.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandPageComponent } from './land-page/land-page.component';

const routes: Routes = [
  { path: 'inicio', component: LandPageComponent },
  { path: 'corrida', component: CorridaComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})

export class AppRoutingModule { }
