import React from "react";

function NewsListTypeContainer({
  id,
  title,
  summary,
  published,
  link,
  deletefunction,
  setShowNewsPage,
  setCurrentLink,
}) {
  return (
    <div
      className="newsListContainer"
      key={id}
      onClick={() => {
        setShowNewsPage(true);
        setCurrentLink(link);
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
        alt=""
      />
      <div className="newsWrapper">
        <p className="headline">{title}</p>
        <p className="news">{summary}</p>
        <p className="time">{published}</p>
      </div>
      <div className="removeButton" onClick={() => deletefunction(id)}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.77559 0.456895L11 8.68101L19.1906 0.490739C19.3341 0.337963 19.507 0.215747 19.6989 0.13142C19.8909 0.0470936 20.0978 0.00239336 20.3075 0C20.7563 0 21.1867 0.178285 21.5041 0.495635C21.8214 0.812985 21.9997 1.2434 21.9997 1.6922C22.0037 1.89967 21.9652 2.10576 21.8866 2.29781C21.808 2.48987 21.691 2.66384 21.5428 2.80906L13.2676 10.9993L21.5428 19.2742C21.8217 19.5471 21.9853 19.9166 21.9997 20.3065C21.9997 20.7553 21.8214 21.1857 21.5041 21.503C21.1867 21.8204 20.7563 21.9987 20.3075 21.9987C20.0918 22.0076 19.8766 21.9716 19.6756 21.893C19.4746 21.8143 19.2921 21.6947 19.1398 21.5418L11 13.3177L2.79251 21.5248C2.64953 21.6725 2.47871 21.7904 2.28991 21.8718C2.10112 21.9531 1.89809 21.9962 1.69254 21.9987C1.24372 21.9987 0.81329 21.8204 0.495928 21.503C0.178567 21.1857 0.000275342 20.7553 0.000275342 20.3065C-0.00367017 20.099 0.0348238 19.8929 0.113395 19.7008C0.191966 19.5088 0.308957 19.3348 0.457187 19.1896L8.73236 10.9993L0.457187 2.72445C0.178276 2.4516 0.0147266 2.08211 0.000275342 1.6922C0.000275342 1.2434 0.178567 0.812985 0.495928 0.495635C0.81329 0.178285 1.24372 0 1.69254 0C2.09868 0.00507661 2.48791 0.16922 2.77559 0.456895Z"
            fill="#FF9090"
          />
        </svg>
      </div>
    </div>
  );
}

export default NewsListTypeContainer;
