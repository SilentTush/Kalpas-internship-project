import React from "react";

function NewsPage({ link, setShowNewsPage, setCurrentLink }) {
  console.log(link);
  return (
    <div className="newsPage">
      <div
        className="background"
        onClick={() => {
          console.log("clicked");
          setCurrentLink(null);
          setShowNewsPage(false);
        }}
      ></div>
      <iframe src={link} className="newsPageFrame"></iframe>
    </div>
  );
}

export default NewsPage;
