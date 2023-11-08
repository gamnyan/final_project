import { useParams } from "react-router-dom";
import CommentOne from "../../components/Article/CommentOne";
import { CommentContextProvider } from "../../Store/Comment-context";

const UpdateCommentPage = () => {
    let { commentId } = useParams();

    return (
        <CommentContextProvider>
            <CommentOne item={commentId} />
        </CommentContextProvider>
    )
}

export default UpdateCommentPage;