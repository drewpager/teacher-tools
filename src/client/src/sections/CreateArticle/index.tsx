import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import './createArticle.scss';
import { Viewer } from '../../graphql/generated';
import { Editor, EditorState, RawDraftContentState } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import { Footer } from '../../lib/components';
import draftToHtml from 'draftjs-to-html';

type Props = {
  viewer: Viewer;
}

export const CreateArticle = ({ viewer }: Props) => {
  const [editorState, setEditorState] = useState<EditorState | undefined>(undefined);
  const rawContent = editorState && convertToRaw(editorState.getCurrentContent())
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={7} xl={6}>
          <Box className='createArticle-heading'>
            <h1>Create Article</h1>
            <Editor
              editorClassName='createArticle-editor'
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
            <Button variant="contained">Create</Button>
          </Box>
        </Grid>
        <Grid item xs={0} sm={0} md={0} lg={5} xl={6}>
          <Box className='previewArticle'>
            <h2>Preview Article</h2>
            {rawContent && (<div dangerouslySetInnerHTML={{ __html: draftToHtml(rawContent) }} />)}
            {/* {editorState?.getCurrentContent().getPlainText()} */}
          </Box>
        </Grid>
      </Grid>
      <Footer viewer={viewer} />
    </Box>
  )
}