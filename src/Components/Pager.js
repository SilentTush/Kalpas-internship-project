import React, { useEffect, useState } from "react";

function Pager({ noOfPages, currentPage, setCurrentPage }) {
  const [pages, setpages] = useState([1]);

  useEffect(() => {
    console.log("currentPage", currentPage);
    console.log("noOfPages", noOfPages);
    let remainingPages = noOfPages - currentPage;
    if (remainingPages >= 2) {
      setpages([currentPage, currentPage + 1, currentPage + 2]);
    } else if (remainingPages === 1) {
      setpages([currentPage, currentPage + 1]);
    } else {
      setpages([currentPage]);
    }
  }, [currentPage, noOfPages]);
  return (
    <div className="pager">
      {currentPage > 1 ? (
        <div
          className="backButton"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
          </svg>
        </div>
      ) : null}
      {pages.length > 0
        ? pages.map((page) => (
            <div
              className={`pageItem ${
                currentPage === page ? "activePageItem" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          ))
        : null}
      {currentPage < noOfPages ? (
        <div
          className="nextButton"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <svg focusable="false" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </div>
      ) : null}
    </div>
  );
}

export default Pager;
