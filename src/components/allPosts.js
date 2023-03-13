import { useEffect, useState } from "react";
import { getDocs, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { DeletePost } from "./deletePost";
import { CreatePost } from "./createPost";
import { onAuthStateChanged } from "firebase/auth";
import { LikeButton } from "./likeButton";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

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
      <Container>
        <Row>
          <Col md={5} className="mb-5">
            {isLoggedIn && <CreatePost getPostList={getPostList} />}
          </Col>
          <Col md={7} className="mb-5">
            {postList.map((post) => (
              <Row md={4} className="mb-5" key={post.id}>
                <Card
                  className="post-card p-1"
                  style={{ width: "100%", height: "15rem" }}
                >
                  <Card.Header
                    className="d-flex p-1 justify-content-between"
                    style={{ height: "2.5rem" }}
                  >
                    <h4>{post.user}</h4>

                    <Badge pill className="mood-badge mb-1" bg="info">
                      Mood: {post.mood}
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text> {post.post}</Card.Text>
                  </Card.Body>
                  <Card.Footer
                    className="p-1 d-flex mb-1 justify-content-between"
                    style={{ height: "2.5rem" }}
                  >
                    {isLoggedIn && (
                      <LikeButton
                        id={post.id}
                        getPostList={getPostList}
                        userId={auth.currentUser.uid}
                        likes={post.likes}
                      />
                    )}
                    {isLoggedIn && auth.currentUser.uid === post.userId && (
                      <div className="m">
                        <DeletePost id={post.id} getPostList={getPostList} />
                      </div>
                    )}
                    <div className="pb-3">
                      Posted at: {post.timeStamp.seconds}
                    </div>
                  </Card.Footer>
                </Card>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
