import React, { Component } from 'react';
import './NoteEditor.scss';
import FullNote from '../FullNote/FullNote.js';

class NoteEditor extends Component {

	render() {
		const { showId, notes, onDelete } = this.props;
		return (
			<div className="note-editor">
				<div className="note-editor__header">
					<i className="fa fa-info-circle"></i>
					<i className="fa fa-clock-o"></i>
					<i className="fa fa-trash-o" onClick={() => onDelete(notes)} ></i>
					<i className="fa fa-ellipsis-h"></i>
				</div>
				<div className="notes-editor__tags">
						<form className="notes-editor__form">
							<input type="text" className="notes-editor__input" placeholder="Add tag..." />
						</form>
				</div>
				<div className="note-editor_full-note">  {
					notes.text &&
					<FullNote notes={notes} text={notes.text} />
				}
				</div>
			</div>
			);
	}

}

export default NoteEditor;
