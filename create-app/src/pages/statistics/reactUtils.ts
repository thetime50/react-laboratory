import { useEffect } from "react";

export function useLivecycle(hook: {
  componentDidMount?: () => void;
  componentDidUpdate?: () => void;
  componentWillUnmount?: () => void;
}) {
  const { componentDidMount, componentDidUpdate, componentWillUnmount } = hook;
  let start = 0;
  // if (componentDidMount || componentDidUpdate || componentWillUnmount) {
  useEffect(() => {
    if (!start) {
      componentDidMount && componentDidMount();
    } else {
      componentDidUpdate && componentDidUpdate();
    }
    start++;
    return () => {
      componentWillUnmount && componentWillUnmount();
    };
  }, []);
  // }
}
