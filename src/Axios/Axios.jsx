import axios from '../ConfigAxios';

export function AxiosCreatePost(Header, Body, User_Id) {
  // Format the date so we can add to MySQL
  const date = getDate();

  // Differentiate between if they have a a body or not
  // const HeaderOnly = `/post/create/${Header}/${User_Id}`;
  let u_id = User_Id.replace(/['"]+/g, '');
  const HeaderandBody = `/post/create/${e(Header)}/${e(Body)}/${u_id}/${date}`;
  // const method = Body ? HeaderandBody : HeaderOnly;

  axios.post(HeaderandBody).then(result => {
    if (result.status !== 200) {
      console.log("Return code: ", result.status);
      alert("Something may have went wrong. Please try clicking submit one more time. Error Code: ", result.status);
    }
  }).catch(e => console.log(e));
}


export function AxiosGetPost(Post_Id, User_Id) {
  axios.get(`/post/get/${User_Id}/${Post_Id}`).then( result => {
    return result.data[0];
  }).catch(e => console.log(e));
  console.log("returning")
}

function getDate() {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1; // Javascript months are 0-11
  let day = d.getDate();
  let hour = d.getHours();
  let minute = d.getMinutes();
  let second = d.getSeconds();
  return (year + "-" + month + "-" + day + "-" + hour + ":" + minute + ":" + second)
}

function e(e) {
  return encodeURIComponent(e);
}