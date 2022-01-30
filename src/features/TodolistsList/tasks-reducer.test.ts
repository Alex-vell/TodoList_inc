import {addTaskTC, getTasksTC, removeTaskTC, tasksReducer, TasksStateType, updateTask} from './tasks-reducer';
import {addTodolistTC, removeTodolistTC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    let param = {taskId: "2", todolistId: "todolistId2"};
    const action = removeTaskTC.fulfilled(param, 'requestId', param);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});
test('correct task should be added to correct array', () => {

    let task = {
        description: '',
        title: 'juice',
        status: TaskStatuses.New,
        priority: 1,
        startDate: '',
        deadline: '',
        id: 'id exist',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: ''
    }

    const action = addTaskTC.fulfilled({task}, 'requestId', {title: task.title, todolistId: task.todoListId});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});
test('status of specified task should be changed', () => {
    let updateModel = {taskId: "2", model: {status: TaskStatuses.New}, todolistId: "todolistId2"}
    const action = updateTask.fulfilled(updateModel, 'requestId', updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(2);
    expect(endState["todolistId2"][1].status).toBe(0);
});
test('title of specified task should be changed', () => {
    let updateModel = {taskId: "2", model: {title: "yogurt"}, todolistId: "todolistId2"}
    const action = updateTask.fulfilled(updateModel, 'requestId', updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("yogurt");
    expect(endState["todolistId2"][0].title).toBe("bread");
});
test('new array should be added when new todolist is added', () => {

    let newTodolistType = {
        id: '1',
        title: 'New Todolist',
        addedDate: 'string',
        order: 1
    }

    const action = addTodolistTC.fulfilled({todolist: newTodolistType}, 'requesId', {title: newTodolistType.title});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
    const action = removeTodolistTC.fulfilled({id: "todolistId2"}, 'requestId', "todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('task should be added for todolist', () => {
    const action = getTasksTC.fulfilled({
        tasks: startState['todolistId1'],
        todolistId: 'todolistId1'
    }, 'requestId', 'todolistId1')

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})
