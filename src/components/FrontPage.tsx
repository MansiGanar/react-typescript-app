import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Form,
  Navbar,
  Container,
  Card,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";

interface Music {
  title: string;
  image: string;
}

export default function FrontPage() {
  const [query, setQuery] = useState("");
  const [music, setMusic] = useState<Music[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const fetchMusic = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query
    );

    if (response.ok) {
      const { data } = await response.json();
      console.log(data);
      setMusic(data);
    }
  };

  return (
    <div>
      <Navbar style={{ color: "white", backgroundColor: "aquamarine" }}>
        <Navbar.Brand>Music Search</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Form className="d-flex" onSubmit={fetchMusic}>
            <FormControl
              type="search"
              placeholder="Name of the artist :"
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={handleChange}
            />
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Container className="frontPage">
        <Row lg={4}>
          {music.map((song) => (
            <Col>
              <Card style={{ width: "18rem" }} className="music-card">
                <Card.Img variant="top" src={song.image} />
                <Card.Body>
                  <Card.Title>{song.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
