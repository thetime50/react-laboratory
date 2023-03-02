// https://www.redux.org.cn/docs/advanced/ExampleRedditAPI.html

import React, { Component, FC } from "react";
import PropTypes, { InferProps } from "prop-types";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { connect, Provider } from "react-redux";
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
} from "actionReduxStore/actions";
import { StoreState } from "actionReduxStore/type";
import Picker from "./components/Picker";
import Posts from "./components/Posts";

import { store as reduxActionStore } from "actionReduxStore";

interface AsyncAppProp {
  selectedSubreddit: string;
  posts: any[];
  isFetching: boolean;
  lastUpdated: number;
  dispatch: ThunkDispatch<any, any, AnyAction>;
}

class AsyncApp extends Component<AsyncAppProp> {
  // static contextType = {
  // static propTypes = {
  //   selectedSubreddit: PropTypes.string.isRequired,
  //   posts: PropTypes.array.isRequired,
  //   isFetching: PropTypes.bool.isRequired,
  //   lastUpdated: PropTypes.number,
  //   dispatch: PropTypes.func.isRequired,
  // };
  constructor(props: AsyncAppProp) {
    super(props);
    console.log("props :>> ", props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentWillReceiveProps(nextProps: AsyncAppProp) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange(nextSubreddit: string) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
  }

  handleRefreshClick(e: any) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={["reactjs", "frontend"]}
        />
        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
            </span>
          )}
          {!isFetching && (
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>
          )}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        )}
      </div>
    );
  }
}
// console.log("AsyncApp.propTypes", AsyncApp.propTypes);
// InferProps<typeof AsyncApp.propTypes>
// AsyncApp.propTypes = {
//   selectedSubreddit: PropTypes.string.isRequired,
//   posts: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired,
// };

function mapStateToProps(state: StoreState) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts,
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  };
}

const AsyncAppConnect = connect(mapStateToProps)(AsyncApp); // connect 没有mapDispatchToProps参数时 会强制往props里面注入一个dispatch方法
export const AsyncAppContainer: FC = function (props = {}) {
  return (
    <Provider store={reduxActionStore}>
      <AsyncAppConnect />
    </Provider>
  );
};

export default AsyncAppContainer;
