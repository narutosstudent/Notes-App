import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[];
  selectedNote: Note;

  constructor(private noteService: NoteService) {
   }

  ngOnInit() {
    this.noteService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedNote = {id: "", text: "", date: ""}
      }
    })

    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  onSelect(note: Note) {
    this.noteService.setFormNote(note);
    this.selectedNote = note;
  }

  onDelete(note: Note) {
    this.noteService.deleteNote(note);
  }



}
