import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { CostsComponent } from './core/costs/costs.component';
import { HomeComponent } from './core/home/home.component';
import { InvocedetailComponent } from './core/invocedetail/invocedetail.component';
import { OperationresultComponent } from './core/operationresult/operationresult.component';
import { RatetermsComponent } from './core/rateterms/rateterms.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'costs/:id', component: CostsComponent },
  { path: 'rate-terms', component: RatetermsComponent },
  { path: 'result/:id', component: OperationresultComponent },
  { path: 'invoice-detail/:id', component: InvocedetailComponent },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    data: { appbar: false },
  },
  { path: '**', redirectTo: '/authentication' },
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
