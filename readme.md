# Nodejs 無框架待辦事項網站

![image](https://user-images.githubusercontent.com/5466631/156024235-1b781b70-8368-47c9-a0cf-fe14259d6413.png)

[demo](https://fast-fjord-13680.herokuapp.com/)


## 概念

關注點分離

1. 分開 server.js 與 app.js。server.js 專心啟動 server，app.js 負責接受 req, res 並做後續處理
2. 不用 routes, controllers, services, models 資料夾結構，改採用 components 結構，將處理相同資料源的 js 檔案放在同一個資料夾下
3. 在 utils 中拆分出 header.js, responseHandler.js, errorHandler.js，方便復用

其他

1. 資料儲存不用 array 改用 sqlite、並建立 model.js 方便操作資料
2. 在 app.js 中拆分路由，並透過類似 controller 角色的 components/todos/index.js 與 components/todo/index.js 兩支檔案做後續處理
3. 手刻了前端頁面，並串接後端

## 使用套件

後端

- "sqlite": "^4.0.23",
- "sqlite3": "^5.0.2",
- "uuid": "^8.3.2"

前端

- sweetAlert2
