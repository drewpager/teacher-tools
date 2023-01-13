"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPlaylist = exports.useEditFocus = void 0;
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_2 = require("react");
const generated_1 = require("../../graphql/generated");
const generated_2 = require("../../graphql/generated");
const utils_1 = require("../../lib/utils");
const react_router_dom_1 = require("react-router-dom");
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const react_router_dom_2 = require("react-router-dom");
require("../CreatePlaylist/createPlaylist.scss");
const useEditFocus = () => {
    const ref = (0, react_2.useRef)(null);
    (0, react_2.useEffect)(() => {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    return ref;
};
exports.useEditFocus = useEditFocus;
const EditPlaylist = ({ viewer }) => {
    let navigate = (0, react_router_dom_2.useNavigate)();
    const params = (0, react_router_dom_1.useParams)();
    const [playlist, setPlaylist] = (0, react_2.useState)();
    const [searchInput, setSearchInput] = (0, react_2.useState)("");
    const [lessons, setLessons] = (0, react_2.useState)([]);
    const [filter, setFilter] = (0, react_2.useState)(lessons);
    const inputRef = (0, exports.useEditFocus)();
    const { data: PlaylistData, loading: PlaylistLoading, error: PlaylistError } = (0, generated_2.usePlaylistQuery)({
        variables: {
            id: `${params.id}`
        }
    });
    const { data, loading, error } = (0, generated_2.useAllLessonsQuery)({
        variables: {
            limit: 10,
            page: 1
        }
    });
    const [updatePlan] = (0, generated_1.useUpdatePlanMutation)({
        variables: {
            input: playlist,
            id: `${params.id}`
        }
    });
    const lessonQuery = data ? data.allLessons.result : null;
    (0, react_2.useEffect)(() => {
        setPlaylist({
            id: PlaylistData === null || PlaylistData === void 0 ? void 0 : PlaylistData.playlist.id,
            name: PlaylistData === null || PlaylistData === void 0 ? void 0 : PlaylistData.playlist.name,
            creator: PlaylistData === null || PlaylistData === void 0 ? void 0 : PlaylistData.playlist.creator,
            plan: PlaylistData === null || PlaylistData === void 0 ? void 0 : PlaylistData.playlist.plan
        });
        if (lessonQuery) {
            const lessonInput = [];
            lessonQuery.forEach(i => {
                let lessonObj = {
                    title: i.title,
                    category: i.category,
                    creator: i.creator,
                    endDate: i.endDate,
                    image: i.image,
                    meta: i.meta,
                    startDate: i.startDate,
                    video: i.video,
                };
                lessonInput.push(lessonObj);
            });
            setLessons(lessonInput);
            setFilter(lessonInput);
        }
    }, [PlaylistData, lessonQuery]);
    if (PlaylistLoading) {
        return (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}, void 0);
    }
    if (PlaylistError) {
        return (0, jsx_runtime_1.jsx)(utils_1.DisplayError, { title: "Failed to query current Playlist" }, void 0);
    }
    if (!viewer) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(utils_1.DisplayError, { title: "Must be logged in to create a playlist!" }, void 0), (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: { margin: 5 } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ href: '/login', variant: 'contained' }, { children: "Go To Log In Page" }), void 0) }), void 0)] }, void 0));
    }
    if (loading) {
        return (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}, void 0);
    }
    if (error) {
        return (0, jsx_runtime_1.jsx)(utils_1.DisplayError, { title: "Failed to query lessons" }, void 0);
    }
    const titleHandler = (e) => {
        e.preventDefault();
        setPlaylist(Object.assign(Object.assign({}, playlist), { name: playlist ? playlist.name : e.target.value, creator: viewer && viewer.id ? viewer.id : "0" }));
    };
    const onDragEndHandler = (result) => {
        const { destination, source } = result;
        // if there is no droppable destination, simply return.
        if (!destination) {
            return;
        }
        // Otherwise, cut the item from lessons array and push to new playlist
        const items = Array.from(lessons);
        // Allow the user to reorder playlist if failed to drag and drop in correct order
        if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
            const [reorderedPlaylistItem] = playlist.plan.splice(source.index, 1);
            const displacedPlaylistItem = playlist.plan.slice(destination.index, (destination.index + 1));
            playlist.plan[destination.index] = reorderedPlaylistItem;
            playlist.plan.push(...displacedPlaylistItem);
            return Object.assign({}, playlist);
        }
        // if dragging and dropping within lessons simply return items unchanged
        if (source.droppableId === "lessons" && destination.droppableId === "lessons") {
            return Object.assign({}, items);
        }
        if (destination.droppableId === "playlist") {
            const [reorderedItem] = items.splice(source.index, 1);
            const displacedItem = playlist.plan.slice(destination.index, (destination.index + 1));
            playlist.plan[destination.index] = reorderedItem;
            playlist.plan.push(...displacedItem);
            setLessons(items);
            setPlaylist(Object.assign({}, playlist));
        }
        if (destination.droppableId === "lessons") {
            const [reorderedPlay] = playlist.plan.splice(source.index, 1);
            const displacedPlay = items.slice(destination.index, (destination.index + 1));
            items[destination.index] = reorderedPlay;
            items.push(...displacedPlay);
            setLessons(items);
            setPlaylist(Object.assign({}, playlist));
        }
    };
    const inputHandler = (e) => {
        e.preventDefault();
        let enteredSearch = e.target.value;
        setSearchInput(enteredSearch);
        if (enteredSearch) {
            const filteredLessons = lessons.filter(({ title }) => (title === null || title === void 0 ? void 0 : title.toLowerCase().indexOf(searchInput.toLowerCase())) !== -1);
            setLessons(filteredLessons);
        }
        if (enteredSearch === '') {
            setLessons(filter);
            // setFilter(lessons)
        }
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (playlist && playlist.plan) {
            yield updatePlan({
                variables: {
                    input: playlist,
                    id: `${params.id}`
                }
            });
        }
        // Navigate to User Profile Page
        navigate(`../user/${viewer.id}`, { replace: true });
    });
    console.log(playlist);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ className: "createPlaylist--box" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Edit Lesson Plan" }, void 0), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.DragDropContext, Object.assign({ onDragEnd: onDragEndHandler }, { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ container: true }, { children: [(0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Droppable, Object.assign({ droppableId: 'playlist' }, { children: (provided) => {
                                        var _a;
                                        return ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, xs: 6, md: 8, lg: 8 }, { children: (0, react_1.createElement)(material_1.Card, Object.assign({ variant: "outlined", sx: { minHeight: "750px", padding: 5, margin: 2 } }, provided.droppableProps, { ref: provided.innerRef, key: provided.droppableProps['data-rbd-droppable-id'] }),
                                                (0, jsx_runtime_1.jsx)(material_1.TextField, { label: "Lesson Plan Title", id: "lesson-plan-title", variant: "standard", ref: inputRef, fullWidth: true, onChange: titleHandler, value: playlist.name }, void 0), (_a = playlist.plan) === null || _a === void 0 ? void 0 :
                                                _a.map((i, index) => ((0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Draggable, Object.assign({ draggableId: index.toString(), index: index }, { children: (provide) => ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, xs: 12, md: 12, lg: 12 }, { children: (0, jsx_runtime_1.jsx)(material_1.Card, Object.assign({ variant: "outlined", sx: { padding: 2, margin: 1 } }, provide.draggableProps, provide.dragHandleProps, { ref: provide.innerRef }, { children: i === null || i === void 0 ? void 0 : i.title }), i === null || i === void 0 ? void 0 : i.id) }), void 0)) }), index))),
                                                provided.placeholder) }), void 0));
                                    } }), void 0), (0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Droppable, Object.assign({ droppableId: 'lessons' }, { children: (provided) => ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, xs: 6, md: 4, lg: 4 }, { children: (0, react_1.createElement)(material_1.Card, Object.assign({ variant: "outlined", className: "createPlaylist--card" }, provided.droppableProps, { ref: provided.innerRef, key: provided.droppableProps['data-rbd-droppable-id'] }),
                                            (0, jsx_runtime_1.jsx)(material_1.TextField, { variant: 'outlined', id: "lesson-search", label: "Search Lessons", value: searchInput, onChange: inputHandler, ref: inputRef, className: "createPlaylist--search" }, void 0),
                                            (0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ container: true }, { children: [lessons === null || lessons === void 0 ? void 0 : lessons.map((i, index) => ((0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Draggable, Object.assign({ draggableId: index.toString(), index: index }, { children: (provide) => ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, xs: 12, md: 12, lg: 12 }, { children: (0, jsx_runtime_1.jsx)(material_1.Card, Object.assign({ variant: "outlined", sx: { padding: 2, margin: 1 } }, provide.draggableProps, provide.dragHandleProps, { ref: provide.innerRef }, { children: i.title }), i._id) }), void 0)) }), index))), provided.placeholder] }), void 0)) }), void 0)) }), void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: 'outlined', type: 'submit' }, { children: "Update" }), void 0)] }), void 0)] }), void 0));
};
exports.EditPlaylist = EditPlaylist;
