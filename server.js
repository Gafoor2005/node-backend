const { request } = require('express')
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const util = require('util');
const app = express()
const port = 3000

const fs =require('fs')

app.use(express.json());  // it is most important to parse and read the req json files 
app.use(express.urlencoded({extended : true}));
app.use(fileUpload());


//----------------------------------------------------------------------------


// app.get('/', (req, res) => {
    //     res.send('Hello World!')       // this is an example syntax
// })


//----------------------------------------------------------------------------


app.use(express.static('public'))     // this is used to serve files in public directory on main page



app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
})


app.get('/hello',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/hello.html'))
})


app.get('/upload',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/upload.html'))
})


// ------------------- sign in system start --------------------------------------
app.post('/sign_in',(req,res)=>{    // getting sign in data
    // console.log(req.body);
    
    let output = sign_in(req.body);
    
    console.log(output);
   
    
    res.send(output);

    res.end(); 
})


function sign_in(in_data) {
    // console.log(in_data);
    let status = "done";

    let userslog = fs.readFileSync('./users.json','utf-8');
    userslog = JSON.parse(userslog);
    // userslog.users.splice(2,1);       // ----this is used to delete items from array
    // console.log(userslog.users);

    let len = userslog.users.length;
    let i = 0;
    while (i<len) {
        if (in_data.email == userslog.users[i].email) {
            // console.log("already");
            status = "acc already exist";
            break;
        }
        i++;
    }
    if (i==len) {
        // console.log("new acc");
        status = "new user";
        create_acc(in_data);
    }



    return {status};
}


function create_acc(in_data) {
    // console.log(in_data);
    let userslog = fs.readFileSync('./users.json','utf-8');
    userslog = JSON.parse(userslog);

    let len = userslog.users.length;
    userslog.users[len] = in_data;

    console.log(userslog);
    userslog =JSON.stringify(userslog);

    fs.writeFileSync('./users.json',userslog);
}
//------------------------- sign in system completed ---------------------------





//--------------------------- log in system start ------------------------------
app.post('/log_in',(req,res)=>{
    // console.log('log in ' ,req);

    let output = log_in(req.body);

    // console.log(output);

    res.send(output);
    
    res.end();
})


function log_in(in_data) {
    // console.log(in_data);
    let login ={

    };
    let acc;
    let userslog = fs.readFileSync('./users.json','utf-8');
    userslog = JSON.parse(userslog);
    let len = userslog.users.length;
    

    let i = 0;
    while (i<len) {
        if (in_data.email == userslog.users[i].email) {
            acc = 'found';
            let password = log_in_password(in_data,userslog.users[i]);
            // console.log(password); 
            login.password = password;
            break;
        }
        i++;
        acc = 'not found';
        
    }
    login.account = acc;
    // console.log(login);
    
    return {login};
}


function log_in_password(in_data,user_data) {
    // console.log(in_data);
    // console.log(user_data);
    if (in_data.password == user_data.password) {
        return 'correct password';
    }
    else{
        return 'in-correct password'
    }
}
//-----------------------log in system completed -------------------------




app.post('/upload', async (req,res)=>{
    try {
        console.log(req.body);
        let in_data = req.body;
        const file = req.files.file;
        const filename = file.name;
        const size = file.data.length;
        const extension = path.extname(filename);
        
        const allowedExtensions = /png||jpeg||jpg||gif/;
        if (!allowedExtensions.test(extension)) throw "unsupported extension!";
        if (size > 5000000 )  throw "file must be less than 5MB";

        const md5 = file.md5;
        const URL = '/uploads/' + md5 + extension;

        console.log(md5 + extension);
        in_data.item_img = md5 + extension ;
        console.log(in_data);


        let itemslog = fs.readFileSync('./items.json','utf-8');
        itemslog = JSON.parse(itemslog);
        let len = itemslog.items.length;
        itemslog.items[len] = in_data
        console.log(itemslog);
        itemslog = JSON.stringify(itemslog);
        fs.writeFileSync('./items.json',itemslog);

        file.mv("./public"+URL);
        
        // res.json({
        //     message : "file uploaded successfully"  ,   
        //     url : URL,
        // })
        res.status(200);
        res.redirect(req.originalUrl)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : err
        });
    }
})







app.get('/items',(req,res)=>{
    let itemslog = fs.readFileSync('./items.json','utf-8')
    res.send(itemslog)
})


