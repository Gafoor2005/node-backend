
txt =  230;

//*******************-------- getting data ---------************************* */
// if (txt == 23) {
  
//   fetch('/hello.json')
//     .then((response) => response.json())
//     .then((data) => console.log(data));
  
// }




//*******************-------- sending data ---------************************* */
// const data = { username: 'example' };

// fetch('/', {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data)
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data));
  


//*********************************\---------- sign in -----------/********************************//

// let username = "hello";
let email = "hello@imail.com";
let password = "123hell";


// ------------------- sign in system start --------------------------------------
let sign_in_obj = {
  email,
  password
};
// console.log(sign_in_obj);


function sign_in_submit() {
  console.log("sign in submitted");
  fetch('/sign_in', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(sign_in_obj)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}
// sign_in_submit()        // calls fun when hit submit btn
//------------------------- sign in system completed -----------------------------

//-----------------------------log in system start ------------------------------
let log_in_obj = {
  email,
  password
};
// console.log(log_in_obj);

let logindata = {

};

function log_in_submit() {
  console.log("log in submitted");
  fetch('/log_in', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(log_in_obj)
  })
  .then((response) => response.json())
  .then((data) => {
    // console.log('log in Success:', data);
    logindata.data = data;
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}
log_in_submit()        // calls fun when hit submit btn
//------------------------- log in system completed -----------------------------

console.log(logindata);