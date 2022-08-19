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
