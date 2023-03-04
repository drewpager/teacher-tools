import { useQuery } from '@apollo/client';
import React from 'react';
import { InfiniteLoader, List } from 'react-virtualized';
import { LESSONS } from '../../lib/graphql/queries/AllLessons'
import { Lessons } from '../../graphql/generated';

type Props = {
  index: number;
}

type loadProps = {
  startIndex: number;
  stopIndex: number;
}

type renderProps = {
  key: number;
  index: number;
  style: any;
}

export const TestElement = () => {
  // This example assumes you have a way to know/load this information
  const remoteRowCount: number = 700;


  function LoadMoreRows({ startIndex, stopIndex }: loadProps) {
    const lessons = useQuery(LESSONS, {
      variables: {
        first: startIndex,
      }
    })
  }

  function isRowLoaded({ index }: Props) {
    return !!lessons[index];
  }

  function rowRenderer({ key, index, style }: renderProps) {
    return (
      <div
        key={key}
        style={style}
      >
        {lessons[index]}
      </div>
    )
  }

  // Render your list
  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={LoadMoreRows}
      rowCount={remoteRowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          height={200}
          onRowsRendered={onRowsRendered}
          ref={registerChild}
          rowCount={remoteRowCount}
          rowHeight={20}
          rowRenderer={rowRenderer}
          width={300}
        />
      )}
    </InfiniteLoader>
  );
}