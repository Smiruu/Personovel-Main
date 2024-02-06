import React, { useState, useEffect } from 'react';
import { Dropdown, Pagination } from 'react-bootstrap';
import './ChapterDropdown.css';

const bookData = {
  name: 'Sample Book',
  chapters: ['Chapter 1:', 'Chapter 2:', 'Chapter 3:', 'Chapter 4:'],
};

const pageContent = [
  "Harry Potter is a popular fantasy book series written by British author J.K. Rowling. The series follows the life and adventures of a young wizard named Harry Potter and his friends Hermione Granger and Ron Weasley, who are students at Hogwarts School of Witchcraft and Wizardry. The series is known for its magical world, complex characters, and intricate plot.",
  "Harry Potter is a popular fantasy book series written by British author J.K. Rowling. The series follows the life and adventures of a young wizard named Harry Potter and his friends Hermione Granger and Ron Weasley, who are students at Hogwarts School of Witchcraft and Wizardry. The series is known for its magical world, complex characters, and intricate plot.",
];

const ChapterDropdown = () => {
  const [selectedChapter, setSelectedChapter] = useState('Chapter 1:');

  const handleChapterChange = (chapter) => {
    setSelectedChapter(chapter);
  };

  useEffect(() => {
    setSelectedChapter(bookData.chapters[0]);
  }, []);

  return (
    <div className="chapter-container">
      <Dropdown onSelect={handleChapterChange} className="custom-dropdown">
        <Dropdown.Toggle variant="success" id="dropdown-basic" className="transparent-background">
          {bookData.name}
        </Dropdown.Toggle>

        <Dropdown.Menu className="text-center">
          {bookData.chapters.map((chapter, index) => (
            <Dropdown.Item key={index} eventKey={chapter} className="text-center transparent-chapter">
              {chapter}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {selectedChapter && <DisplayChapter selectedChapter={selectedChapter} />}
    </div>
  );
};

const DisplayChapter = ({ selectedChapter }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, bookData.chapters.length));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const totalPages = bookData.chapters.length;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedChapter]);

  return (
    <div className="display-chapter">
      <h1>{selectedChapter}</h1>
      <p>
        Page {currentPage} of {totalPages}
      </p>
      <p>{pageContent[currentPage - 1]}</p>
      <Pagination className="pagination ">
        <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </Pagination.Prev>
        <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

export default ChapterDropdown;