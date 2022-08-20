# react-router-dom

https://stackoverflow.com/questions/69868956/how-to-redirect-in-react-router-v6#answer-72012176

## 入门

### 安装

```html
<BrowserRouter />
<!-- 最外层 路由模式 路径路由/哈希路由 -->
<Routes />
<!-- 包裹路由页面区域-->
<Route path="/" element="{<App" />} />
<!-- 匹配页面 -->
<Lintk to="/about" />
<!-- 跳转链接 -->
```

parceljs 打包项目上添加 route ...

webpack 打包项目上添加 route ...

原始 html 脚本标签引入...

### 快速开始

#### 路由配置

对于这种路由 react-router 会自动排序匹配优先级，优先匹配更精确的路由

```html
<Route path="teams/:teamId" element="{<Team" />} />
<Route path="teams/new" element="{<NewTeamForm" />} />
```

#### 导航

Link 导航标签 useNavigate 方法

```jsx
import { Link, useNavigate } from "react-router-dom";

function Invoices() {
  let navigate = useNavigate();
  return (
    <div>
      <Link to="/">Home</Link> |{" "}
      <NewInvoiceForm
        onSubmit={async (event) => {
          let newInvoice = await createInvoice(event.target);
          navigate(`/invoices/${newInvoice.id}`);
        }}
      />
    </div>
  );
}
```

#### 读取 URL 路径参数

使用 useParams 方法获取 URL 上的路径参数

```jsx
import { Routes, Route, useParams } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="invoices/:invoiceId" element={<Invoice />} />
    </Routes>
  );
}

function Invoice() {
  let params = useParams();
  return <h1>Invoice {params.invoiceId}</h1>;
}
```

#### 路由嵌套

```jsx
function App() {
  return (
    <Routes>
      <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Invoice />} />
        <Route path="sent" element={<SentInvoices />} />
      </Route>
    </Routes>
  );
}
```

#### 索引路径

可以使用 Route 组件的 index 属性来指定索引页面

```jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Activity />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="activity" element={<Activity />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <GlobalNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

#### 相对链接

Link 组件的 to 属性不以'/'开头的为相对路径

可以根据参数的定义分段 不是以简单的 '/' 字符分段

#### 未找到路径

使用"\*" 捕获所有未匹配的剩余路径

#### 多组路由

一个路由组件或页面里允许出现多个 Routes 组件，但是不建议

#### 后代组件

可以在组件树深处使用 Routers 组件， 但是必须在外层的父组件匹配路径末尾添加\*号通配

### 教程

#### active link

NavLink 提供 style className 回调参数

#### 搜索参数

```js
let [searchParams, setSearchParams] = useSearchParams();
// searchParams:
//   ppend(name: string, value: string): void;
//   get(name: string): string | null;
//   getAll(name: string): string[];
//   has(name: string): boolean;
//   set(name: string, value: string): void;
//   sort(): void;
//   toString(): string;
//   forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void;
```

#### 自定义行为

```js
let location = useLocation();
// { "pathname": "/useParams/34", "search": "", "hash": "", "state": null, "key": "smvkl141" }
```

```js
let [params] = useSearchParams();
params = new URLSearchParams(
  Array.from(params).filter(
    ([key, value]) => key !== "brand" || value !== brand
  )
);
```
