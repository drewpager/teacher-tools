import React, {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { FormControl, Select, MenuItem, InputLabel, IconButton, Menu, Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import ReactDOM from 'react-dom';
import invariant from 'tiny-invariant';

import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { token } from '@atlaskit/tokens';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import { triggerPostMoveFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash';

type ItemPosition = 'first' | 'last' | 'middle' | 'only';

type CleanupFn = () => void;

type ItemEntry = { itemId: string; element: HTMLElement };

type ListContextValue = {
  getListLength: () => number;
  registerItem: (entry: ItemEntry) => CleanupFn;
  reorderItem: (args: {
    startIndex: number;
    indexOfTarget: number;
    closestEdgeOfTarget: Edge | null;
  }) => void;
  instanceId: symbol;
};

let ListContext = createContext<ListContextValue | null>(null);

const useListContext = () => {
  const listContext = useContext(ListContext);
  // invariant(listContext !== null);
  if (!listContext) {
    throw new Error("useListContext must be used within a ListContext.Provider");
  }
  return listContext;
}

type Item = {
  id: string;
  label: string;
}

const itemKey = Symbol('item');
type ItemData = {
  [itemKey]: true;
  item: Item;
  index: number;
  instanceId: symbol;
}

function getItemData({
  item,
  index,
  instanceId,
}: {
  item: Item;
  index: number;
  instanceId: symbol;
}): ItemData {
  return {
    [itemKey]: true,
    item,
    index,
    instanceId,
  };
}

function isItemData(data: Record<string | symbol, unknown>): data is ItemData {
  return data[itemKey] === true;
}

function getItemPosition({ index, items }: { index: number; items: Item[] }): ItemPosition {
  if (items.length === 1) {
    return 'only';
  }

  if (index === 0) {
    return 'first';
  }

  if (index === items.length - 1) {
    return 'last';
  }

  return 'middle';
}

type DraggableState =
  | { type: 'idle' }
  | { type: 'preview', container: HTMLElement }
  | { type: 'dragging' };

const defaultItems: Item[] = [
  {
    id: 'task-1',
    label: 'Organize a team-building event',
  },
  {
    id: 'task-2',
    label: 'Create and maintain office inventory',
  },
  {
    id: 'task-3',
    label: 'Update company website content',
  },
  {
    id: 'task-4',
    label: 'Plan and execute marketing campaigns',
  },
  {
    id: 'task-5',
    label: 'Coordinate employee training sessions',
  },
  {
    id: 'task-6',
    label: 'Manage facility maintenance',
  },
  {
    id: 'task-7',
    label: 'Organize customer feedback surveys',
  },
  {
    id: 'task-8',
    label: 'Coordinate travel arrangements',
  },
];

const idleState: DraggableState = { type: 'idle' };
const draggingState: DraggableState = { type: 'dragging' };

function DropDownContent({ position, index }: { position: ItemPosition; index: number }) {
  const { reorderItem, getListLength } = useListContext();

  const isMoveUpDisabled = position === 'first' || position === 'only';
  const isMoveDownDisabled = position === 'last' || position === 'only';

  const moveToTop = useCallback(() => {
    reorderItem({
      startIndex: index,
      indexOfTarget: 0,
      closestEdgeOfTarget: null
    });
  }, [index, reorderItem]);

  const moveUp = useCallback(() => {
    reorderItem({
      startIndex: index,
      indexOfTarget: index - 1,
      closestEdgeOfTarget: null
    });
  }, [index, reorderItem]);

  const moveDown = useCallback(() => {
    reorderItem({
      startIndex: index,
      indexOfTarget: index + 1,
      closestEdgeOfTarget: null
    });
  }, [index, reorderItem]);

  const moveToBottom = useCallback(() => {
    reorderItem({
      startIndex: index,
      indexOfTarget: getListLength() - 1,
      closestEdgeOfTarget: null
    });
  }, [index, getListLength, reorderItem]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <DragIndicatorIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 'max-content',
              width: '20ch',
            },
          },
        }}
      >
        <MenuItem key={1} onClick={moveUp} disabled={isMoveUpDisabled}>
          Move Up
        </MenuItem>
        <MenuItem key={2} onClick={moveDown} disabled={isMoveDownDisabled}>
          Move Down
        </MenuItem>
        <MenuItem key={3} onClick={moveToTop} disabled={isMoveUpDisabled}>
          Move To Top
        </MenuItem>
        <MenuItem key={4} onClick={moveToBottom} disabled={isMoveDownDisabled}>
          Move To Bottom
        </MenuItem>
      </Menu>
    </div>
  )
}

function ListItem({
  item,
  index,
  position
}: {
  item: Item;
  index: number;
  position: ItemPosition;
}) {
  const { registerItem, instanceId } = useListContext();
  const ref = useRef<HTMLDivElement | null>(null);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

  const dragHandleRef = useRef<HTMLButtonElement>(null);

  const [draggableState, setDraggableState] = useState<DraggableState>(idleState);

  useEffect(() => {
    const element = ref.current;
    const dragHandle = dragHandleRef.current;
    if (element === null || dragHandle === null) {
      return;
    }
    // invariant(element);
    // invariant(dragHandle);

    const data = getItemData({ item, index, instanceId });
    return combine(
      registerItem({ itemId: item.id, element }),
      draggable({
        element: dragHandle,
        getInitialData: () => data,
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: "16px",
              y: "8px"
            }),
            render({ container }) {
              setDraggableState({ type: 'preview', container });

              return () => setDraggableState(draggingState);
            }
          });
        },
        onDragStart() {
          setDraggableState(draggingState);
        },
        onDrop() {
          setDraggableState(idleState);
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          return isItemData(source.data) && source.data.instanceId === instanceId;
        },
        getData({ input }) {
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['top', 'bottom'],
          })
        },
        onDrag({ self, source }) {
          const isSource = source.element === element;

          if (isSource) {
            setClosestEdge(null);
            return
          }

          const closestEdge = extractClosestEdge(self.data);

          const sourceIndex: number | any = source.data.index;
          // invariant(typeof sourceIndex === 'number');

          const isItemBeforeSource = index === sourceIndex - 1;
          const isItemAfterSource = index === sourceIndex + 1;

          const isDropIndicatorHidden =
            (isItemBeforeSource && closestEdge === 'bottom') ||
            (isItemAfterSource && closestEdge === 'top');

          if (isDropIndicatorHidden) {
            setClosestEdge(null);
            return;
          }

          setClosestEdge(closestEdge);
        },
        onDragLeave() {
          setClosestEdge(null);
        },
        onDrop() {
          setClosestEdge(null);
        },
      }),
    );
  }, [instanceId, item, index, registerItem]);

  return (
    <>
      <Box ref={ref}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: closestEdge ? "1px dashed blue" : 'none',
          }}
        >
          <div style={{ flex: 1 }}>
            {item.label}
          </div>
          <Box ref={dragHandleRef}>
            <DropDownContent position={position} index={index} />
          </Box>
        </div>
        {closestEdge && <DropIndicator edge={closestEdge} gap="1px" />}
      </Box>
      {draggableState.type === 'preview' &&
        ReactDOM.createPortal(<div>{item.label}</div>,
          draggableState.container
        )}
    </>
  )
}

function getItemRegistry() {
  const registry = new Map<string, HTMLElement>();

  function register({ itemId, element }: ItemEntry) {
    registry.set(itemId, element);

    return function unregister() {
      registry.delete(itemId);
    };
  }

  function getElement(itemId: string) {
    return registry.get(itemId) ?? null;
  }

  return { register, getElement };
}

type ListState = {
  items: Item[];
  lastCardMoved: {
    item: Item;
    previousIndex: number;
    currentIndex: number;
    numberOfItems: number;
  } | null;
};

export const CreateLessonPlan = () => {
  const [{ items, lastCardMoved }, setListState] = useState<ListState>({
    items: defaultItems,
    lastCardMoved: null,
  });
  const [registry] = useState(getItemRegistry);

  const [instanceId] = useState(() => Symbol('instance-id'));

  const reorderItem = useCallback(
    ({
      startIndex,
      indexOfTarget,
      closestEdgeOfTarget,
    }: {
      startIndex: number;
      indexOfTarget: number;
      closestEdgeOfTarget: Edge | null;
    }) => {
      const finishIndex = getReorderDestinationIndex({
        startIndex,
        indexOfTarget,
        closestEdgeOfTarget,
        axis: 'vertical',
      });

      if (finishIndex === startIndex) {
        return;
      }

      setListState((listState) => {
        const item = listState.items[startIndex];

        return {
          items: reorder({
            list: listState.items,
            startIndex,
            finishIndex,
          }),
          lastCardMoved: {
            item,
            previousIndex: startIndex,
            currentIndex: finishIndex,
            numberOfItems: listState.items.length,
          },
        };
      });
    }, [],
  );

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return isItemData(source.data) && source.data.instanceId === instanceId;
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;

        if (!isItemData(sourceData) || !isItemData(targetData)) {
          return;
        }

        const indexOfTarget = items.findIndex((item) => item.id === targetData.item.id);
        if (indexOfTarget < 0) {
          return;
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        reorderItem({
          startIndex: sourceData.index,
          indexOfTarget,
          closestEdgeOfTarget,
        });
      },
    });
  }, [instanceId, items, reorderItem]);

  useEffect(() => {
    if (lastCardMoved === null) {
      return;
    }
    const { item, previousIndex, currentIndex, numberOfItems } = lastCardMoved;
    const element = registry.getElement(item.id);

    if (element) {
      triggerPostMoveFlash(element);
    }
  }, [lastCardMoved, registry]);

  const getListLength = useCallback(() => items.length, [items.length]);

  const contextValue: ListContextValue = useMemo(() => {
    return {
      registerItem: registry.register,
      reorderItem,
      instanceId,
      getListLength
    }
  }, [registry.register, reorderItem, instanceId, getListLength]);

  return (
    <ListContext.Provider value={contextValue}>
      <div style={{ marginTop: "10rem" }}>
        {items.map((item, index) => (
          <ListItem
            key={item.id}
            item={item}
            index={index}
            position={getItemPosition({ index, items })}
          />
        ))}
      </div>
    </ListContext.Provider>
  );
}