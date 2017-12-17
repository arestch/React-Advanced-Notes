import React, { Component } from 'react';
import './App.scss';

import NotesList from '../NotesList/NotesList';
import NoteEditor from '../NoteEditor/NoteEditor';

class App extends Component {
	constructor(props) {
				super(props);
				this.state = {
					notes: [],
					renderId: '',
					renderNote: []
			};
		}

	componentDidMount() {
			const savedNotes = JSON.parse(localStorage.getItem('notes'));
			if (savedNotes && (typeof savedNotes[0] !== "undefined")) {
				this.setState({
					notes: savedNotes,
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
					renderId: newNote.id
				});
		}

	handleNoteDelete = () => {
			let deleteId = this.state.renderId;
			let newNotes = this.state.notes.filter(function(el) { return el.id != deleteId; }); 
			this.setState({
				notes: newNotes
			});
	}

	noteShow = (id) => {
		let obj = this.state.notes;
		let renderObj = obj.find(function (key) { return key.id === id; });
		this.setState({
					renderNote: renderObj,
					renderId: id
			});
	}

	render() {
		return (
			<div className="note-app">
			<NotesList notes={this.state.notes} showFullNote={this.noteShow} onNoteAdd={this.handleNoteAdd}
								 activeItemId={this.state.renderId} />
			<NoteEditor notes={this.state.renderNote} onDelete={this.handleNoteDelete} />
			</div>
		);
	}



}
export default App;