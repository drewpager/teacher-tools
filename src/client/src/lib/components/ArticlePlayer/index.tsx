import React from 'react';
import { Article } from '../../../graphql/generated';
import { Box } from '@mui/material';
import draftToHtml from 'draftjs-to-html';

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
    <Box>
      <h2>{article.title}</h2>
      <div className="article--body" dangerouslySetInnerHTML={{ __html: draftToHtml(newRawContent) }} />
    </Box>
  )
}