const {Router} = require("express");
const { getTodos,saveToDo,updateToDo,deleteToDo,uploadImage } = require("../controller/ToDoController");
const upload = require("../server");

const router = Router()

router.get('/get',getTodos)
router.post('/save',saveToDo)
router.put('/update/:id',updateToDo)
router.delete('/delete/:id',deleteToDo)
// router.post('/uploadImage',upload.single('image'),uploadImage)

module.exports=router;