var mongoose=require('mongoose');
mongoose.connect("mongodb+srv://sangamesh4514:sam@4514@cluster0.lun0j.mongodb.net/todo?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true });
var todoschema=new mongoose.Schema({
  item:String
});
var Todo=mongoose.model('Todo',todoschema);

//var data=[{item:'walk dog'},{item:'walk me'},{item:'walk'},{item:'walk cat'}]
var bodyParser=require('body-parser');
var urlencodedparser=bodyParser.urlencoded({extended:false});
module.exports = (app)=>{
app.get('/todo',(req,res)=>{
  Todo.find({},(err,data)=>{
    if(err) throw err;
    res.render('todo',{todos:data});
  });
});
app.post('/todo',urlencodedparser,(req,res)=>{
  //data.push(req.body);
  console.log(req.body);
  var newtodo=Todo(req.body).save((err,data)=>{
    if(err) throw err;
    res.json(data)
  });
});
app.delete('/todo/:item',urlencodedparser,(req,res)=>{
 Todo.find({item:req.params.item.replace(/\-/g," ")}).remove((err,data)=>{
   if(err) throw err;
   res.json(data);
 });

});
};
