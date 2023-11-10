import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MessageSenderComponent } from './message-sender/message-sender.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/threema-message', pathMatch: 'full'
  },
  {
    path: 'threema-message', component: MessageSenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
