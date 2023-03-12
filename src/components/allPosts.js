import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { DeletePost } from "./deletePost";
import { CreatePost } from "./createPost";
import { onAuthStateChanged } from "firebase/auth";

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
        console.log("user logged in!", user);
      } else {
        setIsLoggedIn(false);
        console.log("no user", user);
      }
    });
    getPostList();
  }, []);

  return (
    <div>
      {auth.currentUser?.uid && <CreatePost getPostList={getPostList} />}
      {postList.map((post) => (
        <div key={post.id}>
          <h2
            style={{
              color: "green",
            }}
          >
            {post.user}
          </h2>
          <p>{post.post}</p>
          <div>Mood: {post.mood}</div>
          <div> userId: {post.userId} </div>
          {auth.currentUser?.uid && auth.currentUser.uid === post.userId && (
            <DeletePost id={post.id} getPostList={getPostList} />
          )}
        </div>
      ))}
    </div>
  );
};
