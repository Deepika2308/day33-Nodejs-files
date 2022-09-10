import express from "express";
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();

const app= express();
app.use(express.json());
const PORT = process.env.PORT;

let content = `This is an API to read and write to files.<br/>
Append /write to the url to write files.<br/>
Append /read to the url read files, provide folder name in the request body(postman) as below <br/>
method - GET <br/>
data - raw,json <br/> 
body - { <br/>
    "fname": "7_12" <br/>
}`

app.get("/",(req,res) =>{
    res.send(`${content}`);
})

app.get("/write", (req,res) =>{

    //get todays date
    let today= new Date();

    //get month
    let folderMonth=today.getMonth()+1;

    //get date
    let folderDate = today.getDate();

    //create folder with month_date
    let folder =`/b27/day_33/filesystem/${folderMonth}_${folderDate}`;
    
    //create directory if not exists
    try{
        if(!fs.existsSync(folder)){
            fs.mkdirSync(folder);
        }
    }catch(err){
        console.log(err);
    }
    
    //getting current timestamp
    let content = today.toString();
    
    // console.log(today.toLocaleString());
    
    //convert to iso date and get the date alone
    let date = today.toISOString();
    let istDate = date.split("T")[0];
    let splitDate = istDate.split("-");
    let resDate = splitDate.join(".");
    
    //convert ISO time to IST
    let istTime = today.toLocaleTimeString();
    let splitTime = istTime.split(":");
    
    let resTime =splitTime.join(".");

    //write file
    fs.writeFile(`${folder}/${resDate}-${resTime}.txt`,content,(err) =>{
        if(err){
            res.send(err);
        }
        else{
            res.send("Writing file completed");
        }
    })
})

app.get("/read", (req,res) =>{
    //get folder name from request body
    let foldername = req.body;
    
    let folderName = foldername.fname;

    fs.readdir(folderName,(err,files) =>{
        if(err){
            res.send(err);
        }
        else{
            let arr=[];
            let obj={};
            //put all the file names in array of object and return array
            files.forEach((file,index) =>{
                let key=`file${index+1}`;
                obj[key]=file;
            })
            arr.push(obj);
            res.send(arr);
        }
    })
})

app.listen(PORT, () => console.log(`this app is listening to port ${PORT}`));
