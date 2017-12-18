import React, { Component } from 'react';
import './NoteEditor.scss';
import FullNote from '../FullNote/FullNote.js';
class NoteEditor extends Component {
	constructor() {
		super();
		this.state = {
			text: '',
			noteSaved: false,
			tagSaved: false,
			tagError: false,
		}
	}

	inputChange = (e) => {
		this.setState({
			text: e.target.value
		});
	}

	onTagAdd = (e) => {
		if (this.state.text.trim().length < 3) {
			e.preventDefault();
			this.setState({
			tagError: true,
			noteSaved: false
			});
			return false;
		}
		this.setState({
			text: '',
			tagError: false,
			tagSaved: true,
			noteSaved: false
		});
		e.preventDefault();
		this.props.handleTagAdd();
	}
	getData = () => {
		return this.state.text;
	}
	noteTextChange = (event) => {
		this.setState({
			noteSaved: true,
			tagSaved: false,
			tagError: false,
		});
		this.props.onTextChange(event, this.props.note);
	}
	render() {
		const { showId, note, onDelete, onTextChange, openInfo } = this.props;
		return (
			<div className="note-editor">
				<div className="note-editor__header">
					<i className="fa fa-info-circle"
						onClick={openInfo}></i>
					<i className="fa fa-clock-o"></i>
					<i className="fa fa-trash-o"
					 onClick={onDelete} ></i>
					<i className="fa fa-ellipsis-h"></i>
				</div>
				<div className="notes-editor__tags">
						<form className="notes-editor__form"
									 onSubmit={this.onTagAdd} >
							<input type="text" className="notes-editor__input" 
							value={this.state.text} onChange={this.inputChange} placeholder="Add tag..."/>
						</form>
						{
							this.state.noteSaved &&
							<span className="notes-editor__saved" >Note saved</span>
						}
						{	
							this.state.tagSaved &&
							<span className="notes-editor__saved notes-editor__saved--tagsaved" >Tag Added</span>
						}
						{	
							this.state.tagError &&
							<span className="notes-editor__saved notes-editor__saved--error" >Tag must be at least 3 characters long!</span>
						}
				</div>
				<div className="note-editor_full-note">  {
					note && (Object.keys(note).length > 0) &&
					<FullNote note={note} onTextChange={this.noteTextChange}/>
				}
				</div>
			</div>
			);
	}

}

export default NoteEditor;
