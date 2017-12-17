import React, { Component } from 'react';
import './Note.scss';

class Note extends Component {

	render() {

		return (
				<div className="notes-list__note">
				<h4 className="notes-list__title"> Note! </h4>
					<p className="notes-list__text">+ Note text! </p>
				</div>
			);
	}

}

export default Note;
