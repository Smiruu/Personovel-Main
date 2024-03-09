import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listInteractions } from '../actions/interactionActions';
import { Row, Col } from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Document, Page, pdfjs } from 'react-pdf'; // Import Document, Page, and pdfjs from react-pdf
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Import CSS for react-pdf


function ChapterDetail() {
    const dispatch = useDispatch();
    const interactionList = useSelector((state) => state.interactionList);
    const { loading, error, interactions } = interactionList;

    useEffect(() => {
        dispatch(listInteractions());
    }, [dispatch]);

    return (
        <div>
            <Row>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    interactions.map((interaction) => (
                        <Col key={interaction.id} sm={12} md={6} lg={4} xl={3}>
                            {interaction.chapter ? (
                                <div>
                                    <div>
                                <h4>Interaction Details</h4>
                                <p>ID: {interaction.id}</p>
                                <p>Chapter: {interaction.chapter_number}</p>
                                <p>Book: {interaction.book}</p>
                                {/* Display other interaction details here */}
                            </div>
                                    <Document
                                        file={interaction.chapter}
                                        options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
                                    >
                                        {Array.apply(null, Array(1)).map((x, i) => i + 1).map((page) => (
                                            <Page
                                                key={page}
                                                pageNumber={page}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={false}
                                                width={300}
                                            />
                                        ))}
                                    </Document>
                                </div>
                            ) : (
                                <Message variant='warning'>No chapters available</Message>
                            )}
                           
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
}


export default ChapterDetail