"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQuizzesCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const UserQuizzesCard = ({ quiz }) => {
    // const navigation = useNavigate();
    //   const DELETE_PLAYLIST = gql`
    //   mutation DeletePlaylist($id: ID) {
    //     deletePlaylist(id: $id)
    //   }
    // `;
    //   const UPDATE_PLAN = gql`
    //     mutation UpdatePlan($input: playlist) {
    //       updatePlan(input: $input)
    //     }
    //   `;
    // interface DeletePlaylistData {
    //   deletePlaylist: Playlist
    // }
    // interface DeletePlaylistVariables {
    //   id: string
    // }
    // interface UpdatePlaylistData {
    //   updatePlaylist: Playlist
    // }
    // interface UpdatePlaylistVariables {
    //   id: string
    // }
    // const [deletePlaylist, { loading: DeletePlaylistLoading, error: DeletePlaylistError}] = useMutation<DeletePlaylistData, DeletePlaylistVariables>(DELETE_PLAYLIST);
    // const [updatePlan, { loading: UpdatePlanLoading, error: UpdatePlanError}] = useMutation<UpdatePlaylistData, UpdatePlaylistVariables>(UPDATE_PLAN);
    // const handleDelete = async (id: string) => {  
    //     const res = await deletePlaylist({ variables: { id }})
    //     if (res) {
    //       // window.location.reload();
    //       return ( <DisplaySuccess title="Deletion Successful!" /> );
    //     }
    //   }
    //   const handleUpdate = async (id: string) => { 
    //     navigation(`/edit/${id}`) 
    //     await updatePlan({ variables: { id }})
    //   }
    // const deletePlaylistLoadingMessage = (
    //   <CircularProgress sx={{
    //             color: 'inherit',
    //             position: 'absolute',
    //             top: '50%',
    //             left: '50%',
    //             zIndex: 1,
    //           }}/>
    //   );
    // const updatePlanLoadingMessage = deletePlaylistLoadingMessage;
    // const deletePlaylistErrorMessage = (
    //   <Alert variant="outlined" severity="error">
    //     Oops, something went wrong in the deletion process!
    //   </Alert>
    // );
    // const updatePlanErrorMessage = (
    //   <Alert variant="outlined" severity="error">
    //     Oops, unable to edit playlist right now!
    //   </Alert>
    // );
    return ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, lg: 4, md: 6, sm: 12, xs: 12 }, { children: (0, jsx_runtime_1.jsx)(material_1.ListItem, { children: (0, jsx_runtime_1.jsx)(material_1.Card, Object.assign({ sx: { minWidth: 350 } }, { children: (0, jsx_runtime_1.jsx)(material_1.CardContent, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: `/quiz/${quiz.id}`, style: { textDecoration: "none" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'h4', style: { color: "#000" } }, { children: quiz.title }), void 0), (0, jsx_runtime_1.jsxs)(material_1.Typography, Object.assign({ variant: 'h6', style: { color: "#000" } }, { children: [quiz.questions.length, " ", quiz.questions.length === 1 ? " Question" : " Questions"] }), void 0)] }), void 0) }, void 0) }), void 0) }, quiz.id) }), quiz.id));
};
exports.UserQuizzesCard = UserQuizzesCard;
