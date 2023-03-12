import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { auth, db } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "post");

  //Post states
  const [post, setPost] = useState("");
  const [mood, setMood] = useState(3);
  const [user, setUser] = useState("");

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

  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, "post", id);
      await deleteDoc(postDoc);
      getPostList();
    } catch (error) {
      console.error("ERROR -->", error.message);
    }
  };

  const getPostList = async () => {
    try {
      const data = await getDocs(postCollectionRef);
      const documents = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(documents);
      console.log(data);
      if (auth.currentUser) {
        setUser(auth.currentUser.displayName);
      }
      setPostList(documents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <div className="App">
      <Auth />
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

      <div>
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
            <button onClick={() => deletePost(post.id)}>Delete Post</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
