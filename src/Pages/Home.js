import React, { useEffect, useState } from "react";
import LeftPanel from "../Components/LeftPanel";
import axios from "axios";
import NewsListTypeContainer from "../Components/NewsListTypeContainer";
import Pager from "../Components/Pager";
import NewsPage from "../Components/NewsPage";
function Home() {
  const [news, setNews] = useState([]);
  const [isInListMode, setIsInListMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(0);
  const [apidata, setapidata] = useState(null);
  const [showNewsPage, setShowNewsPage] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);
  useEffect(() => {
    loadNews();
    async function loadNews() {
      axios.get("https://api.first.org/data/v1/news").then((response) => {
        setapidata(response.data.data);
        console.log(response.data.data);
      });
    }
  }, []);
  useEffect(() => {
    if (!apidata) return;
    let totalNews = apidata.length;
    let noOfPages = totalNews / 5;
    setNoOfPages(Math.trunc(noOfPages));
    let responseArray = [...apidata];
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
  }, [apidata]);

  function deletefunction(id) {
    setapidata(apidata.filter((item) => item.id !== id));
  }
  return (
    <div className="home">
      <LeftPanel />
      {showNewsPage && currentLink ? <NewsPage link={currentLink} /> : null}
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
                    deletefunction={deletefunction}
                    setShowNewsPage={setShowNewsPage}
                    setCurrentLink={setCurrentLink}
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
