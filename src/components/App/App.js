import React, { Component } from 'react';
import './App.scss';

import NotesList from '../NotesList/NotesList';
import NoteEditor from '../NoteEditor/NoteEditor';

class App extends Component {
	constructor(props) {
				super(props);
				this.state = {
					notes: []
				};
		}

	componentDidMount() {
			const savedNotes = JSON.parse(localStorage.getItem('notes'));

			if (savedNotes) {
				this.setState({
					notes: savedNotes
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
			console.log('save');
			localStorage.setItem('notes', notes);
		}

	handleNoteAdd = (newNote) => {
				console.log(123);
				this.setState({
					notes: [newNote, ...this.state.notes]
				});
		}	
	render() {
		return (
			<div className="note-app">
			<NotesList notes={this.state.notes}  onNoteAdd={this.handleNoteAdd}/>
			<NoteEditor/>
			</div>
		);
	}



}
export default App;