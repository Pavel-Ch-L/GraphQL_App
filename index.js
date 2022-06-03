const express = require('express')
const path = require('path')
const sequelize = require('./utils/database')
const toDoRoutes = require('./routes/toDo')
const app = express()
const PORT = process.env.PORT || 3000

app.use( express.static(path.join(__dirname, 'public')) )
app.use( express.json() )
app.use('/api/todo', toDoRoutes)

app.use( (req, res, next) => {
  res.sendFile('/index.html')
} )

async function start() {
  try {
    await sequelize.sync()// {force: true} Принудительно синхронизировать модель на сервере
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    })
  } catch (error) {
    console.log(error);
  }
}

start()

