import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { readAllNotes } from '../services/noteService';
import { useNavigate } from 'react-router-dom';
import { StyledBackButton } from '../styles/GlobalStyles';


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

const Header = styled.h1`
  margin-bottom: 20px;
`;

const NoteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  width: 100%;
`;

const NoteDiv = styled.div`
  flex-grow: 1;
`;

const EditButton = styled.button`
  align-self: flex-end;
  color: #060606;
`;

const NoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #000000;
  width: calc(25% - 10px);
  box-sizing: border-box;
  min-height: 200px;
  padding: 10px;
  overflow: auto;
  background-color: ${() => '#' + Math.floor(Math.random()*16777215).toString(16)};
`;


const Note = ({note}) => {
  const [edit, setEdit] = useState(false);

  return (
    <NoteWrapper >
      <EditButton  onClick={() => setEdit(!edit)}>
        {edit ? 'Stop Editing' : 'Edit Note'}
      </EditButton>
      <NoteDiv  contentEditable={edit}>{note}</NoteDiv>
    </NoteWrapper>
  );
};


function MyNotes() {

  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const fetchAllNotes = async ()=>{
    const allNotes = await readAllNotes();
    console.log(allNotes);
      setNotes(allNotes);
  }

  useEffect(() => {
      fetchAllNotes();
    
  }, []);

  return (
    <PageContainer>

     <StyledBackButton onClick={()=>(navigate("/notes"))}>
      Go back
    </StyledBackButton>
      <Header>My Notes</Header>
      <NoteContainer>

        {notes.map((note) => (
          <Note key={note.id} note={note.content} />
        ))}
      </NoteContainer>
    </PageContainer>
  );
}

export default MyNotes;