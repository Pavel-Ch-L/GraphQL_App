const { isTypeExtensionNode } = require('graphql')
const Todo = require('../models/todo')

const users = [
  {name: 'Igor', age: 30, email: 'irog@mail.ru'},
  {name: 'Elena', age: 25, email: 'elena@mail.ru'}
]

module.exports = {
  test() {
    return {
      count: Math.trunc(Math.random() * 10),
      users
    }
  },
  random( {min, max, count} ) {
    const arr =[]
    for(let i = 0; i < count; i++) {
      const random = Math.random() * (max - min) + min
      arr.push(random)
    }
    return arr
  },
  addTestUser( {user: {name, email}} ) {
    const user = {
      name, email,
      age: Math.ceil(Math.random() * 30)
    }
    users.push(user)
    return user
  },
  async getTodos() {
    try {
      return await Todo.findAll()
    } catch (error) {
      throw new error('Fetch todos is not available')
    }
  },
  async createTodo({todo}) {
    try {
      return await Todo.create({
        title: todo.title,
        done: false
      })
    } catch (error) {
      throw new Error('Title is required')
    }
  },
  async completeTodo({id}) {
    try {
      const todo = await Todo.findByPk(id)
      todo.done = true
      await todo.save()
      return todo
    } catch (error) {
      throw new Error('Id is requires')
    }
  }
}