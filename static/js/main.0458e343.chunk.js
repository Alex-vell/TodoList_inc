(this["webpackJsonptodolist-ts"]=this["webpackJsonptodolist-ts"]||[]).push([[0],{66:function(t,e,c){},67:function(t,e,c){},74:function(t,e,c){"use strict";c.r(e);var a=c(0),n=c.n(a),i=c(9),o=c.n(i);c(66),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c(67);var l=c(29),r=c(115),s=c(105),d=c(106),u=c(5),j=n.a.memo((function(t){var e=Object(a.useState)(""),c=Object(l.a)(e,2),n=c[0],i=c[1],o=Object(a.useState)(null),j=Object(l.a)(o,2),b=j[0],O=j[1];console.log("AddItemForm");var T=function(){""!==n.trim()?(t.addItem(n),i("")):O("Title is required")};return Object(u.jsxs)("div",{children:[Object(u.jsx)(r.a,{variant:"outlined",error:!!b,value:n,onChange:function(t){i(t.currentTarget.value)},onKeyPress:function(t){null!==b&&O(null),13===t.charCode&&T()},label:"Title",helperText:b}),Object(u.jsx)(s.a,{color:"primary",onClick:T,children:Object(u.jsx)(d.a,{})})]})})),b=n.a.memo((function(t){console.log("EditableSpan");var e=Object(a.useState)(!1),c=Object(l.a)(e,2),n=c[0],i=c[1],o=Object(a.useState)(t.value),s=Object(l.a)(o,2),d=s[0],j=s[1];return n?Object(u.jsx)(r.a,{value:d,onChange:function(t){j(t.currentTarget.value)},autoFocus:!0,onBlur:function(){i(!1),t.onChange(d)}}):Object(u.jsx)("span",{onDoubleClick:function(){i(!0),j(t.value)},children:t.value})})),O=c(108),T=c(107),h=c(116),f=n.a.memo((function(t){console.log("Task");var e=t.task,c=e.id,n=e.title,i=e.isDone,o=Object(a.useCallback)((function(){return t.removeTask(c)}),[t.removeTask,c]),l=Object(a.useCallback)((function(e){var a=e.currentTarget.checked;t.changeTaskStatus(c,a)}),[t.changeTaskStatus,c]),r=Object(a.useCallback)((function(e){t.changeTaskTitle(c,e)}),[t.changeTaskTitle,c]);return Object(u.jsxs)("div",{className:i?"is-done":"",children:[Object(u.jsx)(h.a,{checked:i,color:"primary",onChange:l}),Object(u.jsx)(b,{value:n,onChange:r}),Object(u.jsx)(s.a,{onClick:o,children:Object(u.jsx)(T.a,{})})]},t.task.id)})),k=n.a.memo((function(t){console.log("Todolist");var e=Object(a.useCallback)((function(e){t.addTask(e,t.id)}),[t.addTask,t.id]),c=Object(a.useCallback)((function(){t.removeTodolist(t.id)}),[t.removeTodolist,t.id]),n=Object(a.useCallback)((function(e){t.changeTodolistTitle(t.id,e)}),[t.changeTodolistTitle,t.id]),i=Object(a.useCallback)((function(){return t.changeFilter("all",t.id)}),[t.changeFilter,t.id]),o=Object(a.useCallback)((function(){return t.changeFilter("active",t.id)}),[t.changeFilter,t.id]),l=Object(a.useCallback)((function(){return t.changeFilter("completed",t.id)}),[t.changeFilter,t.id]),r=t.tasks;"active"===t.filter&&(r=r.filter((function(t){return!1===t.isDone}))),"completed"===t.filter&&(r=r.filter((function(t){return!0===t.isDone})));var d=Object(a.useCallback)((function(e){t.removeTask(e,t.id)}),[t.removeTask,t.id]),h=Object(a.useCallback)((function(e,c){t.changeTaskStatus(e,c,t.id)}),[t.changeTaskStatus,t.id]),k=Object(a.useCallback)((function(e,c){t.changeTaskTitle(e,c,t.id)}),[t.changeTaskTitle,t.id]);return Object(u.jsxs)("div",{children:[Object(u.jsxs)("h3",{children:[Object(u.jsx)(b,{value:t.title,onChange:n}),Object(u.jsx)(s.a,{onClick:c,children:Object(u.jsx)(T.a,{})})]}),Object(u.jsx)(j,{addItem:e}),Object(u.jsx)("div",{children:r.map((function(t){return Object(u.jsx)(f,{task:t,removeTask:d,changeTaskStatus:h,changeTaskTitle:k},t.id)}))}),Object(u.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(u.jsx)(O.a,{variant:"all"===t.filter?"outlined":"text",onClick:i,color:"default",children:"All"}),Object(u.jsx)(O.a,{variant:"active"===t.filter?"outlined":"text",onClick:o,color:"primary",children:"Active"}),Object(u.jsx)(O.a,{variant:"completed"===t.filter?"outlined":"text",onClick:l,color:"secondary",children:"Completed"})]})]})})),v=c(109),g=c(110),x=c(112),m=c(113),p=c(114),C=c(75),I=c(111),S=c(11),A=c(41),D=c(117),E=[],y=c(21),L={},w=c(28);var F=function(){console.log("AppWithRedux");var t=Object(w.c)((function(t){return t.todolists})),e=Object(w.c)((function(t){return t.tasks})),c=Object(w.b)(),n=Object(a.useCallback)((function(t,e){var a=function(t,e){return{type:"REMOVE-TASK",taskId:t,todolistId:e}}(t,e);c(a)}),[c]),i=Object(a.useCallback)((function(t,e){var a=function(t,e){return{type:"ADD-TASK",title:t,todolistId:e}}(t,e);c(a)}),[c]),o=Object(a.useCallback)((function(t,e,a){var n=function(t,e,c){return{type:"CHANGE-TASK-STATUS",isDone:e,todolistId:c,taskId:t}}(t,e,a);c(n)}),[c]),l=Object(a.useCallback)((function(t,e,a){var n=function(t,e,c){return{type:"CHANGE-TASK-TITLE",title:e,todolistId:c,taskId:t}}(t,e,a);c(n)}),[c]),r=Object(a.useCallback)((function(t,e){var a={type:"CHANGE-TODOLIST-FILTER",id:e,filter:t};c(a)}),[c]),d=Object(a.useCallback)((function(t){var e={type:"REMOVE-TODOLIST",id:t};c(e)}),[c]),b=Object(a.useCallback)((function(t,e){var a=function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}}(t,e);c(a)}),[c]),T=Object(a.useCallback)((function(t){var e=function(t){return{type:"ADD-TODOLIST",title:t,todolistId:Object(D.a)()}}(t);c(e)}),[c]);return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(v.a,{position:"static",children:Object(u.jsxs)(g.a,{children:[Object(u.jsx)(s.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(u.jsx)(I.a,{})}),Object(u.jsx)(x.a,{variant:"h6",children:"News"}),Object(u.jsx)(O.a,{color:"inherit",children:"Login"})]})}),Object(u.jsxs)(m.a,{fixed:!0,children:[Object(u.jsx)(p.a,{container:!0,style:{padding:"20px"},children:Object(u.jsx)(j,{addItem:T})}),Object(u.jsx)(p.a,{container:!0,spacing:3,children:t.map((function(t){return Object(u.jsx)(p.a,{item:!0,children:Object(u.jsx)(C.a,{style:{padding:"10px"},children:Object(u.jsx)(k,{id:t.id,title:t.title,tasks:e[t.id],removeTask:n,changeFilter:r,addTask:i,changeTaskStatus:o,filter:t.filter,removeTodolist:d,changeTaskTitle:l,changeTodolistTitle:b})})},t.id)}))})]})]})},N=c(45),K=Object(N.a)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(S.a)(Object(S.a)({},t),{},Object(y.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskId}))));case"ADD-TASK":return Object(S.a)(Object(S.a)({},t),{},Object(y.a)({},e.todolistId,[{id:Object(D.a)(),title:e.title,isDone:!1}].concat(Object(A.a)(t[e.todolistId]))));case"CHANGE-TASK-STATUS":return Object(S.a)(Object(S.a)({},t),{},Object(y.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(S.a)(Object(S.a)({},t),{},{isDone:e.isDone}):t}))));case"CHANGE-TASK-TITLE":return Object(S.a)(Object(S.a)({},t),{},Object(y.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(S.a)(Object(S.a)({},t),{},{title:e.title}):t}))));case"ADD-TODOLIST":return Object(S.a)(Object(S.a)({},t),{},Object(y.a)({},e.todolistId,[]));case"REMOVE-TODOLIST":var c=Object(S.a)({},t);return delete c[e.id],c;default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!=e.id}));case"ADD-TODOLIST":return[{id:e.todolistId,title:e.title,filter:"all"}].concat(Object(A.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(S.a)(Object(S.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(S.a)(Object(S.a)({},t),{},{filter:e.filter}):t}));default:return t}}}),G=Object(N.b)(K);window.store=G,o.a.render(Object(u.jsx)(w.a,{store:G,children:Object(u.jsx)(F,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[74,1,2]]]);
//# sourceMappingURL=main.0458e343.chunk.js.map