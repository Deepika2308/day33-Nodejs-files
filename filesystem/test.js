let today= new Date();
let content = today.toString();

// console.log(today.toLocaleString());

let date = today.toISOString();
let istDate = date.split("T")[0];
let splitDate = istDate.split("-");
let resDate = splitDate.join(".")
console.log(resDate);

// console.log(`ist date ${splitDate}`);

let istTime = today.toLocaleTimeString();
let splitTime = istTime.split(":");

let setTime =splitTime.join(".");
// console.log(`time is ${setTime}`);