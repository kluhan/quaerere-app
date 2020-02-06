import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleComponent } from './demographic/google/google.component';
import { FacebookComponent } from './demographic/facebook/facebook.component';
import { LinkerComponent } from './linker/linker.component';
import { NeoFfiComponent } from './tests/neo-ffi/neo-ffi.component';
import { SelectorComponent } from './selector/selector.component';
import { ResultComponent } from './result/result.component';
import { TokenGeneratorComponent } from './token-generator/token-generator.component';

const routes: Routes = [
  { path: 'demographic/google', component: GoogleComponent },
  { path: 'demographic/facebook', component: FacebookComponent },
  { path: 'linker', component: LinkerComponent },
  { path: 'tests/neo-ffi', component: NeoFfiComponent},
  { path: 'selector', component: SelectorComponent},
  { path: 'result', component: ResultComponent},
  { path: 'token-generator', component: TokenGeneratorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
