import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listInteractions } from '../actions/interactionActions'
import { Row, Col } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString(); 
import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function ChapterScreen() {
    const dispatch = useDispatch();
    const interactionList = useSelector((state) => state.interactionList);
    const { loading, error, interactions } = interactionList;
    const [pdfFile, setPdfFile] = useState(null);
    useEffect(() => {
        dispatch(listInteractions());
    }, [dispatch]);


    const showPdf = (pdf) => {
        window.open(`interactions/<str:pk>`)
        setPdfFile();
    } 
    return (
        <div>
            <h1>Chapters</h1>
            <Row>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    interactions.map((interaction) => (
                        <Col key={interaction.id} sm={12} md={6} lg={4} xl={3}>
                            {interaction.chapters ? (
                                <div>
                                    <h3>{interaction.book.title}</h3>
                                    <embed src={interaction.chapters} type="application/pdf" width="100%" height="500px" />
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

export default ChapterScreen;