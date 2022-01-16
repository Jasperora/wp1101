# Event Allocator
![](https://i.imgur.com/RNMy3hH.jpg)

## 介紹 - Event Allocator
讓參加活動者有一個更好的方式約時間，讓網站決定哪個時段有最多人
## 技術
- 用bcrypt將密碼加密再存入資料庫，增加安全性
- 利用js-cookie和jsonwebtoken實作登入和登出功能，讓刷新頁面時若帶有cookie則會自動登入
- 用react router設定不同頁面
- 利用Date resolver(new GraphQLScalarType)和moment
## 使用套件
```antd```, ```bcrypt```, ```dotenv-defaults```, ```graphql-yoga```, ```jsonwebtoken```, ```mongoose```, ```nodemon```, ```path```, ```url```, ```uuid```, ```@babel/cli```, ```@babel/core```, ```@babel/node```, ```@babel/plugin-proposal-class-properties```, ```@babel/plugin-proposal-object-rest-spread```, ```@babel/plugin-transform-arrow-functions```, ```@babel/preset-env```, ```@apollo/client```, ```@apollo/react-hooks```, ```@mui/icons-material```, ```apollo-link-ws```, ```graphql```, ```react-apollo```, ```subscriptions-transport-ws```, ```@ant-design/icons```, ```@emotion/react```, ```@emotion/styled```, ```@material-ui/core```, ```@material-ui/lab```, ```@mui/base```, ```@mui/icons-material```, ```@mui/lab```, ```@mui/material```, ```@mui/system```, ```@reduxjs/toolkit```, ```@testing-library/jest-dom```, ```@testing-library/react```, ```@testing-library/user-event```, ```apollo-link-context```, ```axios```, ```clsx```, ```final-form```, ```js-cookie```, ```moment```, ```prop-types```, ```react```, ```react-copy-to-clipboard```, ```react-dom```, ```react-final-form```, ```react-redux```, ```react-router```, ```react-router-dom```, ```react-scripts```, ```styled-components```, ```web-vitals```

## 程式架構
### 檔案架構
由於程式真的有點大，所以.gitignore、yarn.lock...之類的常態性的設定檔就不寫進以下的程式架構了。
我的程式分成frontend、backend，分處最外層的資料夾中，**主程式**都在```./src```資料夾，**環境設定檔**```.env```和```.env.defaults```都在```backend```資料夾。
另外在最外層、frontend、backend各有一個```package.json```。
```
|- backend
　|- src
　|- resolvers
      |- Date.js
      |- Event.js
      |- Mutation.js
      |- Query.js
      |- Subscription.js
      |- User.js
      |- utility.js
　　|- index.js
    |- model.js
    |- mongo.js
    |- schema.graphql
　|- .babelrc
　| .env　
　|- .env.defaults
　|- package.json
|- frontend
  |- src
    |- components
      |- AccountSetting.js
      |- Appbar.js
      |- AppFooter.js
      |- Button.js
      |- Calendar.js
      |- MainBar.js
      |- MainSider.js
      |- ModalButtonGroup.js
      |- MyEvents.js
      |- Snakbar.js
      |- TextField.js
      |- ToolBar.js
      |- Typography.js
    |- containers
      |- Home.js
      |- Main.js
      |- Profile.js
      |- SighIn.js
      |- SighUp.js
    |- graphql
      |- index.js
      |- mutation.js
      |- queries.js
      |- subscription.js
    |- hook
      |- userUser.js
    |- image
      |- HomeCover.jpg
    |- routes
      |- privateRoute.js
      |- publicRoute.js
    |- views
      |- AppAppbar.js
      |- AppForm.js
      |- HeroLayout.js
      |- HomeCover.js
      |- HowItWorks.js
      |- SomkingHero.js
    |- App.js
    |- App.test.js
    |- index.css
    |- index.js
    |- nevigate.js
    |- reportWebVitals.js
    |- setupTest.js
    |- theme.js
    |- withRoot.js
　|- .babelrc
　|- package.json
|- package.json
|- Readme.md
```
### 程式架構
* 使用**GraphQL Server** + **ApolloClient**
### Data Structures (schema.graphql)
1. date
    ```javascript=
    scalar Date
    ```
2. event
    ```javascript=
    type Event{
    id:String!
    name:String!
    content:String!
    launcher:String!
    endTime:[Date]!
    attender:[[String]]!
    startTime:[Date]!
    }
     ```
    
3. user
    ```javascript=
    type User{
        id:ID!
        name:String!
        password:String!
        events:[String]!
        chooseTime:[[Boolean]]!
    }
    ```
4. query
    ```javascript=
    type Query{
        event(name:String):[Event]!
        chooseTime(userName:String):[[Boolean]]!
    }
    ```
5. mutation
    ```javascript=
    type Mutation{
        createUser(name:String!,password:String!):UserMutationPayload
        createEvent(id:String!,name:String!,content:String!,launcher:String!,endTime:[Date]!,startTime:[Date]!):Event!
        login(name:String!,password:String!):UserMutationPayload
        addEvent(userName:String!,id:String!):String!
        modifyEventAttender(action:String!,eventID:String!,userName:String!,index:Int!):String!
        deleteEvent(eventID:String!):String!
        initialization:initializationPayload
    }
    ```

6. subscription
    ```javascript=
    type Subscription{
        eventCreated(name:String!):EventSubscriptionPayload
        eventUpdated(userName:String!):EventSubscriptionPayload
        eventDeleted:String!
        chooseTimeUpdated(userName:String!):[[Boolean]]!
    }
    ```

## Deploy on Heroku
> URL: https://eventallocator.herokuapp.com/

我們使用[Heroku](https://dashboard.heroku.com)部署我們的網站，使用限制有：
* 一個月只有550小時的使用時間
* 30分鐘沒有會休眠，因為我們沒再另外設定，所以**畫面顯示前跑個十幾秒是正常的**
* Heroku維護：[name=吳宣逸] 
    * gmail：*redpig815@gmail.com*

## Localhost端使用方法
1. 將程式git clone並用yarn或npm安裝套件，注意最外層、frontend、backend皆須```yarn```，**共安裝3次**。
2. 在frontend資料夾加上.env檔，內容為：
    ```
    MONGO_URL= <your MONGO_URL>
    JWT_SECRET = <your JWT_SECRET>
    ```
    ```<your MONGO_URL>```請使用自己mongoDB的URL。```<your JWT_SECRET>```使用任何字皆可，eg. wp1101。
3. 在最外層在terminal用```yarn heroku-postbuild```建立靜態前端，接著用```yarn start```啟動後端，兩者皆在最外層terminal執行。
4. 等到terminal顯示
    ```
    The server is up on port 5000!
    MongoDB connected!
    ```
    就能在[localhost:5000](http://localhost:5000/)看到網頁了。

## User Guide
* 從clone到架設方式在上方**Localhost端使用方法**
* 我們的網路服務程式有[signin](https://eventallocator.herokuapp.com/signin)的功能，只要到[sighup](https://eventallocator.herokuapp.com/signup)註冊新帳後就可以開始使用了。需要注意每個使用者名稱是獨一無二的，若是提示**This name is used.** ，再更換使用者名稱直到成功註冊。
* 成功signin之後，就會出現主畫面，透過最上方**MY CALENDAR**和**MY EVENTS**按鈕可以切換**日曆**以及**所有事件**兩種檢視模式
    1. 檢視日曆(My Calendar)
        * 最左側sider顯示全部的event名稱，也可以看自己發起的event和加入的event(可以發起event讓其他使用者加入)
        * hover過日曆上的event名稱能看到各自的event內容
        * 日曆上event顏色(綠/灰)代表今天是否有此event正在進行。
        * 右上的懸浮視窗可以查看Profile，上面會統計現在發起和加入的event數量
        ![](https://i.imgur.com/8qsvK6l.png) 
        * Profile頁面 
        ![](https://i.imgur.com/tSv0ULf.png)

    3. 檢視所有事件(My Events)
        * 在這裡能夠看到所有事件的細節：名稱、內容、時間(可有多個時間)、發起人、事件ID
        * 時間會顯示每一時段的時距，點擊時距可以**選擇是否參加該時段**，綠色代表參加，灰色反之，hover則可以看到目前所有參加者的名字
        * 可以使用event ID讓別人加入自己發起的活動，只要點擊ID就可以輕鬆複製，自行貼給別人。
        * 點擊每個event下方的小垃圾桶，即可刪除event(只能刪除自己發起的活動)
        ![](https://i.imgur.com/tshq6xF.png)

* 用畫面上方的按鈕可以選擇viewMode和filter或發起/加入event，這些功能在日曆、所有活動兩種檢視模式下都有。
    ![](https://i.imgur.com/6haMgaj.png)

    1. View Mode
        Event Allocator對於每個event，假定發起人會從參與人數最多的時段選擇活動時間，因此我們判斷使用者是否參加人數最多的時段，結果在**RESULT**的view mode下即可查看。**RAW**則是原始資料。
    3. Filter
        **ALL**可以查看使用者的所有event；**CREATED**顯示使用者發起的所有event；**ADDED**則是使用者加入的所有event。
    5. Actions
        * Create Event
            在這裡創造事件，**Add Time**用來選擇活動時段
            ![](https://i.imgur.com/4cz4yYc.png)
        * Add Event (+)
            收到其他使用者的event ID後，就可以在這裡加入event
            ![](https://i.imgur.com/cP9xO0Y.png)

* 因為我們有使用js-cookie和jsonwebtoken，所以刷新頁面時不會自動登出。

## 組員分工
* 吳宣逸
    1. 前端```/```+```/main```靜態頁面
    2. Heroku部署維護(但程式端是陳威侑和助教將server的code修改成可在Heroku單dyno環境下部署)
    3. 影片拍攝
    4. Readme**程式架構**以後
* 陳威侑
    1. 前端```/signup```、```/signin```靜態頁面
    2. 後端(backend)全部
    4. js-cookie和jsonwebtoken
    5. React Router
    6. Readme**使用套件**以前

