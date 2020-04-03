import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note';
import { v4 as uuidv4 } from 'uuid';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss']
})
export class NotesFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;

  isNew: boolean = true;


  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.selectedNote.subscribe(note => {
      if (note.id !== null) {
        this.isNew = false;
        this.id = note.id;
        this.text = note.text;
        this.date = note.date;
      }
    });
  }


  onSubmit() {
    if (this.isNew) {
      const newNote = {
        id: uuidv4(),
        text: this.text,
        date: new Date()
      }

      this.noteService.addNote(newNote);
    } else {
      const updNote = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      this.noteService.updateNote(updNote)
    }

    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = "";
    this.text = "";
    this.date = "";
    this.noteService.clearState();
  }

}
