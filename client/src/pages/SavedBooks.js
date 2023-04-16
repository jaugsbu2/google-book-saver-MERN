import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";

import { saveBookIds } from "../utils/localStorage";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  // const [userData, setUserData] = useState({});
  const userId = Auth.getProfile().data._id;
  const [removeBook, { error }] = useMutation(REMOVE_BOOK, {
  });

  const { loading, data } = useQuery(userId ? QUERY_USER : QUERY_ME, {
    variables: { userId: userId },
  });

  const userData = data?.me || data?.user || {};
  console.log(userId);
  console.log(userData);

  // if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
  //   return <Navigate to="/saved" />;
  // }

  if (!userId) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData?.username) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (book) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    console.log(book)
    try {
      const { data } = await removeBook({
        variables: { bookId: book.bookId, userId: userId  },
      });
    } catch (err) {
      console.error(err);
    }
    if (data) {
      window.location.reload()
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
