import { useState } from "react";
import { Container, Row, Col, Form, Image, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { searchBookByTitle } from "../api/api";
import ApiTypes from "../api/ApiTypes";
import useDebouncedQuery from "../hooks/debouncedQuery";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useDebouncedQuery(
    (query: string): void => {
      if (query === "") {
        return;
      }

      (async () => {
        const bookInfo: ApiTypes.BookInfo[] = await searchBookByTitle(query);
        console.log(bookInfo);
        setSearchResult(bookInfo);
      })();
    }
  );
  const [searchBarFocused, setSearchBarFocused] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<ApiTypes.BookInfo[]>([]);

  const renderSearchResult = () => {
    if (!searchBarFocused && searchResult.length === 0) {
      return <></>;
    }

    let content: React.ReactNode;
    if (searchResult.length === 0) {
      content = <p>Book not found. Try other title.</p>;
    } else {
      content = (
        <>
          {searchResult.map((result) => {
            return (
              <Link
                className="dataItem"
                to={`/books/${result.isbn}`}
                key={result.isbn}
              >
                <Row>
                  <Col sm={2} lg={1} className="pb-1">
                    <Image
                      rounded
                      thumbnail
                      src={result.rakutenLargeImageUrl}
                      width="60"
                    />
                  </Col>
                  <Col sm={10} lg={11}>
                    <Container>
                      <Row>{result.author}</Row>
                      <Row>{result.title}</Row>
                    </Container>
                  </Col>
                </Row>
              </Link>
            );
          })}
        </>
      );
    }

    return <Container className="search-result py-2">{content}</Container>;
  };

  return (
    <Container>
      <InputGroup className="mt-5">
        <Form.Control
          type="text"
          placeholder="Search any books"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          onFocus={() => setSearchBarFocused(true)}
          onBlur={() => setSearchBarFocused(false)}
        />
        <InputGroup.Text>
          <i className="fas fa-search"></i>
        </InputGroup.Text>
      </InputGroup>
      {renderSearchResult()}
    </Container>
  );
};

export default SearchBar;
