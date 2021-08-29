const express = require('express');
const app = express();

const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
})

app.post("/", (req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ptsitecontactreceive@gmail.com",
            pass: "bh27y8dhu39jsn8ui"
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: "ptsitecontactreceive@gmail.com",
        subject: `Contact form Submission from ${req.body.name}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send(error);
        } else{
            console.log("Email sent:" + info.response);
            res.send('success')
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})