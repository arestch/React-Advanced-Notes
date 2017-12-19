import React, { Component } from 'react';
import './App.scss';

import NotesList from '../NotesList/NotesList';
import NoteEditor from '../NoteEditor/NoteEditor';
import NoteInfo from '../NoteInfo/NoteInfo';

class App extends Component {
	constructor(props) {
				super(props);
				this.state = {
					notes: [],
					showNotes: [],
					renderId: '',
					renderNote: [],
					saved: false,
					infoOpened: false,
					tags: []
			};
		}

	componentDidMount() {
			const savedNotes = JSON.parse(localStorage.getItem('notes'));
			const savedTags = JSON.parse(localStorage.getItem('tags'));
			if (savedNotes && (typeof savedNotes[0] !== "undefined")) {
				this.setState({
					notes: savedNotes,
					showNotes: savedNotes,
					renderId: savedNotes[0].id,
					renderNote: savedNotes[0]
				});
			}
			if (savedTags && (typeof savedTags[0] !== "undefined") && savedNotes && (typeof savedNotes[0] !== "undefined")) {
				this.setState({
					tags: savedTags
				})
			}
		}


	componentDidUpdate(prevProps, prevState) {
			if (prevState.notes !== this.state.notes) {
				this.saveToLocalStorage();
			}
			if (prevState.tags !== this.state.tags) {
				this.saveToLocalStorage();
			}
		}

	saveToLocalStorage() {
			const notes = JSON.stringify(this.state.notes);
			const tags = JSON.stringify(this.state.tags);
			localStorage.setItem('notes', notes);
			localStorage.setItem('tags', tags);
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
			let newTags = [];
			if (newNotes[0] !== undefined) {
				renderId = newNotes[0].id;
			}
			newNotes.forEach((item, i) => {
			item.tags.forEach((tag) => {
				if (newTags.indexOf(tag) === -1) {
					newTags.push(tag);
					}
				});
			});
			this.setState({
				notes: newNotes,
				showNotes: newNotes,
				renderId: renderId,
				tags: newTags,
				renderNote: this.state.notes[1],
				saved: false
			});
			
			this.saveToLocalStorage();
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

	onTextChange = (text, note) => {
		let index = this.state.notes.indexOf(note);
		let splittedString = text.split('\n');
		let title = splittedString[0];
		splittedString.shift();
		let newText = splittedString.join('\n');
		let newNotes = this.state.notes;
		newNotes[index].title = title;
		newNotes[index].text = newText;
		this.saveToLocalStorage();
	}

	handleTagAdd = () => {
		const index = this.state.notes.indexOf(this.state.renderNote);
		let newNotes = this.state.notes;
		let tags = this.state.tags;
		const tag = this._noteEditor.getData();
		newNotes[index].tags.push(tag);
		if(tags.indexOf(tag) === -1) {
			tags.push(tag);
		};
		this.setState({
			notes: newNotes,
			tags: tags
		});
		this.saveToLocalStorage();
	}

	closeInfo = () => {
		this.setState({
			infoOpened: false
		});
	}

	openInfo = () => {
		if(this.state.notes.length < 1) return false;
		this.setState({
			infoOpened: true
		});
	}
	getClickedTag = (tag) => {
		if (typeof tag === "undefined") {
			if (this.state.notes.length === 0) { return false };
			let notes = this.state.notes;
			this.setState({
					showNotes: notes,
					renderNote: notes[0],
					renderId: notes[0].id
		})
			return false;
		}
		let notes = this.state.notes;
		let newNotes = [];
		notes.forEach((item, i) => {
			if (item.tags.indexOf(tag) > -1) {
				newNotes.push(item);
			}
		})
		this.setState({
					showNotes: newNotes,
					renderNote: newNotes[0],
					renderId: newNotes[0].id
		})
	}
	render() {
		return (
			<div className="note-app">
			<NotesList notes={this.state.showNotes} showFullNote={this.noteShow} onNoteAdd={this.handleNoteAdd}
								 activeItemId={this.state.renderId} getClickedTag={this.getClickedTag} 
								 onSearchChange={this.onSearchChange} tags={this.state.tags} />
			<NoteEditor note={this.state.renderNote} onDelete={this.handleNoteDelete} 
									onTextChange={this.onTextChange} handleTagAdd={this.handleTagAdd} openInfo={this.openInfo}
									ref={(ref) => this._noteEditor = ref} />
			{ this.state.infoOpened &&
			<NoteInfo note={this.state.renderNote} closeInfo={this.closeInfo} />
			}
			</div>
		);
	}



}
export default App;