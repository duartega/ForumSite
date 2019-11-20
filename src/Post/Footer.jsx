import React, { useState } from 'react';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';

const styles ={
  comment: {
    marginLeft: "25px",
    display: "inline",
    color: "blue",
    textDecoration: "underline",
    cursor: "pointer"}
}

export default function Footer(props) {

  const [UpVote, setUpVote] = useState(props.upvote);
  const [DownVote, setDownVote] = useState(props.downvote);


  return(
    <div>
      <button className="vote-btn">
        <ArrowDropUp style={{fontSize: "40px"}} onClick={() => setUpVote(UpVote + 1)}/>
      </button>
      {UpVote ? UpVote : "0"}

      <button className="vote-btn">
        <ArrowDropDown style={{fontSize: "40px"}} onClick={() => setDownVote(DownVote + 1)}/>
      </button>
      {DownVote ? DownVote : "0"}
      <p
      style={styles.comment}
      onClick={() => console.log("clicked")}
      >Add Comment</p>
    </div>
  )
}