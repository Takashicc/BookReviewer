import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { findBookByISBN } from "../api/api";
import ApiTypes from "../api/ApiTypes";

const BookDetail = () => {
  const { isbn } = useParams();
  const [bookInfo, setBookInfo] = useState<ApiTypes.BookInfo | null>(null);
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!isbn) {
        return;
      }

      const response: ApiTypes.BookInfo | null = await findBookByISBN(isbn);
      setBookInfo(response);
      setDataFetched(true);
    })();
  }, [isbn]);

  const renderBookDetail = () => {
    if (dataFetched && bookInfo === null) {
      return <h1>Book Not Found.</h1>;
    }

    return (
      <Container className="py-3">
        <Row>
          <Col sm={4} lg={2}>
            <Image src={bookInfo?.rakutenLargeImageUrl}></Image>
          </Col>
          <Col sm={8} lg={10}>
            <Row>
              <h4>{bookInfo?.title}</h4>
            </Row>
            <Row>
              <p>{bookInfo?.author}</p>
            </Row>
            <Container>
              <Row>
                <Col>ISBN</Col>
                <Col>{bookInfo?.isbn}</Col>
              </Row>
              <Row>
                <Col>Publisher</Col>
                <Col>{bookInfo?.publisher}</Col>
              </Row>
              <Row>
                <Col>Released</Col>
                <Col>{bookInfo?.releasedAt}</Col>
              </Row>
              <Row>
                <Col>Price</Col>
                <Col>&#165; {bookInfo?.price}</Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  };

  return renderBookDetail();
};

export default BookDetail;
