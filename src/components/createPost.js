import { useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export const CreatePost = (props) => {
  const [post, setPost] = useState("");
  const [mood, setMood] = useState(3);
  const getPostList = props.getPostList;

  const postCollectionRef = collection(db, "post");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(postCollectionRef, {
        post: post,
        mood: mood,
        user: auth.currentUser.displayName,
        userId: auth.currentUser?.uid,
        likes: 0,
        timeStamp: serverTimestamp(),
      });
      getPostList();
      setPost("");
      setMood(3);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="make-post pr-4">
      <Container>
        <h3> How are you feeling today? </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Start a post"
              as="textarea"
              rows={5}
            />
            <div>
              <Row>
                <Col lg={10}>
                  <Form.Label>Mood: {mood} </Form.Label>
                  <div>
                    <Form.Label>Mood meter: 1(sad) to 5(happy) </Form.Label>
                  </div>
                </Col>
                <Col xs={2}>
                  <Button className="mt-3" type="submit">
                    Post
                  </Button>
                </Col>
              </Row>
              <div>
                <Form.Range
                  type="range"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  min="1"
                  max="5"
                  variant="dark"
                />
              </div>
            </div>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};
