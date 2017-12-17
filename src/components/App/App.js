import React, { Component } from 'react';
import './App.scss';

import NotesList from '../NotesList/NotesList';
import NoteEditor from '../NoteEditor/NoteEditor';

class App extends Component {

	render() {
		return (
			<div className="note-app">
			<NotesList />


			<NoteEditor />
			</div>
		);
	}



}
export default App;