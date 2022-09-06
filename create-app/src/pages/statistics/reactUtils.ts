import { useRef, useEffect } from "react";

export function useLivecycle(hook: {
  componentDidMount?: () => void;
  componentDidUpdate?: () => void;
  componentWillUnmount?: () => void;
}) {
  const { componentDidMount, componentDidUpdate, componentWillUnmount } = hook;

  const start = useRef(0);
  useEffect(() => {
    if (!start.current) {
      componentDidMount && componentDidMount();
    } else {
      componentDidUpdate && componentDidUpdate();
    }
    start.current++;
    return () => {
      componentWillUnmount && componentWillUnmount();
    };
  }, []);
}
