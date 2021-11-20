import express from 'express';
import tasksRouter from './routers/tasks.js';
// import panelsRouter from './routers/panels.js';
// import topicsRouter from './routers/topics.js';

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
  res.send('It works');
});

app.use('/tasks', tasksRouter);
// app.use('/panels', panelsRouter);
// app.use('/topics', topicsRouter);

const port = process.env.PORT || 3000;
console.log(`Server listening on port ${port}`);
app.listen(port);
