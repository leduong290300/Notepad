import Button from "react-bootstrap/Button";
import playIcon from "../../Assets/play-btn.svg";
import editIcon from "../../Assets/pencil.svg";
import deleteIcon from "../../Assets/trash.svg";
import { PostContext } from "../../Context/PostContext";
import { useContext } from "react";

const ActionButtons = ({ url, _id }) => {
  const { deletePost, findPost, setShowUpdatePostModal } =
    useContext(PostContext);

  const choosePost = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };

  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="32" height="32" />
      </Button>
      <Button className="post-button" onClick={choosePost.bind(this, _id)}>
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button className="post-button" onClick={deletePost.bind(this, _id)}>
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtons;
