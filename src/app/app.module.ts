import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChallengeWrapperComponent } from "./components/challenge-wrapper/challenge-wrapper.component";
import { ChallengeOneComponent } from "./components/challenges/challenge-one/challenge-one.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AutoFormatPipe } from "./auto-format.pipe";

@NgModule({
  declarations: [
      AppComponent,
    ChallengeWrapperComponent,
    ChallengeOneComponent,
    AutoFormatPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
