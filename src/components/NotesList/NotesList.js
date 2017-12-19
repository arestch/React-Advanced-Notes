import React, { Component } from 'react';
import Note from '../Note/Note';
import './NotesList.scss';

class NotesList extends Component {

	constructor() {
		super();
		this.state = {
			tagsActive: false
		}
	}

	handleNoteAdd = (event) => {
		const newNote =	{
				title: 'New note',
				text: 'Note text',
				id: Date.now(),
				tags: []
		}
		this.props.onNoteAdd(newNote);
	}

	onTagsClick = () => {
		const tagsActive = !this.state.tagsActive;
		this.setState({
			tagsActive: tagsActive
		});
	
	}

	onTagClick = (tag) => {
		this.setState({
			tagsActive: false
		});
		this.props.getClickedTag(tag);
	}

	render() {
		const { notes, showFullNote, activeItemId, onSearchChange, tags } = this.props;
		return (
			<div className ="notes-list">
				<div className="notes-list__header">
					<form className="notes-list__form">
					<i className="fa fa-search"></i>
					<input type="text" className="notes-list__input" onChange={onSearchChange} />
					<i className="fa fa-plus" onClick={this.handleNoteAdd}></i>
					</form>
				</div>
				<div className="notes-list__tags">
					<span className="notes-list__span" onClick={this.onTagsClick}> Tags <i className="fa fa-caret-down" aria-hidden="true"></i></span>
				</div>
				{ this.state.tagsActive && 
				<div className="notes-list__tags-list">
					<ul className="notes-list__list">
						<li className="notes-list__item" 
								onClick={() => this.onTagClick()}>
							No tags
						</li>
					{
											tags.map(tag => 
												<li className="notes-list__item"
														key={tag}
														onClick={() => this.onTagClick(tag)} >
														{tag} </li>)}
					</ul>
				</div>
			}
				<div className="notes" ref={c => this.grid = c}> 
					{ notes.map(note => 
							<Note 
									key={note.id}
									id={note.id}
									title={note.title}
									text={note.text.split('\n')[0]}
									showNote={showFullNote}
									active={activeItemId === note.id}
										/>)
									}
				</div>
			</div>
			);
	}

}

export default NotesList;
