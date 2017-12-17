import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Note.scss';

class Note extends Component {

	static propTypes = {
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		text: PropTypes.string

	}

	render() {
		const { title, text, showNote, id} = this.props;
		return (
				<div className="notes-list__note" onClick={() => showNote(id)} >
				<h4 className="notes-list__title">{title}</h4>
					{{text} &&
					<p className="notes-list__text">{text}</p>}
				</div>
			);
	}

}

export default Note;
