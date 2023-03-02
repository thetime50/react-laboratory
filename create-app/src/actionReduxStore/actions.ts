import { Dispatch, AnyAction } from "redux";
import "babel-polyfill";
import fetch from "cross-fetch";
import { ThunkDispatch } from "redux-thunk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoreState } from "./type";

export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";

export function selectSubreddit(subreddit: string) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}

export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

export function invalidateSubreddit(subreddit: any) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

export const REQUEST_POSTS = "REQUEST_POSTS";

export function requestPosts(subreddit: string) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}

export const RECEIVE_POSTS = "RECEIVE_POSTS";

export function receivePosts(subreddit: any, json: any) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child: any) => child.data),
    receivedAt: Date.now(),
  };
}

export function fetchPosts(subreddit: string) {
  return function (dispatch: ThunkDispatch<{}, undefined, AnyAction>) {
    //: ThunkDispatch<{}, {}, AnyAction>
    dispatch(requestPosts(subreddit));
    // return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
    return fetch(`/srapi/r/${subreddit}.json`)
      .then(
        (response) => response.json(),
        (error) => console.log("An error occurred", error)
      )
      .then((json) => dispatch(receivePosts(subreddit, json)));
  };
}

// export const fetchPosts = createAsyncThunk(
//   RECEIVE_POSTS,
//   (subreddit: String) => {
//     return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
//       .then(
//         (response) => response.json(),
//         (error) => console.log("An error occurred", error)
//       )
//       .then((json) => {
//         return receivePosts(subreddit, json);
//       });
//   }
// );

function shouldFetchPosts(state: StoreState, subreddit: string) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit: string) {
  return (
    dispatch: ThunkDispatch<{}, undefined, AnyAction>,
    getState: () => StoreState
  ) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    } else {
      return Promise.resolve();
    }
  };
}

export function fetchSignal(
  dispatch: ThunkDispatch<{}, undefined, AnyAction>, // 这个dispatch 是dispatch(fetchSignal)里面调用fetchSignal(dispatch) 传入的
  getState: () => StoreState
) {
  console.log("fetchSignal()");
  // const subreddit = "reactjs";
  const subreddit = "vue";
  dispatch(selectSubreddit(subreddit));
  dispatch(requestPosts(subreddit));
  // return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
  return fetch(`/srapi/r/${subreddit}.json`)
    .then(
      (response) => response.json(),
      (error) => console.log("An error occurred", error)
    )
    .then((json) => {
      console.log("fetchSignal()", json);
      return dispatch(receivePosts(subreddit, json));
    });
}
