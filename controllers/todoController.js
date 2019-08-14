const mongoose=require("mongoose");
const bodyParser=require("body-parser");    
const urlencodedParser=bodyParser.urlencoded({extended: false});

//connect to databse
mongoose.connect("mongodb+srv://sagarsoni:nopassword123@todo-app-eoj9e.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});

//create a schema
const todoSchema=new mongoose.Schema({
    item: String
});

//create a model
const Todo=mongoose.model("Todo",todoSchema);

// let data=[{item: "get banana"},{item: "go bath"},{item: "go to college"}];

module.exports=(app)=>{
    app.get("/",(req,res)=>{      
        res.status(200).send("this is my todo app");
    })
    app.get("/todo", (req,res)=>{
        //fetch data from mongodb
        Todo.find({},(err,data)=>{
        if (err) throw err;
        res.status(200).render("todo",{todos: data});
        })

    });
    app.post("/todo",urlencodedParser,(req,res)=>{
        //get data from the view and post it to the db
        let todoTodo=Todo(req.body).save((err,data)=>{
            if(err) throw err;
            res.json(data);
        })
    });
    app.delete("/todo/:item",(req,res)=>{
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove((err,data)=>{
            if(err) throw err;
            res.json(data)
        });
     
    })
}