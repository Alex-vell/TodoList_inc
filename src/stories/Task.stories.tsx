 import React, {useState} from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';
//
// import { Button } from './Button';
// import {AddItemForm} from "../AddItemForm";
// import {action} from "@storybook/addon-actions";
// import {Task} from "../Task";
// import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
//
// // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// export default {
//   title: 'TODOLISTS/Task',
//   component: Task,
//   // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//   argTypes: {},
//   args: {
//     removeTask: action('removeTask'),
//     changeTaskStatus: action('changeTaskStatus'),
//     changeTaskTitle: action('changeTaskTitle')
//   }
// } as ComponentMeta<typeof Task>;
// // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof Task> = (args) => {
//   const [task, setTask] = useState({id: '1', title: 'TS', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//     startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low});
//   const changeStatus = () => setTask({id: '1', title: 'TS', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//     startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low});
//
//   const newArgs = {...args, task, changeTaskStatus:changeStatus}
//
//   return (
//       <Task {...newArgs} />
//   );
// };
// /*
//
// const [task, setTask] = useState({id: '1', title: 'TS', isDone: true})
// const changeStatus = () => setTask({id: '1', title: 'TS', isDone: !task.isDone})
// const newArgs = {...args, task, }
// */
//
// export const TaskIsDoneStory = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TaskIsDoneStory.args = {
//   task: {id: '1', title: 'TS', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//     startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
// };
//
// export const TaskIsNotDoneStory = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TaskIsNotDoneStory.args = {
//   task: {id: '1', title: 'TS', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//     startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
// };
//
//
//
