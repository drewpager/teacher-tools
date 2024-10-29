import { type ReactNode, type ReactElement, useEffect, useRef, useState } from 'react';
import { draggable, dropTargetForElements, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Viewer } from '../../graphql/generated';
import { css, jsx } from '@emotion/react';
import "./testElement.scss";

import king from './icons/king.png';
import pawn from './icons/pawn.png';

type props = {
  viewer: Viewer;
}

export type Coord = [number, number];

export type PieceRecord = {
  type: PieceType;
  location: Coord;
};

export type SquareProps = {
  pieces: PieceRecord[];
  location: Coord;
  children?: ReactNode;
}

export type PieceType = 'king' | 'pawn';

type PieceProps = {
  location: Coord;
  pieceType: PieceType;
  image: string;
  alt: string;
};

const pieceTypes: PieceType[] = ['king', 'pawn'];

export function isCoord(token: unknown): token is Coord {
  return (
    Array.isArray(token) && token.length === 2 && token.every((val) => typeof val === 'number')
  );
}

export function isEqualCoord(c1: Coord, c2: Coord): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}

export function isPieceType(value: unknown): value is PieceType {
  return typeof value === 'string' || pieceTypes.includes(value as PieceType);
}

export const pieceLookup: {
  [Key in PieceType]: (location: [number, number]) => ReactElement;
} = {
  king: (location) => <King location={location} />,
  pawn: (location) => <Pawn location={location} />,
};

type HoveredState = 'idle' | 'validMove' | 'invalidMove';

export function canMove(
  start: Coord,
  destination: Coord,
  pieceType: PieceType,
  pieces: PieceRecord[],
) {
  const rowDist = Math.abs(start[0] - destination[0]);
  const colDist = Math.abs(start[1] - destination[1]);

  if (pieces.find((piece) => isEqualCoord(piece.location, destination))) {
    return false;
  }

  switch (pieceType) {
    case 'king':
      return [0, 1].includes(rowDist) && [0, 1].includes(colDist);
    case 'pawn':
      return colDist === 0 && start[0] - destination[0] === -1;
    default:
      return false;
  }
}

export const Square = ({ pieces, location, children }: SquareProps) => {
  const squareRef = useRef(null);
  const [state, setState] = useState<HoveredState>('idle');

  useEffect(() => {
    const element = squareRef.current;

    if (!element) {
      return;
    }

    dropTargetForElements({
      element: element,
      getData: () => ({ location }),
      canDrop: ({ source }) => {
        if (
          !isCoord(source.data.location)
        ) {
          return false;
        }

        return !isEqualCoord(source.data.location, location);
      },
      onDragEnter: ({ source }) => {
        if (
          !isCoord(source.data.location) ||
          !isPieceType(source.data.pieceType)
        ) {
          return
        }

        if (canMove(source.data.location, location, source.data.pieceType, pieces)) {
          setState('validMove');
        } else {
          setState('invalidMove');
        }
      },
      onDragLeave: () => setState('idle'),
      onDrop: () => setState('idle'),
    });
  }, [pieces, location]);

  const isDark = (location[0] + location[1]) % 2 === 1;

  function getColor(state: HoveredState, isDark: boolean): string {
    if (state === 'validMove') {
      return 'lightgreen';
    }

    if (state === 'invalidMove') {
      return 'pink'
    }

    return isDark ? 'lightgrey' : 'white';
  }

  return (
    <div className="square--styles" style={{ backgroundColor: getColor(state, isDark) }} ref={squareRef}>
      {children}
    </div>
  );
}

function renderSquares(pieces: PieceRecord[]) {
  const squares = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareCoord: Coord = [row, col];

      const piece = pieces.find((piece) => isEqualCoord(piece.location, squareCoord));


      squares.push(<Square pieces={pieces} location={squareCoord}>{piece && pieceLookup[piece.type](squareCoord)}</Square>);
    }
  }
  return squares;
}

export const TestElement = ({ viewer }: props) => {
  const [pieces, setPieces] = useState<PieceRecord[]>([
    { type: 'king', location: [3, 2] },
    { type: 'pawn', location: [1, 6] },
  ])

  useEffect(() => {
    return monitorForElements({
      onDrop: ({ source, location }) => {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          return;
        }

        const desinationLocation = destination.data.location;
        const sourceLocation = source.data.location;
        const pieceType = source.data.pieceType;

        if (!isCoord(desinationLocation) || !isCoord(sourceLocation) || !isPieceType(pieceType)) {
          return;
        }

        const piece = pieces.find((p) => isEqualCoord(p.location, sourceLocation));
        const restOfPieces = pieces.filter((p) => p !== piece);

        if (canMove(sourceLocation, desinationLocation, pieceType, pieces) && piece !== undefined) {
          setPieces([{ type: pieceType, location: desinationLocation }, ...restOfPieces]);
        }
      }
    })
  }, [pieces])

  return <div className="chessboard--styles">{renderSquares(pieces)}</div>;
}

function Piece({ location, pieceType, image, alt }: PieceProps) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    draggable({
      element: el,
      getInitialData: () => ({ location, pieceType }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    })
  }, [location, pieceType]);

  return (<img
    className={dragging ? "hide-image--styles" : "image--styles"}
    src={image}
    alt={alt}
    ref={ref}
  />);
}

export function King({ location }: { location: [number, number] }) {
  return <Piece location={location} pieceType={'king'} image={king} alt="King" />;
}

export function Pawn({ location }: { location: [number, number] }) {
  return <Piece location={location} pieceType={'pawn'} image={pawn} alt="Pawn" />;
}
