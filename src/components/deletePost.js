import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import Button from "react-bootstrap/Button";

export const DeletePost = (props) => {
  const getPostList = props.getPostList;
  const id = props.id;

  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, "post", id);
      await deleteDoc(postDoc);
      getPostList();
    } catch (error) {
      console.error("ERROR -->", error.message);
    }
  };

  return (
    <Button variant="danger" onClick={() => deletePost(id)}>
      Delete Post
    </Button>
  );
};
