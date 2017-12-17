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

			if (savedNotes) {
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
					notes: [newNote, ...this.state.notes]
				});
		}

	noteShow = (id) => {
		let obj = this.state.notes;
		let renderObj = obj.find(function (key) { return key.id === id; });
		this.setState({
					renderNote: renderObj
			});
	}

	render() {
		// console.log(this.state.renderNote);
		return (
			<div className="note-app">
			<NotesList notes={this.state.notes} showFullNote={this.noteShow} onNoteAdd={this.handleNoteAdd}/>
			<NoteEditor notes={this.state.renderNote} />
			</div>
		);
	}



}
export default App;