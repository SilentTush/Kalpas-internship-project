import React, { useEffect, useState } from "react";
import LeftPanel from "../Components/LeftPanel";
import axios from "axios";
import NewsListTypeContainer from "../Components/NewsListTypeContainer";
import Pager from "../Components/Pager";
function Home() {
  const [news, setNews] = useState([]);
  const [isInListMode, setIsInListMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(0);
  useEffect(() => {
    loadNews();
    async function loadNews() {
      axios.get("https://api.first.org/data/v1/news").then((response) => {
        let totalNews = response.data.data.length;
        let noOfPages = totalNews / 5;
        setNoOfPages(noOfPages);
        let responseArray = response.data.data;
        let sortedNews = [];
        for (let i = 0; i < noOfPages; i++) {
          let newsarray = [];
          if (responseArray.length >= 5) {
            newsarray = responseArray.slice(0, 5);
            responseArray.splice(0, 5);
          } else {
            newsarray = responseArray.slice(0, responseArray.length);
            responseArray.splice(0, responseArray.length);
          }
          sortedNews.push(newsarray);
        }
        setNews(sortedNews);
      });
    }
  }, []);
  return (
    <div className="home">
      <LeftPanel />
      <div className="newsContainer">
        {news[currentPage - 1]
          ? news[currentPage - 1].map((news) => {
              if (isInListMode) {
                return (
                  <NewsListTypeContainer
                    id={news.id}
                    published={news.published}
                    title={news.title}
                    link={news.link}
                    summary={news.summary}
                  />
                );
              }
            })
          : null}
        <Pager
          currentPage={currentPage}
          noOfPages={noOfPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Home;
