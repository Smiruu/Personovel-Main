import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listInteractionsByBook } from '../actions/interactionActions';
import { useParams } from 'react-router-dom';
import { Row, Col, Button, Dropdown } from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const ChapterByBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listInteractionsByBook(id));
  }, [dispatch, id]);

  const interactionListByBook = useSelector((state) => state.interactionListByBook);
  const { loading, error, interactions } = interactionListByBook;

  const [currentChapter, setCurrentChapter] = useState(1);
  const [numPages, setNumPages] = useState(0); // Initialize numPages with 0

  const handleNextChapter = () => {
    setCurrentChapter(currentChapter + 1);
    setNumPages(0); // Reset numPages when changing chapters
  };

  const handlePreviousChapter = () => {
    setCurrentChapter(currentChapter - 1);
    setNumPages(0); // Reset numPages when changing chapters
  };

  const handleChapterChange = (chapterNumber) => {
    setCurrentChapter(chapterNumber);
    setNumPages(0); // Reset numPages when changing chapters
  };

  return (
    <div>
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Select Chapter
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {interactions.map((interaction) => (
            <Dropdown.Item key={interaction.id} onClick={() => handleChapterChange(interaction.chapter_number)}>
              Chapter {interaction.chapter_number}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          interactions.map((interaction, index) => (
            <Col key={interaction.id}>
              {interaction.chapter_number === currentChapter ? (
                <div>
                  <div>
                    <h4>Interaction Details</h4>
                    <p>ID: {interaction.id}</p>
                    <p>Chapter: {interaction.chapter_number}</p>
                    <p>Book: {interaction.book}</p>
                  </div>
                  <Button disabled={currentChapter === 1} onClick={handlePreviousChapter}>Previous Chapter</Button>
                  <Button disabled={index === interactions.length - 1} onClick={handleNextChapter}>Next Chapter</Button>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Document
                      file={interaction.chapter}
                      options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
                      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    >
                      {Array.from(new Array(numPages), (el, index) => (
                        <Page
                          key={`page_${index + 1}`}
                          pageNumber={index + 1}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          width={1300} // Set a fixed width for the pages
                        />
                      ))}
                    </Document>
                  </div>
                  <Button disabled={currentChapter === 1} onClick={handlePreviousChapter}>Previous Chapter</Button>
                  <Button disabled={index === interactions.length - 1} onClick={handleNextChapter}>Next Chapter</Button>
                </div>
              ) : null}
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default ChapterByBook;
