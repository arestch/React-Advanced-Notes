import React, { Component } from 'react';
import Note from '../Note/Note';
import './NotesList.scss';

class NotesList extends Component {

	render() {

		return (
			<div className ="notes-list">
				<div className="notes-list__header">
					<form className="notes-list__form">
					<i className="fa fa-search"></i>
					<input type="text" className="notes-list__input" />
					<i className="fa fa-plus"></i>
					</form>
				</div>
				<div className="notes-list__tags">
					<span className="notes-list__span"> Tags <i className="fa fa-caret-down" aria-hidden="true"></i></span>
				</div>
					<Note />
					<Note />
					<Note />
					<Note />
			</div>
			);
	}

}

export default NotesList;
