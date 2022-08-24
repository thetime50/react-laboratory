import {
  Link,
  useParams,
  NavLink,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import classnames from "classnames";
import "./index.scoped.scss";

const classCallback = (parameters: any) => {
  //   console.log("params", parameters); // 好像就一个isActive
  return classnames({
    active: parameters.isActive,
  });
};
const styleCallback = (parameters: any) => {
  //   console.log("params", parameters); // 好像就一个isActive
  if (parameters.isActive) {
    return {
      color: "#6f6",
      fontWeight: "bold",
    };
  }
  return {};
};
export default function useParametersPage() {
  const parameters = useParams();
  const [searchParameters, setSearchParameters] = useSearchParams();
  const searchParameter = {} as any;
  // -eslint-disable-next-line unicorn/no-array-for-each
  searchParameters.forEach((value: string, key: string) => {
    searchParameter[key] = value;
  });
  // -eslint-disable-next-line unicorn/prefer-spread
  console.log("searchParameters", searchParameters);
  const location_ = useLocation();
  return (
    <div>
      <h1>useParams</h1>
      <p>
        <Link
          className={classnames({ active: parameters.id === "12" })}
          to="/useParams/12"
        >
          /useParams/12
        </Link>{" "}
        <br />
        <Link
          className={classnames({ active: parameters.id === "34" })}
          to={"/useParams/34" + (location_.search || "")}
        >
          /useParams/34{location_.search || ""}
        </Link>
        <br />
        <NavLink className={classCallback} to="/useParams/56">
          NavLink /useParams/56
        </NavLink>
        <br />
        <NavLink style={styleCallback} to="/useParams/78">
          NavLink /useParams/78
        </NavLink>
        <br />
        <NavLink className={classCallback} to="/useParams/56?a=33">
          NavLink /useParams/56?a=33
        </NavLink>
        <br />
      </p>
      <p>{parameters.id}</p>
      <p>{JSON.stringify(searchParameter, undefined, "  ")}</p>
      <p>{JSON.stringify(location_, undefined, "  ")}</p>
    </div>
  );
}
