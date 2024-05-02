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

function PodcastCard({ id, title, displayImage, text, onClick , authorName}) {


  return (
    <div>
      <Link to={`/podcast/${id}`}>
        <div className="podcast-card">
          <img className="display-image-podcast" src={displayImage} />
          <p className="title-podcast">{title}</p>
          <h5>Created By : {authorName}</h5>


        </div>
      </Link>

      {text ? <div className="btn-div"><Button text={text} onClick={onClick} width={"150px"} height={"10px"} /></div> : null}


    </div>
  );
}

export default PodcastCard;


