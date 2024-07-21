const todo_controller=require('../controllers/todo.controller')

module.exports=(app)=>{
    app.post('/todoAppln/api/v1/tasks',todo_controller.createTask)
    app.get('/todoAppln/api/v1/tasks',todo_controller.getAllTasks)
    app.get('/todoAppln/api/v1/tasks/name',todo_controller.getTaskUsingName)
    app.put('/todoAppln/api/v1/tasks',todo_controller.updateTask)
    app.delete('/todoAppln/api/v1/tasks',todo_controller.deleteTask)

    app.get('/todoAppln/api/v1/tasks/completed',todo_controller.getCompletedTasks)
    app.get('/todoAppln/api/v1/tasks/pending',todo_controller.getPendingTasks)
}