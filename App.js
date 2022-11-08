
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNote,
  delNote,
  editableNote
} from './app/noteSlice';
import { selectNote } from './app/noteSlice';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";



function App() {

  const note=useSelector(selectNote);
const dispatch=useDispatch();

const [header , setHeader] = useState('');
const [isVisiblePassNote , setIsVisiblePassNote] = useState(true);
const [textTextarea , setTextTextarea] = useState('');
const editIdRef = useRef(0);

  
  const AllNotes = (props) => {
    const arr=[];

    if(props.allNote) {
      props.allNote.map((str,id) => { 
          arr.push(<AllNoteItem key={id+1} id={id+1} text={str.text} header={str.header}/>)
      })
    }
    
    return arr;
  }

  const AllNoteItem = (props) => {
    return(
      <div className='itemNote'>
        <div className='textNoteDiv'>
          <div className='headNote'>{props.header}</div>
          <div className='textNote'>{props.text}</div>
        </div>
        <div className='buttonsNoteDiv'>
          <div id={props.id} onClick={deletNote} className='iconSVG'>
            <FontAwesomeIcon  icon={faTrashAlt} id={props.id}/>
          </div>
          <div  id={props.id} onClick={editNote} className='iconSVG'>
            <FontAwesomeIcon id={props.id}  icon={faPenToSquare} />
          </div>
        </div>

      </div>);
  }

  const deletNote = (event) => {
     const id=event.currentTarget.id;
     dispatch(delNote({'id': id}));
  }

  const editNote = (event) => {
    const id=event.currentTarget.id;
    editIdRef.current=id;
    setHeader(note[id-1].header);
    setTextTextarea(note[id-1].text);
    setIsVisiblePassNote(false);
  }

  const addNewNote = () => {

    const objNewNote = {
      'header':header,
      'text': document.getElementById('fillNewNote').value
    }

    dispatch(addNote(objNewNote));

    setHeader('');
    setTextTextarea('');

  }

  const passNote = () => {
    setIsVisiblePassNote(true);
    const objEditNote = {
      'new':{'header':header,
               'text': document.getElementById('fillNewNote').value,},
      'id': editIdRef.current
    }

    dispatch(editableNote(objEditNote));

    setHeader('');
    setTextTextarea('');
  }


  return (
    <div className="App">
    <header className="App-header">
     <div className='mainDiv'>
       <div className='newNoteMainDiv'>
        <div className='titleDiv'>Заголовок</div>
        <input  id='inputHeader' value={header} onChange={(event)=> {setHeader(event.target.value);}}/>
        <div>Текст заметки</div>
        <textarea id='fillNewNote' className='fillNewNote' value={textTextarea} onChange={(event)=> {setTextTextarea(event.target.value)}}></textarea>
        <button className='createNewNote' onClick={addNewNote}>Создать</button>
        <button className='createNewNote' disabled={isVisiblePassNote}  onClick={passNote}>Принять</button>
       </div>
       <div className='arrayOfNote'>
        { 
        ((note!==null) && (note!==undefined) && (JSON.stringify(note)!=='{}')) ? 
        
          <AllNotes allNote={note}/>
          :
          <></>
        }
       
       </div>
     </div>
    </header>
  </div>
  )
}

export default App;