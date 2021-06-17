import React, { useEffect, useState } from "react";
import LeftPanel from "../Components/LeftPanel";
import axios from "axios";
import NewsListTypeContainer from "../Components/NewsListTypeContainer";
import Pager from "../Components/Pager";
import NewsPage from "../Components/NewsPage";
import NewsCardContainer from "../Components/NewsCardContainer";
function Home() {
  const [news, setNews] = useState([]);
  const [isInListMode, setIsInListMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(0);
  const [apidata, setapidata] = useState(null);
  const [showNewsPage, setShowNewsPage] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);
  const [openFeedback, setOpenFeedback] = useState(false);
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
    let noOfItems = isInListMode ? 5 : 6;
    let noOfPages = totalNews / noOfItems;
    setNoOfPages(Math.trunc(noOfPages));
    let responseArray = [...apidata];
    let sortedNews = [];
    for (let i = 0; i < noOfPages; i++) {
      let newsarray = [];
      if (responseArray.length >= noOfItems) {
        newsarray = responseArray.slice(0, noOfItems);
        responseArray.splice(0, noOfItems);
      } else {
        newsarray = responseArray.slice(0, responseArray.length);
        responseArray.splice(0, responseArray.length);
      }
      sortedNews.push(newsarray);
    }
    setNews(sortedNews);
  }, [apidata, isInListMode]);

  function deletefunction(id) {
    setapidata(apidata.filter((item) => item.id !== id));
  }
  return (
    <div className="home">
      <LeftPanel
        setIsInListMode={setIsInListMode}
        isInListMode={isInListMode}
        openFeedback={openFeedback}
        setOpenFeedback={setOpenFeedback}
      />
      {showNewsPage && currentLink ? (
        <NewsPage
          setShowNewsPage={setShowNewsPage}
          setCurrentLink={setCurrentLink}
          link={currentLink}
        />
      ) : null}
      <div className={`newsContainer ${openFeedback ? "shiftContainer" : ""} `}>
        <div
          className={`mainContainer ${
            isInListMode ? "" : "mainContainerCards"
          }`}
        >
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
                } else {
                  return (
                    <NewsCardContainer
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
        </div>
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
