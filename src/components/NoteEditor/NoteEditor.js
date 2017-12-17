import React, { Component } from 'react';
import './NoteEditor.scss';


class NoteEditor extends Component {

	render() {

		return (
			<div className="note-editor">
				<div className="note-editor__header">
					<i className="fa fa-info-circle"></i>
					<i className="fa fa-clock-o"></i>
					<i className="fa fa-trash-o"></i>
					<i className="fa fa-ellipsis-h"></i>
				</div>
				<div className="notes-editor__tags">
						<form className="notes-editor__form">
							<input type="text" className="notes-editor__input" placeholder="Add tag..." />
						</form>
				</div>
			</div>
			);
	}

}

export default NoteEditor;
