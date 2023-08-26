在这个文档中，Group指的是“算法组、前软组”，TaskGroup指的是“英雄、哨兵、平衡步兵”等任务组。

## API需求
### Login

I: userName password

O: status (token) 

### GetUser
I: userID

O: userName, userGroup, userTaskGroup, userType, (userAvatar) 

### GetTaskGroupsBrief
获取任务项目组列表简介

I: 无

O: 如下

taskGroupsList eg:
```js
taskGroupsBrief: [
        { id: 1, name: "英雄", occupy: "算法"},
        {id: 2, name: "步兵", occupy: "嵌软"}
      ]
```
### GetTaskGroupDetail
获取任务项目组详情

详情包括：任务组名称，任务组任务列表，任务组成员，任务组评论，任务组的任务, 任务组的进度等

I: taskGroupID

O: 参考下面

```js
taskGroups: [
        { id: 1, name: '英雄', progress: '机械占用', description: '当前算法占用调辅瞄，预期2023-08-16晚结束',
          tasks: [
            {
              id: 1,
              users: [0, 1, 2, 3],
              name: "调前哨战",
              st: '2023-08-10 10:10:14',
              ddl: '2023-08-20 10:10:14',
              progress: '0.6',
              detail: [
                {
                  user: 0,
                  markdown: '### 标题\n' +
                      '::: warning\n' +
                      '  这是一段警告\n' +
                      ':::\n',
                },
              ]
            },
            {
              id: 2,
              users: [1, 2],
              name: "调蛋速",
              st: '2023-08-16 10:10:14',
              ddl: '2023-08-20 10:10:14',
              progress: '0.8',
            },
            {
              id: 3,
              users: [0, 1],
              name: "改装头",
              st: '2023-08-13 10:10:14',
              ddl: '2023-08-20 10:10:14',
              progress: '0.7',
            },
          ],
          comments: [
            { id: 1, user: '0', message: '弹速今天不稳定:(', time: '2023-08-15 10:10:10' },
            { id: 2, user: '1', message: '辅瞄不稳', time: '2023-08-15 10:11:10' },
            { id: 3, user: '2', message: '零飘严重', time: '2023-08-15 10:12:10' }
          ],
         
        },
        {
            id: 2, //第二个任务……
        }
      ]
```


