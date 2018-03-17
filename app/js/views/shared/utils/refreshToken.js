// import axios from 'axios';
//
// const refreshToken = window.localStorage.getItem('refreshToken');
//
// export default function() {
//   return new Promise((resolve,reject) => {
//     axios.post('/users/refreshTokens', {refreshToken})
//          .then(res => {
//            if(res.data.name === 'TokenExpiredError') {
//              return reject(res.data);
//            }
//            const tokens = {
//              refreshToken: res.data.refreshToken,
//              authToken: res.headers.authorization.split(' ')[1]
//            }
//            resolve(tokens);
//          })
//          .catch(err => {
//            console.log('buu', err);
//            reject(err);
//          });
//   });
// }
