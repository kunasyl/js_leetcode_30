import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useMemo } from "react";


const withLifecycleLogging = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      console.log(`Component ${WrappedComponent.name} mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${WrappedComponent.name} will unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component did mount or update');
    return () => {
      console.log('Component will unmount');
    };
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  const memoizedRender = useMemo(() => (
    <div>
      <p>Вы кликнули {count} раз</p>
      <button onClick={increment}>
        Нажми на меня
      </button>
    </div>
  ), [count]);

  return memoizedRender;
}

const LoggedCounter = withLifecycleLogging(Counter);

function App() {
  return (
    <div>
      <LoggedCounter />
    </div>
  );
}

export default App;
