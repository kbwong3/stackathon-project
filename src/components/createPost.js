import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export const CreatePost = (props) => {
  const [post, setPost] = useState("");
  const [mood, setMood] = useState(3);
  const [user, setUser] = useState("");
  const getPostList = props.getPostList;

  const postCollectionRef = collection(db, "post");

  useEffect(() => {
    if (auth.currentUser.displayName) {
      setUser(auth.currentUser.displayName);
    } else {
      setUser("Anonymous");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(postCollectionRef, {
        post: post,
        mood: mood,
        user: user,
        userId: auth.currentUser?.uid,
      });
      getPostList();
      setPost("");
      setMood(3);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1> MAKE POST </h1>
        <input
          value={post}
          onChange={(e) => setPost(e.target.value)}
          className="postbox"
          placeholder="Start a post"
          type="text"
        />
        <div>
          <label>Mood: {mood} </label>
          <div>
            <label>Mood: 1(sad) to 5(happy) </label>
            <input
              type="range"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              min="1"
              max="5"
            ></input>
          </div>
        </div>

        <button type="submit">Post</button>
      </form>
    </div>
  );
};
