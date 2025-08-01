// import React from "react";
// import "./styles.css";
// import { Link } from "react-router-dom";

// function PodcastCard({ id, title, displayImage }) {
//   return (
//     <Link to={`/podcast/${id}`}>
//       <div className="podcast-card">
//         <img className="display-image-podcast" src={displayImage} />
//         <p className="title-podcast">{title}</p>
//       </div>
//     </Link>
//   );
// }

// export default PodcastCard;

import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import Button from "../../common/Button";

function PodcastCard({ id, title, displayImage, text, onClick , authorName, dateCreated}) {

  
// console.log("In podcast ", dateCreated);
  // Convert Firebase Timestamp to JavaScript Date
const dateObject = dateCreated.toDate();
// console.log("finan date ",dateCreated)

// Extract date components
const year = dateObject.getFullYear();
const month = dateObject.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
const day = dateObject.getDate();

// Forming the date string
const dateString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

// console.log("current time",dateString); // Output format: YYYY-MM-DD

  return (
    <div>
      <Link to={`/podcast/${id}`}>
        <div className="podcast-card">
          <img className="display-image-podcast" src={displayImage} />
          <p className="title-podcast">{title}</p>
          <h5 className="created-by">Created By : {authorName}</h5>
          <h5 className="date-created">Date Created : {dateString}</h5>


        </div>
      </Link>

      {text ? <div className="btn-div"><Button text={text} onClick={onClick} width={"150px"} height={"10px"} /></div> : null}


    </div>
  );
}

export default PodcastCard;


