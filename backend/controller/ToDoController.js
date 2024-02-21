const {validateTodo} = require('../models/ToDoModel')
const {ToDoModel} = require('../models/ToDoModel')


module.exports.getTodos= async(req,res)=>{
    const toDos = await ToDoModel.find()
    res.send(toDos)
}

module.exports.saveToDo= (req,res)=>{
    const {toDo} = req.body
    response=validateTodo({toDo})
    if(response.error){
        res.send({error:response.error.details,msg:"Something went wrong!"})   
    }else{
        ToDoModel.create({toDo})
        .then(data=>{
            console.log('Saved Successfully');
            res.status(201).send(data) 
        })
        .catch(err=>{
            console.log(err)
            res.send({error:err,msg:"Something went wrong!"})
        })
    }
}

module.exports.updateToDo= (req,res)=>{
    const {id} = req.params
    const {toDo} = req.body
    ToDoModel.findByIdAndUpdate(id,{toDo})
    .then(()=>{
        // console.log('Updated Successfully');
        res.send("Updated Successfully") 
    })
    .catch(err=>{
        console.log(err)
        res.send({error:err,msg:"Something went wrong!"})
    })
}

module.exports.deleteToDo= (req,res)=>{
    const {id} = req.params
    ToDoModel.findByIdAndDelete(id)
    .then(()=>{
        // console.log('Deleted Successfully');
        res.send("Deleted Successfully") 
    })
    .catch(err=>{
        console.log(err)
        res.send({error:err,msg:"Something went wrong!"})
    })
}

module.exports.uploadImage=(req,res,next)=>{
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgSchema.create(obj)
    .then ((err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/api/get');
        }
    });
}