import TicketrAPI from './src/TicketrAPI/TicketrAPI.js';

// export default { TicketrAPI };

const ticketrApi = new TicketrAPI();

ticketrApi.getStatus().then(r => {
    console.log(r.status, r.data)
})
.then(() => {
    ticketrApi.getAuth().then(r => {
        console.log(r.status, r.data)
    })
    .catch((e) => {
        console.log(e.code, e.message)
    }).then(() => {
    ticketrApi.getBaskets().then(r => {
        console.log(r.status, r.data)
    })
    .catch((e) => {
        console.log(e.code, e.message)
    })
})
})