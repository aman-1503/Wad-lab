const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { Http2ServerResponse } = require("http2");
const https = require("https");
  
mongoose.set('strictQuery', false); 
mongoose.connect("mongodb://127.0.0.1:27017/student", { useNewUrlParser: true });
  
const studentSchema = {
  name: String,
  Roll_no: Number,
  Wad_marks: Number,
  cc_marks: Number,
  dsbda_marks: Number,
  cns_marks: Number,
  ai_marks: Number,
};
  
const Student = mongoose.model("studentmarks", studentSchema); // created a collection
  
const app = express();
  
app.set("view engine", "ejs"); 
  
app.use(bodyParser.urlencoded({
    extended: true
}));

  
app.get("/", function(req, res){
    res.render('home');
}); 
  
app.post("/", function (req, res) {
    
    async function save() 
    {
        try
        {
            const student= new Student({
                name: req.body.name,
                Roll_no: req.body.Roll_no,
                Wad_marks: req.body.Wad_marks,
                cc_marks: req.body.cc_marks,
                dsbda_marks: req.body.dsbda_marks,
                cns_marks: req.body.cns_marks,
                ai_marks: req.body.ai_marks,
                
            });
               
            student.save()
        }
        catch(error)
        {
            console.log(error);
        }
    }

    save();

    async function show()
    {
        try
        {
            //--------------------- all documents
            // const finddocs= await Student.find();
            // const numb= JSON.stringify(await Student.countDocuments());

            // -------------------------------------------dsbda marks greater than 20 and updating it to +10
            // const query=
            // {
            //     dsbda_marks:
            //     {
            //         $gt:20
            //     }
            // }
            // const finddocs= await Student.find(query);

            // await finddocs.forEach(obj=>
            // {
            //     obj.dsbda_marks+=10;
            // })
            

            // res.render('output',
            // {
            //     cnt:numb,
            //     mascots:finddocs
            // });

            //--------------------------------- greater than 20 in all subjects
            //  const query=
            // {
            //     dsbda_marks:{ $gt:20 },
            //     cns_marks:
            //     {
            //         $gt:20
            //     }
            //     ,ai_marks:
            //     {
            //         $gt:20
            //     }
            //     ,Wad_marks:
            //     {
            //         $gt:20
            //     }
            // }
            // const finddocs= await Student.find(query);

            // res.render('output',
            // {
            //     cnt:numb,
            //     mascots:finddocs
            // });

            // less than  40 in maths and science and remove

            //   const query=
            // {
            //     dsbda_marks:{ $lt:40 },
            //     cns_marks:
            //     {
            //         $lt:40
            //     }
            // }
            // const finddocs= await Student.find(query);

            // await finddocs.forEach(obj=>
            //     {
            //         async function newfunct()
            //         {
            //             try{
            //         await Student.findOneAndRemove({Roll_no:obj.Roll_no});
            //             }
            //             catch(error)
            //             {
            //                 console.log(error);
            //             }
            //         }

            //         newfunct();
            //     })

            //     const rem= await Student.find();

            // res.render('output',
            // {
            //     cnt:numb,
            //     mascots:rem
            // });



           
        }
        catch(error)
        {
            console.log(error);
        }
    }

    show();
  
});
  
app.listen(3000, function(){
    console.log("App is running on Port 3000");
});