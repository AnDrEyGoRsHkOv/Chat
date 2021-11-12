import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const age = 12;
const films = [
  { title: 1, year: 2020 },
  { title: 2, year: 2020 },
];

const ComponentWitoutJSX = () => {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      { id: "test" },
      `Hello from ComponentWitoutJSX ${age}`
    )
  );
};

// const reactElement = (
//   <div>
//     <h1>Hello my first component</h1>
//     <h2>Age: {age}</h2>

//     {films.map((film) => (
//       <div>
//         <h3>Title {film.title}</h3>
//         <h3>Year {film.year}</h3>
//       </div>
//     ))}
//   </div>
// );

const FilmsList = () => {
  return (
    <div>
      <h1>FilmsList</h1>

      {films.map((film) => (
        <div>
          <h3>Title {film.title}</h3>
          <h3>Year {film.year}</h3>
        </div>
      ))}
      <hr />
    </div>
  );
};

const FunctionComponent = (props) => {
  console.log("FunctionComponent", props);

  return (
    <div>
      <h1 onClick={() => props.test3("FunctionComponent")}>
        Hello my first FunctionComponent
      </h1>
      <h2>Age: {age}</h2>

      {props.children}

      <FilmsList />
    </div>
  );
};

class ClassComponent extends React.Component {
  render() {
    console.log("ClassComponent", this.props);
    const { test1 } = this.props;

    return (
      <div>
        <h1 onClick={() => this.props.test3("ClassComponent")}>
          Hello my first ClassComponent
        </h1>
        <h2>Age: {age}</h2>

        <FilmsList />
      </div>
    );
  }
}

const App = ({ test1, ...rest }) => {
  return (
    <div>
      <h1>App</h1>
      <ComponentWitoutJSX />

      <ClassComponent {...rest} />

      <FunctionComponent {...rest}>
        <div>
          <h1>FunctionComponent Children</h1>
        </div>
      </FunctionComponent>
    </div>
  );
};

ReactDOM.render(
  <App test1={1} test2={[1, 2, 3]} test3={(data) => console.log(data)} test4 />,
  document.getElementById("root")
);


import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
} from "react";
import ReactDOM from "react-dom";
import "./index.css";

const useCounter = () => {
  const [state, setState] = useState(0);

  return { state, setState };
};

const Children = ({ setUser }) => {
  const { state, setState } = useCounter();

  return (
    <div>
      <h1>Children {state}</h1>
      <button onClick={() => setState(state + 1)}>increment</button>
      <button
        onClick={() =>
          setUser((userState) => ({ ...userState, firstName: "firstName new" }))
        }
      >
        setUser from children
      </button>
    </div>
  );
};

const FunctionComponent = (props) => {
  const { state, setState } = useCounter();
  const [user, setUser] = useState({
    firstName: "firstName",
    lastName: "lastName",
  });

  const cb = useCallback(() => {
    console.log("cb");
  }, []);

  const memo = useMemo(() => {
    // 2s
    console.log("useMemo");
    // map() / sort/ filter
    return 12;
  }, []);

  // map()

  // const cb2 = () => {
  //   console.log("cb");
  // };

  useEffect(() => {
    console.log("useEffect");
    // Запросы +
    // работать с ДОМ -
    // устанавливать таймеры
    // устанавливать подписки +
    // обновлять состояние
    return () => {
      // unmount / update
      console.log("useEffect, unmount");
    };
  }, [state]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    // Запросы -
    // работать с ДОМ +
    // устанавливать таймеры
    // устанавливать подписки -
    // обновлять состояние
    return () => {
      // unmount / update
      console.log("useLayoutEffect, unmount");
    };
  }, [state]);

  return (
    <div>
      <h1>Hello my first FunctionComponent</h1>
      <h2>Count: {state}</h2>
      <h2>memo: {memo}</h2>

      <button onClick={() => setState(state + 1)}>increment</button>
      <button onClick={cb}>cb</button>
      {/* <button
        onClick={() =>
          setUser((userState) => ({ ...userState, firstName: "firstName new" }))
        }
      >
        setUser
      </button> */}
      <button onClick={() => setUser({ ...user, firstName: "firstName new" })}>
        setUser
      </button>

      <h2>
        User: {user.firstName} {user.lastName}
      </h2>

      <Children setUser={setUser} cb={cb} />
    </div>
  );
};

const test = (state) => ({ ...state, animation: { id: "test" } });

const data = { 0: "0", 1: "1", 2: "2" };
const getData = (id) => data[id];

class ClassComponent extends React.Component {
  constructor(props) {
    console.log("constructor");
    super(props);
  }

  intervalId = null;
  state = {
    firstName: "Test",
    lastName: "last name",
    count: 0,
    animation: {},
    names: ["test1", "test2"],
  };

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps", state);

    return test(state, props);
  }

  increment = () => {
    // this.setState({
    //   count: this.state.count + 10, // 0 + 10
    // });

    this.setState((state) => ({
      count: state.count + 1,
    }));
  };

  click = () => {
    console.log("click");
  };

  componentDidMount() {
    // Запросы
    // работать с ДОМ
    // устанавливать таймеры
    // устанавливать подписки
    // обновлять состояние
    console.log("componentDidMount");

    document.addEventListener("click", this.click);

    // this.intervalId = setInterval(() => {
    //   console.log("set state");
    //   this.increment();
    // }, 500);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");

    if (nextState.count > 10) {
      return true;
      // return false;
    }

    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    return {
      id: "test",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Запросы
    // работать с ДОМ
    // устанавливать таймеры
    // устанавливать подписки
    // обновлять состояние
    console.log("componentDidUpdate");

    // console.log(getData(this.state.count));

    if (prevState.count < 10) {
      // this.increment();
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");

    clearInterval(this.intervalId);
    document.removeEventListener("click", this.click);
  }

  render() {
    const { firstName, lastName, count } = this.state;

    // const names = this.state.names.map((name) => name.toUpperCase());

    console.log("render", this.state);

    return (
      <div>
        <h1>Hello my first ClassComponent</h1>
        <h2>
          Name: {firstName} {lastName}
        </h2>
        <h2>Count: {count}</h2>

        <button onClick={this.increment}>increment</button>
      </div>
    );
  }
}

const App = ({ test1 }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {visible && <ClassComponent />}

      <FunctionComponent />

      <button onClick={() => setVisible(!visible)}>setVisible</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// Монтирование
//   constructor()
//   static getDerivedStateFromProps()
//   render()
//   componentDidMount()

// Обновление
//   static getDerivedStateFromProps()
//   shouldComponentUpdate()
//   render()
//   getSnapshotBeforeUpdate()
//   componentDidUpdate()

// Размонтирование (удаление)
//   componentWillUnmount()




// Домашнее задание №2
// 
const App = () => {
  const [messageList, setMessageList] = useState([]);
  const [Value, setValue] = useState("");
  const setMessage = () => {
    setMessageList([...messagelist, { author: "user", message: value }]);
    setValue("");
  };

  useEffect(() => {
    const lastMessage = messagelist[MessageList.length - 1]
    if (MessageList.length && lastMessage.author === "User") {
      setTimeout(() => {
        sendMessageList([
          ...MessageList,
          { author: "Bot", message: "Hello from bot" },
        ]);
      }, 500);

      sendMessageList([...messagelist, { author: "Bot", message: "Hello from Bot" }]);
    }
  }, [messagelist]);



  return (
    <div>
      {messagelist.map((message) => (
        <div>
          <h1>{message.message}</h1>
          <h1>{message.author}</h1>
          <hr />
        </div>
      ))}

      <h1>{Value}</h1>

      <input placeholder="message" value= (value) onCange={(e) => setValue(e.target.Value)}/>
      <button onClick={() => setMessageList([...messagelist, value])}>Send Message</button>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};










import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import ReactDOM from "react-dom";
import { MessageList } from "./components";

const light = createTheme({
  theme: {
    color: "#fff",
  },
});

const dark = createTheme({
  theme: {
    color: "#000",
  },
});

ReactDOM.render(
  <ThemeProvider theme={light}>
    <MessageList />
  </ThemeProvider>,
  document.getElementById("root")
);