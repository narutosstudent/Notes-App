import {Injectable} from '@angular/core';
import {Note} from '../models/note';
import {Observable, of, BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class NoteService {
    notes: Note[];


  private noteSource = new BehaviorSubject<Note>({id: null, text: null, date: null});

  selectedNote = this.noteSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);

  stateClear = this.stateSource.asObservable();

    constructor() {
        this.notes = [];
    }

    getNotes(): Observable<Note[]> {
        if(localStorage.getItem("notes") === null) {
            this.notes = [];
        } else {
             this.notes = JSON.parse(localStorage.getItem("notes"));
        }

        return of(this.notes.sort((a, b) => {
            return b.date = a.date;
        }));
    }

    updateNote(note: Note) {
      this.notes.forEach((cur, index) => {
        if (note.id === cur.id) {
          this.notes.splice(index, 1);
        }
      });
      this.notes.unshift(note);

      localStorage.setItem("notes", JSON.stringify(this.notes));
    }

    addNote(note: Note) {
      this.notes.unshift(note);

      localStorage.setItem("notes", JSON.stringify(this.notes));
    }

    setFormNote(note: Note) {
      this.noteSource.next(note);
    }

    deleteNote(note: Note) {
      this.notes.forEach((cur, index) => {
        if (note.id === cur.id) {
          this.notes.splice(index, 1);
        }
      });
      
      localStorage.setItem("notes", JSON.stringify(this.notes));
    }


    clearState() {
      this.stateSource.next(true);
    }
}
