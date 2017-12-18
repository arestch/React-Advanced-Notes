import React, { Component } from 'react';
import './App.scss';

import NotesList from '../NotesList/NotesList';
import NoteEditor from '../NoteEditor/NoteEditor';

class App extends Component {
	constructor(props) {
				super(props);
				this.state = {
					notes: [],
					showNotes: [],
					renderId: '',
					renderNote: [],
					saved: false
			};
		}

	componentDidMount() {
			const savedNotes = JSON.parse(localStorage.getItem('notes'));
			if (savedNotes && (typeof savedNotes[0] !== "undefined")) {
				this.setState({
					notes: savedNotes,
					showNotes: savedNotes,
					renderId: savedNotes[0].id,
					renderNote: savedNotes[0]
				});
			} 
		}


	componentDidUpdate(prevProps, prevState) {
			if (prevState.notes !== this.state.notes) {
				this.saveToLocalStorage();
			}
		}

	saveToLocalStorage() {
			const notes = JSON.stringify(this.state.notes);
			localStorage.setItem('notes', notes);
		}

	handleNoteAdd = (newNote) => {
				this.setState({
					notes: [newNote, ...this.state.notes],
					showNotes: [newNote, ...this.state.notes],
					renderId: newNote.id,
					renderNote: newNote,
					saved: false
				});
		}

	handleNoteDelete = () => {
			let deleteId = this.state.renderId;
			let newNotes = this.state.notes.filter(function(el) { return el.id != deleteId; });
			let renderId = '';
			if (newNotes[0] !== undefined) {
				renderId = newNotes[0].id;
			}
			this.setState({
				notes: newNotes,
				showNotes: newNotes,
				renderId: renderId,
				renderNote: this.state.notes[1],
				saved: false
			});
	}

	noteShow = (id) => {
		let obj = this.state.notes;
		let renderObj = obj.find(function (key) { return key.id === id; });
		this.setState({
					renderNote: renderObj,
					renderId: id,
					saved: false
			});
	}

	onSearchChange = (event) => {
		let notes = this.state.notes;
		let value = event.target.value.toLowerCase();
		let newNotes = [];
		notes.forEach((item, i) => {
			let conText = item.text.toLowerCase() + item.title.toLowerCase();
			if (conText.includes(value)) {
				newNotes.push(item);
			}
		})
		this.setState({
					showNotes: newNotes,
					renderNote: newNotes[0]
		})
	}

	onTextChange = (text, changedNote) => {
		let title = text.split('\n')[0];
		let newText = text.replace(/.*\n/i, '');
		let index = this.state.notes.indexOf(changedNote);
		let newNotes = this.state.notes;
		newNotes[index].title = title;
		newNotes[index].text = newText;
		this.setState({
			notes: newNotes,
			showNotes: newNotes,
			saved: true
		})
		this.saveToLocalStorage();
	}

	render() {
		return (
			<div className="note-app">
			<NotesList notes={this.state.showNotes} showFullNote={this.noteShow} onNoteAdd={this.handleNoteAdd}
								 activeItemId={this.state.renderId} onSearchChange={this.onSearchChange} />
			<NoteEditor note={this.state.renderNote} onDelete={this.handleNoteDelete} onTextChange={this.onTextChange} saved={this.state.saved} />
			</div>
		);
	}



}
export default App;