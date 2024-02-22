import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listInteractions } from '../actions/interactionActions';
import { Row, Col } from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Document, Page, pdfjs } from 'react-pdf'; // Import Document, Page, and pdfjs from react-pdf
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Import CSS for react-pdf

// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Chapter() {
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
                                    <h3>{interaction.book.title}</h3>
                                    <Document
                                        
                                        file={interaction.chapter}
                                        options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
                                    >
                                        
                                        <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} width={300} />
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

export default Chapter;
