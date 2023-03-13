import {
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

export const LikeButton = (props) => {
  const getPostList = props.getPostList;
  const postId = props.id;
  const userId = props.userId;
  const likes = props.likes;

  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(likes);

  const userRef = doc(db, "users", userId);
  const postRef = doc(db, "post", postId);

  useEffect(() => {
    const checkForLikes = async () => {
      const userSnapshot = await getDoc(userRef);
      const likedPosts = userSnapshot.get("likedPosts");

      if (likedPosts.includes(postId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };
    checkForLikes();
  }, []);

  const handleLike = async (id) => {
    try {
      const userSnapshot = await getDoc(userRef);
      const likedPosts = userSnapshot.get("likedPosts");
      if (likedPosts.includes(id)) {
        await updateDoc(userRef, {
          likedPosts: arrayRemove(id),
        });

        await updateDoc(postRef, {
          likes: totalLikes,
        });
        setIsLiked(false);
        setTotalLikes(totalLikes - 1);
      } else {
        await updateDoc(userRef, {
          likedPosts: arrayUnion(id),
        });
        await updateDoc(postRef, {
          likes: totalLikes,
        });
        setIsLiked(true);
        setTotalLikes(totalLikes + 1);
      }
      getPostList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: isLiked ? "red" : "white",
        }}
        onClick={() => handleLike(postId)}
      >
        Like
      </button>
      <p> ({totalLikes})</p>
    </div>
  );
};
