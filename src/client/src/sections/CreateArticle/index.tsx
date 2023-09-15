import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Chip, Switch, Tooltip, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import './createArticle.scss';
import { Viewer, Article, useCreateArticleMutation } from '../../graphql/generated';
import { Editor, EditorState } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import { Footer } from '../../lib/components';
import draftToHtml from 'draftjs-to-html';
import { useNavigate } from 'react-router-dom';

type Props = {
  viewer: Viewer;
}

let initialArticle: Article = {
  title: '',
  content: {
    blocks: [],
    entityMap: []
  },
  creator: '',
  public: true
}

const LockSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 2,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M22 4v-.5C22 2.12 20.88 1 19.5 1S17 2.12 17 3.5V4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-.8 0h-3.4v-.5c0-.94.76-1.7 1.7-1.7s1.7.76 1.7 1.7V4zm-2.28 8c.04.33.08.66.08 1 0 2.08-.8 3.97-2.1 5.39-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H7v-2h2c.55 0 1-.45 1-1V8h2c1.1 0 2-.9 2-2V3.46c-.95-.3-1.95-.46-3-.46C5.48 3 1 7.48 1 13s4.48 10 10 10 10-4.48 10-10c0-.34-.02-.67-.05-1h-2.03zM10 20.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L8 16v1c0 1.1.9 2 2 2v1.93z" /></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 25 25"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" /></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export const CreateArticle = ({ viewer }: Props) => {
  const [editorState, setEditorState] = useState<EditorState | undefined>(undefined);
  const rawContent = editorState && convertToRaw(editorState.getCurrentContent())
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [locked, setLocked] = useState<boolean>(false);
  const navigate = useNavigate();

  const [createArticle, { data, loading, error }] = useCreateArticleMutation({
    variables: {
      input: {
        title: "",
        content: {
          blocks: [],
          entityMap: [],
        },
        creator: `${viewer.id}`,
        public: !locked
      }
    }
  })

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography variant="h3" color="error">{error.message}</Typography>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rawContent && title) {
      let entityMapLength = Object.keys(rawContent.entityMap).length;
      let entityMapArray = [];
      for (let i = 0; i < entityMapLength; i++) {
        entityMapArray.push(rawContent.entityMap[i])
      }
      initialArticle.title = `${title}`;
      initialArticle.content = {
        blocks: [...rawContent.blocks],
        entityMap: [...entityMapArray],
      };
      initialArticle.creator = `${viewer.id}`;
      initialArticle.public = !locked;
    }

    await createArticle({
      variables: {
        input: initialArticle
      }
    })

    navigate(`/user/${viewer.id}`, { replace: true })
  }


  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={7} xl={6}>
          <Box className='createArticle-heading'>
            <form onSubmit={handleSubmit}>
              <h1>Create Article</h1>
              <TextField
                title='Article Title'
                label="Article Title"
                sx={{ width: '100%' }}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Editor
                editorClassName='createArticle-editor'
                editorState={editorState}
                onEditorStateChange={setEditorState}
              />
              <Button variant="contained" type='submit'>Create</Button>
              <Tooltip title={locked ? "Private" : "Public"}>
                <LockSwitch
                  checked={locked}
                  onChange={() => setLocked(!locked)}
                /></Tooltip>
            </form>
          </Box>
        </Grid>
        <Grid item xs={0} sm={0} md={0} lg={5} xl={6}>
          <Box className='previewArticle'>
            <Chip label="Preview Article" variant="filled" />
            <h2>{title}</h2>
            {/* {rawContent && console.log(draftToHtml(rawContent))} */}
            {rawContent && (<div dangerouslySetInnerHTML={{ __html: draftToHtml(rawContent) }} />)}
          </Box>
        </Grid>
      </Grid>
      <Footer viewer={viewer} />
    </Box>
  )
}