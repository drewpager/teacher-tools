import React from 'react';
import { Article } from '../../../graphql/generated';
import { Box, Divider, Typography } from '@mui/material';
import draftToHtml from 'draftjs-to-html';
import ArticleIcon from '@mui/icons-material/Article';
import './articlePlayer.scss';

interface Props {
  article: Article
}

function reverseEntityMapArray(entityMapArray: Array<any>) {
  let rawEntity: any = {
    entityMap: {}
  };

  for (let i = 0; i < entityMapArray.length; i++) {
    rawEntity.entityMap[i] = entityMapArray[i];
  }

  return rawEntity;
}

function removeTypenameFields(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item: any) => removeTypenameFields(item));
  }

  const newObj: any = {};

  for (const key in obj) {
    if (key !== "__typename") {
      newObj[key] = removeTypenameFields(obj[key]);
    }
  }

  return newObj;
}

export const ArticlePlayer = ({ article }: Props) => {
  let newEntityMap = reverseEntityMapArray([article?.content?.entityMap])
  let rawContent = {
    blocks: article?.content?.blocks,
    entityMap: newEntityMap.entityMap[0]
  }
  let newRawContent = removeTypenameFields(rawContent);

  return (
    <Box className="article--player-section">
      <Box className="article--player-header">
        <ArticleIcon color='secondary' sx={{ marginRight: '5px', fontSize: '40px', marginTop: "41px" }} />
        <h2 className='article--title'>{article.title}</h2>
      </Box>
      <Divider />
      <div className="article--body" dangerouslySetInnerHTML={{ __html: draftToHtml(newRawContent) }} />
    </Box>
  )
}