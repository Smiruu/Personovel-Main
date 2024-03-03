import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listInteractions } from '../actions/interactionActions';
import { Row, Col } from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Document, Page, pdfjs } from 'react-pdf'; // Import Document, Page, and pdfjs from react-pdf
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Import CSS for react-pdf
import { listInteractionDetails } from '../actions/interactionActions';
import { useParams } from 'react-router-dom';

// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Chapter() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [interaction, setInteraction] = useState({});
   
  
    useEffect(() => {
      dispatch(listInteractionDetails(id)); // Use id to fetch interaction details
    }, [dispatch, id]);
    
    const interactionDetails = useSelector(state => state.interactionDetails);
    const { loading, error,} = interactionDetails || {};

    useEffect(() => {
        if (!loading && !error) {
            setInteraction(interactionDetails.interaction);
        }
        }, [interactionDetails, loading, error]);
  
    return (
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <h2>Interaction Details</h2>
            <p>ID: {interaction.id}</p>
            <p>Chapter: {interaction.chapter_number}</p>
            <p>Book: {interaction.book}</p>
            {/* Display additional details as needed */}
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
                    />
                ))}
            </Document>

                    


          </div>
          
        )}
      </div>
    );
  }
export default Chapter;
