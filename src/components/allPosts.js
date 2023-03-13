import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { DeletePost } from "./deletePost";
import { CreatePost } from "./createPost";
import { onAuthStateChanged } from "firebase/auth";
import { LikeButton } from "./likeButton";

export const AllPosts = () => {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "post");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getPostList = async () => {
    try {
      const data = await getDocs(postCollectionRef);
      const documents = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostList(documents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(!isLoggedIn);
      } else {
        setIsLoggedIn(false);
      }
    });
    getPostList();
  }, []);

  return (
    <div>
      {isLoggedIn && <CreatePost getPostList={getPostList} />}
      {postList.map((post) => (
        <div key={post.id}>
          <h2
            style={{
              color: "green",
            }}
          >
            {post.user}
            {isLoggedIn && auth.currentUser.uid === post.userId && (
              <DeletePost id={post.id} getPostList={getPostList} />
            )}
          </h2>
          <p>{post.post}</p>
          <div>Mood: {post.mood}</div>
          <div> userId: {post.userId} </div>

          <div>
            {isLoggedIn && (
              <LikeButton
                id={post.id}
                getPostList={getPostList}
                userId={auth.currentUser.uid}
                likes={post.likes}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
