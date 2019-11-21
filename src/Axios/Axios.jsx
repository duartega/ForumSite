import axios from '../ConfigAxios';

export function AxiosCreatePost(Header, Body, User_Id) {
  const date = getDate();
  const HeaderOnly = `/post/create/${Header}/${User_Id}`;
  const HeaderandBody = `/post/create/${e(Header)}/${e(Body)}/${User_Id}/${date}`;
  const method = Body ? HeaderandBody : HeaderOnly;
  // /post/create?header='your header'&body='your body'
  axios.post(method).then(result => {
    alert("Your post has been added!")
    console.log("Posted")
  }).catch(function (error) {
      // Output error
      console.log(error);
  });
};

function getDate() {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDay();
  let hour = d.getHours();
  let minute = d.getMinutes();
  let second = d.getSeconds();
  return (year + "-" + month + "-" + day + "-" + hour + ":" + minute + ":" + second)
}

function e(e) {
  return encodeURIComponent(e);
}