import React from "react";

function NewsPage({ link }) {
  console.log(link);
  return (
    <div className="newsPage">
      <div className="background"></div>
      <iframe src={link} className="newsPageFrame"></iframe>
    </div>
  );
}

export default NewsPage;
