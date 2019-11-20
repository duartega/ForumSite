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
  const [Vote, setVote] = useState(null);

  function handleVote(vote) {
    if (vote === "up") {
      if (!Vote){
        setUpVote(UpVote + 1);
        setVote("up");
      } else if (Vote === "down") {
        setUpVote(UpVote + 1);
        setVote("up");
        setDownVote(DownVote - 1);
      }
      else if (Vote === "up") {
        setUpVote(UpVote - 1);
        setVote(null);
      }
    }

    else if (vote === "down") {
    // If the vote is down, and hasnt been voted for yet, add 1 to downvote
      if (!Vote) {
        setDownVote(DownVote + 1);
        setVote("down");
      }
      // If the user has already voted up and now clicked the down, it will
      // remove one from the up vote and add one to the down vote
      else if (Vote === "up") {
      setUpVote(UpVote - 1);
      setDownVote(DownVote + 1)
      setVote("down");
    }
    // If the user decides to revoke a vote, allow the user to do so
    else if (Vote === "down") {
      setDownVote(DownVote - 1);
      setVote(null);
    }
  }
  }

  return(
    <div>
      <button className="vote-btn">
        <ArrowDropUp style={{fontSize: "40px"}} onClick={() => handleVote("up")}/>
      </button>
      {UpVote ? UpVote : "0"}

      <button className="vote-btn">
        <ArrowDropDown style={{fontSize: "40px"}} onClick={() => handleVote("down")}/>
      </button>
      {DownVote ? DownVote : "0"}
      <p
      style={styles.comment}
      onClick={() => console.log("clicked")}
      >Add Comment</p>
    </div>
  )
}