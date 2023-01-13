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
exports.CreatePlaylist = exports.useFocus = void 0;
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_2 = require("react");
const generated_1 = require("../../graphql/generated");
const utils_1 = require("../../lib/utils");
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const react_router_dom_1 = require("react-router-dom");
const Modal_1 = require("../Modal");
require("./createPlaylist.scss");
const initialData = {
    name: "",
    creator: "",
    plan: []
};
const useFocus = () => {
    const ref = (0, react_2.useRef)(null);
    (0, react_2.useEffect)(() => {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    return ref;
};
exports.useFocus = useFocus;
const CreatePlaylist = ({ viewer }) => {
    let navigate = (0, react_router_dom_1.useNavigate)();
    const [searchInput, setSearchInput] = (0, react_2.useState)("");
    const [lessons, setLessons] = (0, react_2.useState)({});
    const [quizzes, setQuizzes] = (0, react_2.useState)({});
    const [plans, setPlans] = (0, react_2.useState)([]);
    const [filter, setFilter] = (0, react_2.useState)([]);
    const inputRef = (0, exports.useFocus)();
    // const id = viewer && viewer.id ? viewer.id : null;
    const [playlist, setPlaylist] = (0, react_2.useState)(initialData);
    const limit = 2000;
    const page = 1;
    const { data: lessonData, loading: lessonLoading, error: lessonError } = (0, generated_1.useAllLessonsQuery)({
        variables: {
            limit: limit,
            page: page
        }
    });
    const { data: quizData, loading: quizLoading, error: quizError } = (0, generated_1.useAllQuizzesQuery)({
        variables: {
            limit: limit,
            page: page
        }
    });
    const [lessonPlan, { loading, error }] = (0, generated_1.useLessonPlanMutation)({
        variables: {
            input: playlist
        }
    });
    const lessonQuery = lessonData ? lessonData.allLessons.result : null;
    const quizQuery = quizData ? quizData.allquizzes.result : null;
    (0, react_2.useEffect)(() => {
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
                    _id: i.id
                };
                lessonInput.push(lessonObj);
            });
            setFilter(lessonInput);
            setPlans(lessonInput);
        }
        if (quizQuery) {
            console.log(quizQuery);
            const quizInput = [];
            quizQuery.forEach(q => {
                let quizObj = {
                    creator: q.creator,
                    _id: q.id,
                    title: q.title,
                    questions: [...q.questions]
                };
                quizInput.push(quizObj);
            });
            console.log(quizInput);
            setFilter(f => [...f, ...quizInput]);
            setPlans(p => [...p, ...quizInput]);
        }
    }, [lessonQuery, quizQuery]);
    if (!viewer.id) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(utils_1.DisplayError, { title: "Must be logged in to create a playlist!" }, void 0), (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: { margin: 5 } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ href: '/login', variant: 'contained' }, { children: "Go To Log In Page" }), void 0) }), void 0)] }, void 0));
    }
    const titleHandler = (e) => {
        e.preventDefault();
        const name = e.target.value;
        setPlaylist(Object.assign(Object.assign({}, playlist), { name: name, creator: viewer && viewer.id ? viewer.id : "0" }));
    };
    if (lessonLoading || quizLoading) {
        return (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}, void 0);
    }
    if (lessonError || quizError) {
        console.log(lessonError || quizError);
        return (0, jsx_runtime_1.jsx)(utils_1.DisplayError, { title: "Failed to query lesson plan items" }, void 0);
    }
    const onDragEndHandler = (result) => {
        const { destination, source } = result;
        // if there is no droppable destination, simply return.
        if (!destination) {
            return;
        }
        // Otherwise, cut the item from lessons array and push to new playlist
        const items = plans;
        // Allow the user to reorder playlist if failed to drag and drop in correct order
        if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
            const [reorderedPlaylistItem] = playlist.plan.splice(source.index, 1);
            const displacedPlaylistItem = playlist.plan.slice(destination.index, (destination.index + 1));
            playlist.plan[destination.index] = reorderedPlaylistItem;
            playlist.plan.splice((destination.index + 1), 0, ...displacedPlaylistItem);
            return Object.assign({}, playlist);
        }
        // if dragging and dropping within lessons simply return items unchanged
        if (source.droppableId === "lessons" && destination.droppableId === "lessons") {
            const [reorderedLesson] = items.splice(source.index, 1);
            const displacedLesson = items.slice(destination.index, (destination.index + 1));
            items[destination.index] = reorderedLesson;
            items.splice((destination.index + 1), 0, ...displacedLesson);
            // items.push(...displacedLesson);
            return Object.assign({}, items);
        }
        if (destination.droppableId === "playlist") {
            const [reorderedItem] = items.splice(source.index, 1);
            setPlans([...items]);
            const displacedItem = playlist.plan.slice(destination.index, (destination.index + 1));
            playlist.plan[destination.index] = reorderedItem;
            playlist.plan.push(...displacedItem);
            setPlaylist(playlist);
        }
        if (destination.droppableId === "lessons") {
            const [reorderedPlay] = playlist.plan.splice(source.index, 1);
            const displacedPlay = items.slice(destination.index, (destination.index + 1));
            items[destination.index] = reorderedPlay;
            items.push(...displacedPlay);
            setPlans([...items]);
            setPlaylist(playlist);
        }
    };
    const inputHandler = (e) => {
        e.preventDefault();
        let enteredSearch = e.target.value;
        setSearchInput(enteredSearch);
        if (enteredSearch) {
            const filteredLessons = plans.filter((plan) => { var _a; return ((_a = plan === null || plan === void 0 ? void 0 : plan.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().indexOf(searchInput.toLowerCase())) !== -1; });
            setPlans(filteredLessons);
        }
        if (enteredSearch === '') {
            setPlans(filter);
            // setFilter(lessons)
        }
    };
    console.log(playlist);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (playlist && playlist.plan) {
            yield lessonPlan({
                variables: {
                    input: playlist
                }
            });
        }
        // Navigate to User Profile Page
        navigate(`../user/${viewer.id}`, { replace: true });
    });
    if (error) {
        console.log(error);
        return (0, jsx_runtime_1.jsx)(utils_1.DisplayError, { title: "Lesson Plan Creation Failed!" }, void 0);
    }
    if (loading) {
        return (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { color: 'primary' }, void 0);
    }
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ className: "createPlaylist--box" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Create Lesson Plan" }, void 0), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.DragDropContext, Object.assign({ onDragEnd: onDragEndHandler }, { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ container: true }, { children: [(0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Droppable, Object.assign({ droppableId: 'playlist' }, { children: (provided, snapshot) => ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, xs: 12, sm: 6, md: 8, lg: 8 }, { children: (0, react_1.createElement)(material_1.Card, Object.assign({ variant: "outlined", sx: { minHeight: "750px", padding: 5, margin: 2 } }, provided.droppableProps, { ref: provided.innerRef, key: provided.droppableProps['data-rbd-droppable-id'] }),
                                            (0, jsx_runtime_1.jsx)(material_1.TextField, { label: "Lesson Plan Title", id: "lesson-plan-title", variant: "standard", ref: inputRef, fullWidth: true, onChange: titleHandler }, void 0),
                                            playlist.plan.map((i, indices) => ((0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Draggable, Object.assign({ draggableId: `${i._id}`, index: indices }, { children: (provided) => ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, xs: 12, md: 12, lg: 12 }, { children: (0, jsx_runtime_1.jsx)(material_1.Card, Object.assign({ variant: "outlined", sx: { padding: 2, margin: 1 } }, provided.draggableProps, provided.dragHandleProps, { ref: provided.innerRef }, { children: i.title }), void 0) }), void 0)) }), i._id))),
                                            provided.placeholder) }), void 0)) }), void 0), (0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Droppable, Object.assign({ droppableId: 'lessons' }, { children: (provided, snapshot) => ((0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ item: true, xs: 12, sm: 6, md: 4, lg: 4 }, { children: [(0, react_1.createElement)(material_1.Card, Object.assign({ variant: "outlined", className: "createPlaylist--card" }, provided.droppableProps, { ref: provided.innerRef, key: provided.droppableProps['data-rbd-droppable-id'] }),
                                                (0, jsx_runtime_1.jsx)(material_1.TextField, { variant: 'outlined', id: "lesson-search", label: "Search Lessons", value: searchInput, onChange: inputHandler, ref: inputRef, className: "createPlaylist--search" }, void 0),
                                                (0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ container: true }, { children: [plans.map((i, index) => ((0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Draggable, Object.assign({ draggableId: `${i._id}`, index: index }, { children: (provided) => ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, xs: 12, md: 12, lg: 12 }, { children: (0, jsx_runtime_1.jsx)(material_1.Card, Object.assign({ variant: "outlined", sx: { padding: 2, margin: 1 } }, provided.draggableProps, provided.dragHandleProps, { ref: provided.innerRef }, { children: JSON.parse(JSON.stringify(i)).title }), void 0) }), void 0)) }), i._id))), provided.placeholder] }), void 0)), (0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ container: true }, { children: (0, jsx_runtime_1.jsx)(Modal_1.UseModal, { viewer: viewer }, void 0) }), void 0)] }), void 0)) }), void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: 'outlined', type: 'submit' }, { children: "Create" }), void 0)] }), void 0)] }), void 0));
};
exports.CreatePlaylist = CreatePlaylist;
