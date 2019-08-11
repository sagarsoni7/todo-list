let data=[{item: "get banana"},{item: "go bath"},{item: "go to college"}];

module.exports=(app)=>{
    app.get("/todo",(req,res)=>{
        res.status(200).render("todo",{todos: data});
    });
    app.post("/todo",(req,res)=>{

    });
    app.delete("/todo",(req,res)=>{

    })
}