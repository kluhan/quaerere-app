import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleComponent } from './demographic/google/google.component';
import { FacebookComponent } from './demographic/facebook/facebook.component';
import { FoodFrequencyComponent } from './tests/food-frequency/food-frequency.component';
import { CarCostComponent } from './tests/car-cost/car-cost.component';
import { LinkerComponent } from './linker/linker.component';
import { NeoFfiComponent } from './tests/neo-ffi/neo-ffi.component';

const routes: Routes = [
  { path: 'demographic/google', component: GoogleComponent },
  { path: 'demographic/facebook', component: FacebookComponent },
  { path: 'linker', component: LinkerComponent },
  { path: 'tests/food-frequency', component: FoodFrequencyComponent},
  { path: 'tests/car-cost', component: CarCostComponent},
  { path: 'tests/neo-ffi', component: NeoFfiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
