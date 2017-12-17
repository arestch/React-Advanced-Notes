import React, { Component } from 'react';

class NoteEditor extends Component {

	render() {

		return (
			<div className="note-editor">
				<div className="note-editor__header">
					<i className="fa fa-info-circle"></i>
					<i className="fa fa-clock-o"></i>
					<i className="fa fa-trash-o"></i>
				</div>
			</div>
			);
	}

}

export default NoteEditor;
