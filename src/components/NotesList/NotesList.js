import React, { Component } from 'react';
import Note from '../Note/Note';
import './NotesList.scss';

class NotesList extends Component {

	handleNoteAdd = (event) => {
		const newNote =	{
				title: 'New note',
				text: 'Note text',
				id: Date.now()
		}
		this.props.onNoteAdd(newNote);
	}

	render() {
		const { notes, showFullNote } = this.props;
		return (
			<div className ="notes-list">
				<div className="notes-list__header">
					<form className="notes-list__form">
					<i className="fa fa-search"></i>
					<input type="text" className="notes-list__input" />
					<i className="fa fa-plus" onClick={this.handleNoteAdd}></i>
					</form>
				</div>
				<div className="notes-list__tags">
					<span className="notes-list__span"> Tags <i className="fa fa-caret-down" aria-hidden="true"></i></span>
				</div>
				<div className="notes" ref={c => this.grid = c}> 
					{ notes.map(note => 
							<Note 
									key={note.id}
									id={note.id}
									title={note.title}
									text={note.text}
									showNote={showFullNote}
										/>)
									}
				</div>
			</div>
			);
	}

}

export default NotesList;
