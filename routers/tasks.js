import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

import {
  getTasks,
  setTask,
  validateDbModelObject,
} from '../database/firebase.js';

// const userId = 'ciPoB7E53wU6HVDFiCA0ur1A4UU2'; // TEST
const userId = 'TxtYrnST8SdmQ4L92uXncmyuBon1';

router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const tasks = await getTasks({ filters, userId });
    res.send({ data: tasks });
  } catch (err) {
    res.code(500).send({ error: err });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  console.log('body:', body);
  try {
    if (!body?.title) throw 'Missing task title';

    const dateNow = Date.now();
    const newTaskData = {
      dateCreated: dateNow,
      dateModified: dateNow,
      dateDeleted: 0,
      id: uuidv4(),
      status: 'todo',
      title: body.title,
      topic: null,
      panelId: null,
    };

    const validatedBody = validateDbModelObject('task', body);
    const task = { ...newTaskData, ...validatedBody };

    const result = await setTask({
      taskId: task.id,
      task,
      userId,
    });
    res.send({ data: result });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

export default router;
