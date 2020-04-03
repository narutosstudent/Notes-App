import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component';
import { NotesFormComponent } from './components/notes-form/notes-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {FormsModule} from "@angular/forms";
import { NoteService } from './services/note.service';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NotesFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
