import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listInteractions } from '../actions/interactionActions'
import { Row, Col } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { Document, Page, pdfjs } from 'react-pdf';
import Chapter from '../Components/Chapter';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString(); 


function ChapterScreen() {

    return (
        <div>
            <Row>
                <Col>
                    <Chapter/>
                </Col>
            </Row>
        </div>
    );
}

export default ChapterScreen;