const bodyParser=require("body-parser");    
const urlencodedParser=bodyParser.urlencoded({extended: false});
let data=[{item: "get banana"},{item: "go bath"},{item: "go to college"}];


module.exports=(app)=>{
    app.get("/todo", (req,res)=>{
        res.status(200).render("todo",{todos: data});
    });
    app.post("/todo",urlencodedParser,(req,res)=>{
        data.push(req.body);
        res.json(data);
    });
    app.delete("/todo/:item",(req,res)=>{
        data=data.filter((todo)=>{
            return todo.item.replace(/ /g,"-") !== req.params.item;
        });
        res.json(data);
    })
}