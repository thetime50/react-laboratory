[浅谈 React 状态管理工具](https://zhuanlan.zhihu.com/p/475785123)
[React 全局状态管理器 redux, mobx, react-immut 等横向对比](https://www.tangshuang.net/7862.html)
[redux、mobx、concent 特性大比拼, 看后生如何对局前辈](https://segmentfault.com/a/1190000022332809)

1. redux
2. rematch 是 redux 的封装 初始化时可以把 state action 分开
3. react-immut 和 redux 一致,仅仅是在定义 store 的时候，只需要传入初始状态就行了,分区简单，不需要写大堆 reducer 代码
4. mobx 使用装饰器定义 class 实现

## redux

https://redux.js.org/introduction/getting-started  
应用程序的可预测状态容器  
https://www.redux.org.cn/

[廖雪峰 Redux 入门教程（一）：基本用法](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

npm install react-redux @reduxjs/toolkit -S
@reduxjs/toolkit 包括了 redux-core

<s>
npm install --save-dev @redux-devtools/core # devtool 工具 
npm install -D redux-devtools-extension # devtool 工具 类型定义  
[redux toolkit](https://redux-toolkit.js.org/introduction/getting-started) 
[redux-devtools](https://github.com/reduxjs/redux-devtools)

[Day 14-和 Redux 合作重寫 todos 吧](https://ithelp.ithome.com.tw/articles/10203447)

```ts
+ /* eslint-disable no-underscore-dangle */
  const store = createStore(
   reducer, /* preloadedState, */
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
+ /* eslint-enable */
```

</s>

```ts
createStore(
  combineReducer({
    cnt: function (state, action) {
      switch (
        action.type
        // xxx
      ) {
      }
    },
    loading: function (state, action) {
      switch (
        action.type
        // xxx
      ) {
      }
    },
  })
);
// 相当于
// 多类型支持直接在createStore里面实现不就好了。。。
createStore(function rootRedux(state, action) {
  return {
    cnt: cnt(state, action),
    loading: loading(state, action),
  };
});
```

state 是只读的，使用 action 来更新数据解决 race codition 问题。redocer 是 codition 的具体实现  
通过 combineRedecera 合并起来，里面每个 reducer 模块函数是可以复用的

先前的技术 Flux Elm Immutable Backbone cursor reselect Baobab Rx  
[awesome-redux](https://github.com/xgrommx/awesome-redux)
redux-thunk redux-promise redux-actions redux-router react-redux-form redux-undo

redux 里面不同模块的数据使用 id 互相引用

#### Reducer

永远不要在 reducer 里做这些操作：

- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转；
- 调用非纯函数，如 Date.now() 或 Math.random()。

简单来说让功能单一只保存数据

要更新 state 里的对象/数组深处的属性一定要记得不能修改原本的 state,父级要 clone 出副本，或者使用<s>React-addons-update</s>，updeep，update 是遗留插件。改用 immutability-helper,或者使用原生支持深度更新的库 Immutable

```js
// React-addons-update
import update from "react-addons-update";

const newData = update(myDate, {
  // 目标
  x: { y: { z: { $set: 7 } } }, // 前缀的键$称为命令
  a: { b: { $push: [9] } },
});
```

- {$push: array} push()array 目标中的所有项目。
- {$unshift: array} unshift()array 目标中的所有项目。
- {$splice: array of arrays}使用项目提供的参数 arrays 调用目标上的每个项目。splice()
- {$set: any}完全替换目标。
- {$merge: object}将 的键 object 与目标合并。
- {$apply: function}<u>将当前值传递给函数并使用新的返回值更新它。</u>

拆分 Reducer  
拆分的同时 subReducer 传入的 state 也是单独取出的  
createStore 的 reducer 参数可以是返回 state 的参数，也可以是返回 subReducer 函数对象的参数  
使用 combineReducers 做拆分

```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: visibilityFilter(state.todos, action),
      });
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action),
      });
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action),
      });
    default:
      return state;
  }
}
function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action),
  };
}
const todoApp = combineReducers({
  visibilityFilter,
  todos,
});
```

#### Store

createStore

```js
store = createStore(reducer);
unsubscribe = store.subscribe(() => console.log(store.getState()));
```

#### 数据流

生命周期

1. 应用调用 store.dispatch(action)通知 store 执行动作
2. redux 调用 rootReducer 分发到 subReducer
3. rootReducer 合并数据得到新的 state 树
4. store 保存新的 state 树 并触发 store.subscribe()

#### 配合 react

容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components）

- 容器组件 处理数据 逻辑 和 更新
- 展示组件 数据渲染和样式

使用 connect 生成容器组件，并有一些性能优化的动作

reatc 可以给组件函数设置 propTypes 属性配置 prop，配合 rpop-type 库
connect 的 mapStateToProps 可以对 state 里的数据做一些处理和转换（可以不是单纯的数据传递），例如获取 state 里的 todolist 和 filter 并实现过滤

使用 Provider 绑定 store

#### 异步 action

## 总结

#### reduxjs 做了啥 有啥接口

#### @reduxjs/toolkit 做了啥 有啥接口

包装了 readux 方法  
包装了接口请求状态管理方法

- configureStore()
- createReducer()
- createAction()
- createSlice()
- createAsyncThunk
- createEntityAdapter
- createSelector utility
  RTK Query
- createApi()
- fetchBaseQuery()
- &lt;ApiProvider /&gt;
- setupListeners()

#### react-redux 做了啥 有啥接口

可以使用&lt;Provider store={store}&gt; 标签

- useSelector 是 store state 订阅器
- useDispatch 是 action 包装器？
