import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import {convertToRaw, convertFromRaw, EditorState, ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Btn from '../common/Btn';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {addNew , requestOwnNews, updateNew , removeNew} from '../../redux/mainReducer';


let Create = (props) => {
	let id = +props.match.params.id;
	let article, myStateEditor, title, img;
	let [editorState,setEditorState] = useState();
	let [input,setInput] = useState('');
	let [name,setName] = useState('');
	let [error,setError] = useState(false);
	let [success,setSuccess] = useState('');
	let [info, setInfo] = useState(false);

	let html = editorState ? draftToHtml(convertToRaw(editorState.getCurrentContent())) : '';
	let data = {img: input, text: html, title: name};
	let executeSubmit = (obj, fun) => {
		if(input && name && html) {
			fun(obj);
			setSuccess(true);
			setInput('');
			setName('');
			setEditorState('');
			setError(false);
		} else {
			setError(true);
			setTimeout(()=>setError(false), 2000)
		}
	}
	let submitNew = (obj) => {
		executeSubmit(obj, props.addNew);
	}
	let updateNew = (obj) => {
		obj.id = id;
		executeSubmit(obj, props.updateNew);
	}
	let deleteNew = (id) => {
		if (window.confirm('Вы действительно хотите удалить эту статью?')) {
			props.removeNew(id);
			setInfo(true);
			setInput('');
			setName('');
			setEditorState('');
			setError(false);
		}
	}
	if(id) {
		article = props.ownNews && props.ownNews.find(a => a.id === id);
		myStateEditor = article && EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(article.description).contentBlocks));
		title = article && article.title;
		img = article && article.urlToImage;
	}
	useEffect(()=>{
		props.requestOwnNews();
	}, [id])
	useEffect(()=>{
		setEditorState(myStateEditor);
		setInput(img);
		setName(title);
	}, [article])
	return  <div className="create">
				<Header title={id ? `Редактировать статью ` : 'Создать статью'} />
				<div className="create__low-zone">
					<div className="input__zone">
						<p className="">Название статьи: </p>
						<input type="text" className="input" value={name} onChange={event => setName(event.target.value)} />
					</div>
				</div>
				<Editor
				  editorState={editorState}
				  wrapperClassName="editor-wrap"
				  editorClassName="editor"
				  onEditorStateChange={setEditorState}
				/>
				<div className="create__low-zone">
					<div className="input__zone">
						<p className="">Ссылка на картинку статьи: </p>
						<input type="text" className="input" value={input} onChange={event => setInput(event.target.value)} />
					</div>
					<div className="create__btn-zone">
							{success && <p className="сreate__info">Статья сохранена</p>}
							{info && <p className="сreate__info">Статья удалена</p>}
							{error && <p className="сreate__error">Ошибка</p>}
						{id ? <>
							<Btn text="Сохранить статью" fun={()=>updateNew(data)} />
							<Btn text="Удалить статью" fun={()=>deleteNew(id)} />
							</>: 
							<Btn text="Сохранить статью" fun={()=>submitNew(data)} /> }
						
					</div>
				</div>
			</div>
}
let mapStateToProps = state => ({
	news: state.main.news,
	ownNews: state.main.ownNews
})
export default compose(withRouter, connect(mapStateToProps, {addNew, requestOwnNews, updateNew, removeNew}))(Create);