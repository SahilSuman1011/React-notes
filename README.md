# React DetailNotes

## Table of Contents
- [Beginner Level](#beginner-level)
  - [What is React and how does it work?](#what-is-react-and-how-does-it-work)
  - [Differences between functional and class components](#differences-between-functional-and-class-components)
  - [Props and State](#props-and-state)
  - [JSX](#jsx)
  - [Creating a simple React component](#creating-a-simple-react-component)
  - [Virtual DOM](#virtual-dom)
  - [Key prop in React lists](#key-prop-in-react-lists)
  - [Handling events in React](#handling-events-in-react)
  - [Default props](#default-props)
  - [Conditional rendering](#conditional-rendering)
- [Moderate Level](#moderate-level)
  - [React Hooks](#react-hooks)
  - [Controlled vs Uncontrolled Components](#controlled-vs-uncontrolled-components)
  - [React Router](#react-router)
  - [Context API](#context-api)
  - [Prop Drilling](#prop-drilling)
  - [React.memo](#reactmemo)
  - [useMemo vs useCallback](#usememo-vs-usecallback)
  - [Higher-Order Components](#higher-order-components)
  - [Forms in React](#forms-in-react)
  - [Re-renders and Optimization](#re-renders-and-optimization)
  - [Reconciliation](#reconciliation)
  - [React's Diffing Algorithm](#reacts-diffing-algorithm)
  - [React.lazy and Suspense](#reactlazy-and-suspense)
  - [Error Boundaries](#error-boundaries)
  - [Authentication and Protected Routes](#authentication-and-protected-routes)
  - [Render Props](#render-props)
  - [Server-side Rendering vs Client-side Rendering](#server-side-rendering-vs-client-side-rendering)
  - [React Fiber and Concurrent Mode](#react-fiber-and-concurrent-mode)
  - [Testing React Components](#testing-react-components)

## Beginner Level

### What is React and how does it work?

React is a JavaScript library for building user interfaces, particularly single-page applications. Developed and maintained by Facebook (now Meta), it was first released in 2013.

At its core, React works by:

1. **Component-Based Architecture**: React breaks down the UI into reusable, self-contained components that manage their own state.

2. **Declarative Paradigm**: Instead of manipulating the DOM directly (imperative), you declare what the UI should look like based on the current state, and React handles the DOM updates.

3. **Virtual DOM**: React creates a lightweight copy of the actual DOM in memory (Virtual DOM). When state changes, React creates a new Virtual DOM, compares it with the previous one (diffing), and only updates the real DOM where necessary, making it highly efficient.

4. **Unidirectional Data Flow**: Data flows down from parent components to children through props, making the application more predictable and easier to debug.

5. **JSX**: React uses JSX (JavaScript XML) syntax that looks similar to HTML but allows you to write JavaScript expressions within curly braces.

Example of a simple React application:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>This is my first React application.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### Differences between functional and class components

#### Class Components:

- Defined using ES6 classes that extend `React.Component`
- Have a render method that returns JSX
- Can maintain local state using `this.state`
- Have lifecycle methods (componentDidMount, componentDidUpdate, etc.)
- "this" keyword is used to access props, state, and methods

```jsx
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }
  
  incrementCount = () => {
    this.setState({count: this.state.count + 1});
  }
  
  componentDidMount() {
    console.log('Component mounted');
  }
  
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}
```

#### Functional Components:

- Defined as JavaScript functions
- Accept props as arguments
- Originally were stateless, but now can use Hooks for state and lifecycle features
- Generally more concise and easier to read
- No "this" keyword needed
- Preferred in modern React development

```jsx
function Welcome(props) {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  return (
    <div>
      <h1>Hello, {props.name}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Props and State

#### Props (Properties):

- External parameters passed into components
- Read-only and cannot be modified by the component receiving them
- Flow downward from parent to child components
- Used for communication between components
- Changes in props trigger re-rendering

```jsx
// Parent component passing props
function App() {
  return <ChildComponent name="John" age={25} />;
}

// Child component receiving props
function ChildComponent(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}
```

#### State:

- Internal data managed within a component
- Can be modified using setState in class components or setter functions from useState hook
- Changes in state trigger re-rendering
- Private to the component (unless passed as props to children)
- Used for responsive data that changes over time

```jsx
// Using state in a functional component
function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Using state in a class component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }
  
  incrementCount = () => {
    this.setState({count: this.state.count + 1});
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}
```

### JSX

JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML or XML. It allows you to write HTML-like code in your JavaScript files.

#### Characteristics of JSX:

- Combines the UI structure (HTML) with UI logic (JavaScript) in the same place
- Gets transpiled to regular JavaScript by tools like Babel
- Easier to visualize the UI structure compared to creating elements with `React.createElement()`
- Allows embedding JavaScript expressions within curly braces `{}`

#### Why JSX is used:

1. **Readability**: Easier to understand the component structure
2. **Familiarity**: Similar to HTML, making it easier for web developers to adopt
3. **Visual accuracy**: What you see in code closely resembles the output
4. **Syntax checking**: Compile-time errors help catch issues early
5. **Performance optimizations**: JSX compiles to optimized JavaScript

Example of JSX vs React.createElement:

```jsx
// Using JSX
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Equivalent without JSX (what it compiles to)
function Greeting(props) {
  return React.createElement(
    'h1',
    null,
    'Hello, ',
    props.name,
    '!'
  );
}
```

JSX rules:
- Must return a single root element (or use fragments `<>...</>`)
- All tags must be closed (self-closing or with closing tag)
- Attributes use camelCase naming convention (className instead of class)
- JavaScript expressions go inside curly braces `{}`

### Creating a simple React component

You can create React components using either functional or class-based approaches:

#### Functional Component:

```jsx
import React from 'react';

// Simple functional component without props
function Greeting() {
  return <h1>Hello, World!</h1>;
}

// Functional component with props
function PersonGreeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Arrow function component with destructured props
const FriendlyGreeting = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
};

// Usage
function App() {
  return (
    <div>
      <Greeting />
      <PersonGreeting name="John" />
      <FriendlyGreeting name="Sarah" age={28} />
    </div>
  );
}

export default App;
```

#### Class Component:

```jsx
import React from 'react';

// Simple class component
class Greeting extends React.Component {
  render() {
    return <h1>Hello, World!</h1>;
  }
}

// Class component with props
class PersonGreeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

// Class component with state
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  
  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}

// Usage
function App() {
  return (
    <div>
      <Greeting />
      <PersonGreeting name="John" />
      <Counter />
    </div>
  );
}

export default App;
```

### Virtual DOM

The Virtual DOM is a lightweight JavaScript representation of the actual DOM. It's one of React's key features that makes it efficient at updating the UI.

#### How it works:

1. When a component's state changes, React creates a new Virtual DOM tree
2. React compares this new Virtual DOM with the previous snapshot (diffing algorithm)
3. React calculates the minimal number of changes needed to update the real DOM (reconciliation)
4. Only those specific changes are applied to the actual DOM

#### Why it's important:

1. **Performance optimization**: DOM operations are expensive. By minimizing actual DOM manipulations, React significantly improves performance.

2. **Abstraction**: Developers don't need to worry about manually updating the DOM. They can focus on the state and UI representation.

3. **Cross-platform compatibility**: The Virtual DOM is independent of the browser's DOM implementation, making it easier to support various platforms (like React Native).

4. **Batching updates**: React can batch multiple state changes into a single DOM update.

5. **Deterministic UI rendering**: Given the same state and props, React will always generate the same UI, making applications more predictable.

Example of how Virtual DOM helps:

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

If only one user's name changes in the list, React will only update that specific `<li>` element rather than re-rendering the entire list, which would be inefficient.

### Key prop in React lists

The `key` prop is a special attribute that helps React identify which items have changed, been added, or been removed from a list. It's crucial for optimizing rendering performance when working with dynamic lists.

#### Purpose of keys:

1. **Element identification**: Keys help React identify which elements have changed, been added, or removed.

2. **Reconciliation optimization**: Without keys, React would re-render the entire list when any element changes. With keys, it can identify and update only the specific elements that changed.

3. **State preservation**: Keys help React maintain component state when elements are reordered, which is especially important for inputs, forms, and other stateful elements within lists.

4. **Component instance stability**: Ensures the same component instance is used for the same data across renders.

#### Rules for keys:

- Keys must be unique among siblings (not globally)
- Keys should be stable, predictable, and not change between renders
- Typically, use a unique ID from your data
- Index as key is generally discouraged (except for static lists) as it can lead to performance issues and bugs with component state

```jsx
// Good: Using a unique ID as key
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// Bad: Using array index as key (sometimes acceptable for static lists)
function StaticList() {
  const items = ['Apple', 'Banana', 'Cherry'];
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li> // Only OK if list never changes order
      ))}
    </ul>
  );
}
```

Why index as key can be problematic:

```jsx
function TodoList({ todos }) {
  // Imagine todos = [{id: 1, text: 'Learn React'}, {id: 2, text: 'Build app'}]
  
  // If we add a new todo at the beginning:
  // newTodos = [{id: 3, text: 'New task'}, {id: 1, text: 'Learn React'}, {id: 2, text: 'Build app'}]
  
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <input type="checkbox" /> {todo.text}
        </li>
      ))}
    </ul>
  );
  // With index as key, React sees the same keys but different content,
  // causing unnecessary re-renders and potential state issues
}
```

### Handling events in React

Event handling in React is similar to handling events in DOM, but with some syntactic differences:

#### Key differences from traditional DOM events:

1. React events are named using camelCase (onClick vs onclick)
2. Event handlers are passed as functions, not strings
3. You must explicitly call `preventDefault()` to prevent default behavior
4. React uses synthetic events for cross-browser compatibility

#### Basic event handling:

```jsx
function Button() {
  function handleClick(event) {
    console.log('Button clicked');
    console.log('Event:', event); // Synthetic event object
  }
  
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

#### Preventing default behavior:

```jsx
function Form() {
  function handleSubmit(event) {
    event.preventDefault(); // Prevents page refresh
    console.log('Form submitted');
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### Passing arguments to event handlers:

```jsx
function ItemList() {
  function handleDelete(id, event) {
    console.log(`Deleting item ${id}`);
    console.log('Event:', event);
  }
  
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ];
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          {/* Method 1: Arrow function */}
          <button onClick={(e) => handleDelete(item.id, e)}>
            Delete
          </button>
          
          {/* Method 2: bind */}
          <button onClick={handleDelete.bind(null, item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

#### Event handling in class components:

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    
    // Binding in constructor (recommended)
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  
  // Alternative: Use class field syntax with arrow function
  // handleClick = () => {
  //   this.setState(prevState => ({
  //     isToggleOn: !prevState.isToggleOn
  //   }));
  // }
  
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

#### Common events in React:

- onClick, onDoubleClick
- onChange, onInput, onSubmit
- onFocus, onBlur
- onMouseOver, onMouseOut
- onKeyDown, onKeyUp, onKeyPress
- onDrag, onDrop
- onLoad, onError

### Default props

Default props allow you to specify default values for props in case they aren't provided by the parent component. This helps make components more robust and self-contained.

#### Setting default props in functional components:

```jsx
// Method 1: Using defaultProps (older approach)
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

Greeting.defaultProps = {
  name: 'Guest'
};

// Method 2: Using default parameters (modern approach)
function Greeting({ name = 'Guest' }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
function App() {
  return (
    <div>
      <Greeting /> {/* Renders "Hello, Guest!" */}
      <Greeting name="John" /> {/* Renders "Hello, John!" */}
    </div>
  );
}
```

#### Setting default props in class components:

```jsx
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

// Method 1: Using static property
Greeting.defaultProps = {
  name: 'Guest'
};

// Method 2: Using static class property (requires class properties syntax)
class Greeting extends React.Component {
  static defaultProps = {
    name: 'Guest'
  };
  
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

#### Benefits of default props:

1. **Improved component reliability**: Components work even if some props are missing
2. **Better documentation**: Makes it clear what values props will have by default
3. **Reduced conditional logic**: Fewer null/undefined checks needed in component code
4. **Easier testing**: Components can be tested without providing all props

### Conditional rendering

Conditional rendering is the practice of showing different UI elements based on certain conditions. It's a fundamental concept that enables dynamic interfaces in React.

#### Common approaches to conditional rendering:

1. **If statements** (outside the JSX):

```jsx
function UserGreeting({ isLoggedIn, username }) {
  if (isLoggedIn) {
    return <h1>Welcome back, {username}!</h1>;
  }
  return <h1>Please sign in</h1>;
}
```

2. **Ternary operators** (inside JSX):

```jsx
function UserGreeting({ isLoggedIn, username }) {
  return (
    <div>
      <h1>
        {isLoggedIn 
          ? `Welcome back, ${username}!` 
          : 'Please sign in'}
      </h1>
      
      <button>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  );
}
```

3. **Logical AND operator** (for simple "show/hide" conditions):

```jsx
function Notifications({ messages }) {
  return (
    <div>
      <h1>Your Notifications</h1>
      
      {messages.length > 0 && (
        <ul>
          {messages.map(message => (
            <li key={message.id}>{message.text}</li>
          ))}
        </ul>
      )}
      
      {messages.length === 0 && (
        <p>No new notifications</p>
      )}
    </div>
  );
}
```

4. **Switch statements** (for multiple conditions):

```jsx
function PaymentStatus({ status }) {
  let message;
  
  switch (status) {
    case 'processing':
      message = <p className="status-processing">Payment is processing...</p>;
      break;
    case 'success':
      message = <p className="status-success">Payment successful!</p>;
      break;
    case 'failed':
      message = <p className="status-error">Payment failed. Please try again.</p>;
      break;
    default:
      message = <p>No payment information</p>;
  }
  
  return (
    <div className="payment-status">
      <h2>Payment Status</h2>
      {message}
    </div>
  );
}
```

5. **Object mapping** (for elegant handling of multiple conditions):

```jsx
function StatusIcon({ status }) {
  const icons = {
    success: <CheckCircleIcon className="text-green" />,
    warning: <WarningIcon className="text-orange" />,
    error: <XCircleIcon className="text-red" />,
    info: <InfoIcon className="text-blue" />
  };
  
  return icons[status] || icons.info; // Default to info if status not found
}
```

6. **Immediately Invoked Function Expressions** (IIFE - for complex logic):

```jsx
function ComplexComponent({ data, isLoading, error }) {
  return (
    <div>
      <h1>Data Dashboard</h1>
      
      {(() => {
        if (isLoading) {
          return <LoadingSpinner />;
        }
        
        if (error) {
          return <ErrorMessage message={error.message} />;
        }
        
        if (!data || data.length === 0) {
          return <EmptyState />;
        }
        
        return (
          <DataTable 
            data={data} 
            columns={['id', 'name', 'value']}
          />
        );
      })()}
    </div>
  );
}
```

## Moderate Level

### React Hooks

React Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8 (2019) to allow using state and other React features without writing class components.

#### Key benefits of Hooks:

1. Reuse stateful logic between components
2. Split complex components into smaller functions
3. Use React features without classes
4. Avoid the confusing behavior of `this` in JavaScript

#### useState Hook:

The `useState` hook lets you add state to functional components.

```jsx
import React, { useState } from 'react';

function Counter() {
  // useState returns an array with 2 elements:
  // 1. The current state value
  // 2. A function to update that value
  const [count, setCount] = useState(0); // 0 is the initial state
  
  return (
    <div>
      <p>You clicked {count} times</p>
      
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
```

Using multiple state variables:

```jsx
function UserForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, email });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="First name"
      />
      <input
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder="Last name"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Using objects with useState:

```jsx
function UserForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Important: Spread the previous state to avoid losing other fields
    setFormData(prevData => ({
      ...prevData,
      [name]: value // Computed property name
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First name"
      />
      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Using the functional update form:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // Safer way to update state based on previous state
  const increment = () => {
    // This is safer for multiple updates in rapid succession
    setCount(prevCount => prevCount + 1);
  };
  
  // For demonstration, let's increment 3 times in a row
  const incrementThree = () => {
    // Wrong way (would only increment once):
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
    
    // Correct way:
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={incrementThree}>Increment 3 times</button>
    </div>
  );
}
```

#### useEffect Hook:

The `useEffect` hook lets you perform side effects in functional components, serving a similar purpose to lifecycle methods in class components.

Basic useEffect:

```jsx
import React, { useState, useEffect } from 'react';

function DocumentTitleUpdater() {
  const [count, setCount] = useState(0);
  
  // Runs after every render
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    
    // You can return a cleanup function
    return () => {
      document.title = 'React App'; // Reset title when component unmounts
    };
  });
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

With dependency array:

```jsx
function Profile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Reset state when userId changes
    setLoading(true);
    setError(null);
    
    // Fetch user data when component mounts or userId changes
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
    
    // Cleanup function
    return () => {
      // Cancel any pending requests or subscriptions
      // (simplified example - in reality, you'd use AbortController)
    };
  }, [userId]); // Only re-run when userId changes
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

Different dependency array cases:

```jsx
// Runs after every render
useEffect(() => {
  console.log('This runs after every render');
});

// Runs only once after the initial render (similar to componentDidMount)
useEffect(() => {
  console.log('This runs only once after initial render');
}, []);

// Runs when specific dependencies change
useEffect(() => {
  console.log('This runs when count or name changes');
}, [count, name]);
```

Multiple effects for separation of concerns:

```jsx
function UserDashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  
  // Effect for fetching user data
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetchUserById(userId);
      setUser(userData);
    };
    fetchUser();
  }, [userId]);
  
  // Separate effect for fetching posts
  useEffect(() => {
    if (!user) return; // Don't fetch posts until we have user
    
    const fetchPosts = async () => {
      const userPosts = await fetchPostsByUser(user.id);
      setPosts(userPosts);
    };
    fetchPosts();
  }, [user]); // Depends on user, not userId
  
  // Another effect for setting up analytics
  useEffect(() => {
    const tracker = initializeAnalytics();
    tracker.trackPageView('user-dashboard');
    
    return () => {
      tracker.cleanUp();
    };
  }, []); // Run once on mount
  
  // Rest of component...
}
```
# React Documentation

## Table of Contents
- [Beginner Level](#beginner-level)
  - [What is React and how does it work?](#what-is-react-and-how-does-it-work)
  - [Differences between functional and class components](#differences-between-functional-and-class-components)
  - [Props and State](#props-and-state)
  - [JSX](#jsx)
  - [Creating a simple React component](#creating-a-simple-react-component)
  - [Virtual DOM](#virtual-dom)
  - [Key prop in React lists](#key-prop-in-react-lists)
  - [Handling events in React](#handling-events-in-react)
  - [Default props](#default-props)
  - [Conditional rendering](#conditional-rendering)
- [Moderate Level](#moderate-level)
  - [React Hooks](#react-hooks)
  - [Controlled vs Uncontrolled Components](#controlled-vs-uncontrolled-components)
  - [React Router](#react-router)
  - [Context API](#context-api)
  - [Prop Drilling](#prop-drilling)
  - [React.memo](#reactmemo)
  - [useMemo vs useCallback](#usememo-vs-usecallback)
  - [Higher-Order Components](#higher-order-components)
  - [Forms in React](#forms-in-react)
  - [Re-renders and Optimization](#re-renders-and-optimization)
  - [Reconciliation](#reconciliation)
  - [React's Diffing Algorithm](#reacts-diffing-algorithm)
  - [React.lazy and Suspense](#reactlazy-and-suspense)
  - [Error Boundaries](#error-boundaries)
  - [Authentication and Protected Routes](#authentication-and-protected-routes)
  - [Render Props](#render-props)
  - [Server-side Rendering vs Client-side Rendering](#server-side-rendering-vs-client-side-rendering)
  - [React Fiber and Concurrent Mode](#react-fiber-and-concurrent-mode)
  - [Testing React Components](#testing-react-components)

## Beginner Level

### What is React and how does it work?

React is a JavaScript library for building user interfaces, particularly single-page applications. Developed and maintained by Facebook (now Meta), it was first released in 2013.

At its core, React works by:

1. **Component-Based Architecture**: React breaks down the UI into reusable, self-contained components that manage their own state.

2. **Declarative Paradigm**: Instead of manipulating the DOM directly (imperative), you declare what the UI should look like based on the current state, and React handles the DOM updates.

3. **Virtual DOM**: React creates a lightweight copy of the actual DOM in memory (Virtual DOM). When state changes, React creates a new Virtual DOM, compares it with the previous one (diffing), and only updates the real DOM where necessary, making it highly efficient.

4. **Unidirectional Data Flow**: Data flows down from parent components to children through props, making the application more predictable and easier to debug.

5. **JSX**: React uses JSX (JavaScript XML) syntax that looks similar to HTML but allows you to write JavaScript expressions within curly braces.

Example of a simple React application:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>This is my first React application.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### Differences between functional and class components

#### Class Components:

- Defined using ES6 classes that extend `React.Component`
- Have a render method that returns JSX
- Can maintain local state using `this.state`
- Have lifecycle methods (componentDidMount, componentDidUpdate, etc.)
- "this" keyword is used to access props, state, and methods

```jsx
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }
  
  incrementCount = () => {
    this.setState({count: this.state.count + 1});
  }
  
  componentDidMount() {
    console.log('Component mounted');
  }
  
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}
```

#### Functional Components:

- Defined as JavaScript functions
- Accept props as arguments
- Originally were stateless, but now can use Hooks for state and lifecycle features
- Generally more concise and easier to read
- No "this" keyword needed
- Preferred in modern React development

```jsx
function Welcome(props) {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  return (
    <div>
      <h1>Hello, {props.name}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Props and State

#### Props (Properties):

- External parameters passed into components
- Read-only and cannot be modified by the component receiving them
- Flow downward from parent to child components
- Used for communication between components
- Changes in props trigger re-rendering

```jsx
// Parent component passing props
function App() {
  return <ChildComponent name="John" age={25} />;
}

// Child component receiving props
function ChildComponent(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}
```

#### State:

- Internal data managed within a component
- Can be modified using setState in class components or setter functions from useState hook
- Changes in state trigger re-rendering
- Private to the component (unless passed as props to children)
- Used for responsive data that changes over time

```jsx
// Using state in a functional component
function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Using state in a class component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }
  
  incrementCount = () => {
    this.setState({count: this.state.count + 1});
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}
```

### JSX

JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML or XML. It allows you to write HTML-like code in your JavaScript files.

#### Characteristics of JSX:

- Combines the UI structure (HTML) with UI logic (JavaScript) in the same place
- Gets transpiled to regular JavaScript by tools like Babel
- Easier to visualize the UI structure compared to creating elements with `React.createElement()`
- Allows embedding JavaScript expressions within curly braces `{}`

#### Why JSX is used:

1. **Readability**: Easier to understand the component structure
2. **Familiarity**: Similar to HTML, making it easier for web developers to adopt
3. **Visual accuracy**: What you see in code closely resembles the output
4. **Syntax checking**: Compile-time errors help catch issues early
5. **Performance optimizations**: JSX compiles to optimized JavaScript

Example of JSX vs React.createElement:

```jsx
// Using JSX
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Equivalent without JSX (what it compiles to)
function Greeting(props) {
  return React.createElement(
    'h1',
    null,
    'Hello, ',
    props.name,
    '!'
  );
}
```

JSX rules:
- Must return a single root element (or use fragments `<>...</>`)
- All tags must be closed (self-closing or with closing tag)
- Attributes use camelCase naming convention (className instead of class)
- JavaScript expressions go inside curly braces `{}`

### Creating a simple React component

You can create React components using either functional or class-based approaches:

#### Functional Component:

```jsx
import React from 'react';

// Simple functional component without props
function Greeting() {
  return <h1>Hello, World!</h1>;
}

// Functional component with props
function PersonGreeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Arrow function component with destructured props
const FriendlyGreeting = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
};

// Usage
function App() {
  return (
    <div>
      <Greeting />
      <PersonGreeting name="John" />
      <FriendlyGreeting name="Sarah" age={28} />
    </div>
  );
}

export default App;
```

#### Class Component:

```jsx
import React from 'react';

// Simple class component
class Greeting extends React.Component {
  render() {
    return <h1>Hello, World!</h1>;
  }
}

// Class component with props
class PersonGreeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

// Class component with state
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  
  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}

// Usage
function App() {
  return (
    <div>
      <Greeting />
      <PersonGreeting name="John" />
      <Counter />
    </div>
  );
}

export default App;
```

### Virtual DOM

The Virtual DOM is a lightweight JavaScript representation of the actual DOM. It's one of React's key features that makes it efficient at updating the UI.

#### How it works:

1. When a component's state changes, React creates a new Virtual DOM tree
2. React compares this new Virtual DOM with the previous snapshot (diffing algorithm)
3. React calculates the minimal number of changes needed to update the real DOM (reconciliation)
4. Only those specific changes are applied to the actual DOM

#### Why it's important:

1. **Performance optimization**: DOM operations are expensive. By minimizing actual DOM manipulations, React significantly improves performance.

2. **Abstraction**: Developers don't need to worry about manually updating the DOM. They can focus on the state and UI representation.

3. **Cross-platform compatibility**: The Virtual DOM is independent of the browser's DOM implementation, making it easier to support various platforms (like React Native).

4. **Batching updates**: React can batch multiple state changes into a single DOM update.

5. **Deterministic UI rendering**: Given the same state and props, React will always generate the same UI, making applications more predictable.

Example of how Virtual DOM helps:

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

If only one user's name changes in the list, React will only update that specific `<li>` element rather than re-rendering the entire list, which would be inefficient.

### Key prop in React lists

The `key` prop is a special attribute that helps React identify which items have changed, been added, or been removed from a list. It's crucial for optimizing rendering performance when working with dynamic lists.

#### Purpose of keys:

1. **Element identification**: Keys help React identify which elements have changed, been added, or removed.

2. **Reconciliation optimization**: Without keys, React would re-render the entire list when any element changes. With keys, it can identify and update only the specific elements that changed.

3. **State preservation**: Keys help React maintain component state when elements are reordered, which is especially important for inputs, forms, and other stateful elements within lists.

4. **Component instance stability**: Ensures the same component instance is used for the same data across renders.

#### Rules for keys:

- Keys must be unique among siblings (not globally)
- Keys should be stable, predictable, and not change between renders
- Typically, use a unique ID from your data
- Index as key is generally discouraged (except for static lists) as it can lead to performance issues and bugs with component state

```jsx
// Good: Using a unique ID as key
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// Bad: Using array index as key (sometimes acceptable for static lists)
function StaticList() {
  const items = ['Apple', 'Banana', 'Cherry'];
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li> // Only OK if list never changes order
      ))}
    </ul>
  );
}
```

Why index as key can be problematic:

```jsx
function TodoList({ todos }) {
  // Imagine todos = [{id: 1, text: 'Learn React'}, {id: 2, text: 'Build app'}]
  
  // If we add a new todo at the beginning:
  // newTodos = [{id: 3, text: 'New task'}, {id: 1, text: 'Learn React'}, {id: 2, text: 'Build app'}]
  
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <input type="checkbox" /> {todo.text}
        </li>
      ))}
    </ul>
  );
  // With index as key, React sees the same keys but different content,
  // causing unnecessary re-renders and potential state issues
}
```

### Handling events in React

Event handling in React is similar to handling events in DOM, but with some syntactic differences:

#### Key differences from traditional DOM events:

1. React events are named using camelCase (onClick vs onclick)
2. Event handlers are passed as functions, not strings
3. You must explicitly call `preventDefault()` to prevent default behavior
4. React uses synthetic events for cross-browser compatibility

#### Basic event handling:

```jsx
function Button() {
  function handleClick(event) {
    console.log('Button clicked');
    console.log('Event:', event); // Synthetic event object
  }
  
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

#### Preventing default behavior:

```jsx
function Form() {
  function handleSubmit(event) {
    event.preventDefault(); // Prevents page refresh
    console.log('Form submitted');
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### Passing arguments to event handlers:

```jsx
function ItemList() {
  function handleDelete(id, event) {
    console.log(`Deleting item ${id}`);
    console.log('Event:', event);
  }
  
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ];
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          {/* Method 1: Arrow function */}
          <button onClick={(e) => handleDelete(item.id, e)}>
            Delete
          </button>
          
          {/* Method 2: bind */}
          <button onClick={handleDelete.bind(null, item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

#### Event handling in class components:

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    
    // Binding in constructor (recommended)
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  
  // Alternative: Use class field syntax with arrow function
  // handleClick = () => {
  //   this.setState(prevState => ({
  //     isToggleOn: !prevState.isToggleOn
  //   }));
  // }
  
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

#### Common events in React:

- onClick, onDoubleClick
- onChange, onInput, onSubmit
- onFocus, onBlur
- onMouseOver, onMouseOut
- onKeyDown, onKeyUp, onKeyPress
- onDrag, onDrop
- onLoad, onError

### Default props

Default props allow you to specify default values for props in case they aren't provided by the parent component. This helps make components more robust and self-contained.

#### Setting default props in functional components:

```jsx
// Method 1: Using defaultProps (older approach)
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

Greeting.defaultProps = {
  name: 'Guest'
};

// Method 2: Using default parameters (modern approach)
function Greeting({ name = 'Guest' }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
function App() {
  return (
    <div>
      <Greeting /> {/* Renders "Hello, Guest!" */}
      <Greeting name="John" /> {/* Renders "Hello, John!" */}
    </div>
  );
}
```

#### Setting default props in class components:

```jsx
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

// Method 1: Using static property
Greeting.defaultProps = {
  name: 'Guest'
};

// Method 2: Using static class property (requires class properties syntax)
class Greeting extends React.Component {
  static defaultProps = {
    name: 'Guest'
  };
  
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

#### Benefits of default props:

1. **Improved component reliability**: Components work even if some props are missing
2. **Better documentation**: Makes it clear what values props will have by default
3. **Reduced conditional logic**: Fewer null/undefined checks needed in component code
4. **Easier testing**: Components can be tested without providing all props

### Conditional rendering

Conditional rendering is the practice of showing different UI elements based on certain conditions. It's a fundamental concept that enables dynamic interfaces in React.

#### Common approaches to conditional rendering:

1. **If statements** (outside the JSX):

```jsx
function UserGreeting({ isLoggedIn, username }) {
  if (isLoggedIn) {
    return <h1>Welcome back, {username}!</h1>;
  }
  return <h1>Please sign in</h1>;
}
```

2. **Ternary operators** (inside JSX):

```jsx
function UserGreeting({ isLoggedIn, username }) {
  return (
    <div>
      <h1>
        {isLoggedIn 
          ? `Welcome back, ${username}!` 
          : 'Please sign in'}
      </h1>
      
      <button>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  );
}
```

3. **Logical AND operator** (for simple "show/hide" conditions):

```jsx
function Notifications({ messages }) {
  return (
    <div>
      <h1>Your Notifications</h1>
      
      {messages.length > 0 && (
        <ul>
          {messages.map(message => (
            <li key={message.id}>{message.text}</li>
          ))}
        </ul>
      )}
      
      {messages.length === 0 && (
        <p>No new notifications</p>
      )}
    </div>
  );
}
```

4. **Switch statements** (for multiple conditions):

```jsx
function PaymentStatus({ status }) {
  let message;
  
  switch (status) {
    case 'processing':
      message = <p className="status-processing">Payment is processing...</p>;
      break;
    case 'success':
      message = <p className="status-success">Payment successful!</p>;
      break;
    case 'failed':
      message = <p className="status-error">Payment failed. Please try again.</p>;
      break;
    default:
      message = <p>No payment information</p>;
  }
  
  return (
    <div className="payment-status">
      <h2>Payment Status</h2>
      {message}
    </div>
  );
}
```

5. **Object mapping** (for elegant handling of multiple conditions):

```jsx
function StatusIcon({ status }) {
  const icons = {
    success: <CheckCircleIcon className="text-green" />,
    warning: <WarningIcon className="text-orange" />,
    error: <XCircleIcon className="text-red" />,
    info: <InfoIcon className="text-blue" />
  };
  
  return icons[status] || icons.info; // Default to info if status not found
}
```

6. **Immediately Invoked Function Expressions** (IIFE - for complex logic):

```jsx
function ComplexComponent({ data, isLoading, error }) {
  return (
    <div>
      <h1>Data Dashboard</h1>
      
      {(() => {
        if (isLoading) {
          return <LoadingSpinner />;
        }
        
        if (error) {
          return <ErrorMessage message={error.message} />;
        }
        
        if (!data || data.length === 0) {
          return <EmptyState />;
        }
        
        return (
          <DataTable 
            data={data} 
            columns={['id', 'name', 'value']}
          />
        );
      })()}
    </div>
  );
}
```

## Moderate Level

### React Hooks

React Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8 (2019) to allow using state and other React features without writing class components.

#### Key benefits of Hooks:

1. Reuse stateful logic between components
2. Split complex components into smaller functions
3. Use React features without classes
4. Avoid the confusing behavior of `this` in JavaScript

#### useState Hook:

The `useState` hook lets you add state to functional components.

```jsx
import React, { useState } from 'react';

function Counter() {
  // useState returns an array with 2 elements:
  // 1. The current state value
  // 2. A function to update that value
  const [count, setCount] = useState(0); // 0 is the initial state
  
  return (
    <div>
      <p>You clicked {count} times</p>
      
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
```

Using multiple state variables:

```jsx
function UserForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, email });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="First name"
      />
      <input
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder="Last name"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Using objects with useState:

```jsx
function UserForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Important: Spread the previous state to avoid losing other fields
    setFormData(prevData => ({
      ...prevData,
      [name]: value // Computed property name
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First name"
      />
      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Using the functional update form:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // Safer way to update state based on previous state
  const increment = () => {
    // This is safer for multiple updates in rapid succession
    setCount(prevCount => prevCount + 1);
  };
  
  // For demonstration, let's increment 3 times in a row
  const incrementThree = () => {
    // Wrong way (would only increment once):
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
    
    // Correct way:
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={incrementThree}>Increment 3 times</button>
    </div>
  );
}
```

#### useEffect Hook:

The `useEffect` hook lets you perform side effects in functional components, serving a similar purpose to lifecycle methods in class components.

Basic useEffect:

```jsx
import React, { useState, useEffect } from 'react';

function DocumentTitleUpdater() {
  const [count, setCount] = useState(0);
  
  // Runs after every render
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    
    // You can return a cleanup function
    return () => {
      document.title = 'React App'; // Reset title when component unmounts
    };
  });
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

With dependency array:

```jsx
function Profile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Reset state when userId changes
    setLoading(true);
    setError(null);
    
    // Fetch user data when component mounts or userId changes
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
    
    // Cleanup function
    return () => {
      // Cancel any pending requests or subscriptions
      // (simplified example - in reality, you'd use AbortController)
    };
  }, [userId]); // Only re-run when userId changes
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

Different dependency array cases:

```jsx
// Runs after every render
useEffect(() => {
  console.log('This runs after every render');
});

// Runs only once after the initial render (similar to componentDidMount)
useEffect(() => {
  console.log('This runs only once after initial render');
}, []);

// Runs when specific dependencies change
useEffect(() => {
  console.log('This runs when count or name changes');
}, [count, name]);
```

Multiple effects for separation of concerns:

```jsx
function UserDashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  
  // Effect for fetching user data
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetchUserById(userId);
      setUser(userData);
    };
    fetchUser();
  }, [userId]);
  
  // Separate effect for fetching posts
  useEffect(() => {
    if (!user) return; // Don't fetch posts until we have user
    
    const fetchPosts = async () => {
      const userPosts = await fetchPostsByUser(user.id);
      setPosts(userPosts);
    };
    fetchPosts();
  }, [user]); // Depends on user, not userId
  
  // Another effect for setting up analytics
  useEffect(() => {
    const tracker = initializeAnalytics();
    tracker.trackPageView('user-dashboard');
    
    return () => {
      tracker.cleanUp();
    };
  }, []); // Run once on mount
  
  // Rest of component...
}
```

# React Detailed Notes (Continued)

## Moderate Level (Continued)

### Controlled vs Uncontrolled Components

In React, form handling can be implemented using either controlled or uncontrolled components. The main difference lies in how the form data is managed.

#### Controlled Components:

In controlled components, React manages the form data through state. The form elements' values are controlled by React state, and changes are handled through event handlers.

Key characteristics:
- Form data is stored in React state
- Updates happen via setState/useState setter functions
- More control over form validation and submission
- More predictable data flow
- Immediate access to form values for validation

```jsx
import React, { useState } from 'react';

function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form state
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Live validation
    if (name === 'email' && value && !value.includes('@')) {
      setErrors({
        ...errors,
        email: 'Please enter a valid email address'
      });
    } else if (name === 'email') {
      // Clear error if fixed
      const newErrors = {...errors};
      delete newErrors.email;
      setErrors(newErrors);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate before submitting
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form data
    console.log('Submitting:', formData);
    // API call would go here
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### Uncontrolled Components:

In uncontrolled components, form data is managed by the DOM itself. You access form values using refs instead of setting and reading from state.

Key characteristics:
- Form data is handled by the DOM
- Access form values using refs
- Less code for simple forms
- Easier to integrate with non-React code
- Suitable for simple forms without much validation

```jsx
import React, { useRef } from 'react';

function UncontrolledForm() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Access form values directly from DOM using refs
    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      alert('Please fill out all fields');
      return;
    }
    
    console.log('Submitting:', formData);
    // API call would go here
    
    // Optional: Reset form
    e.target.reset();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          ref={usernameRef}
          defaultValue="" // Optional initial value
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          ref={emailRef}
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordRef}
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### When to use which approach:

**Use Controlled Components when:**
- You need immediate validation
- You need to conditionally disable the submit button
- You need to enforce input formats
- You're implementing dynamic inputs
- You need to handle multiple inputs with similar logic

**Use Uncontrolled Components when:**
- Building simple forms without complex validation
- Integrating with third-party DOM libraries
- Working with file inputs
- Performance is a concern (for very large forms)
- Converting a non-React form to React

#### File Inputs - Special Case:

File inputs are typically used as uncontrolled components even in controlled forms because their value is read-only:

```jsx
import React, { useState, useRef } from 'react';

function FileUploadForm() {
  const [fileName, setFileName] = useState('No file chosen');
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('No file chosen');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file) {
      alert('Please select a file');
      return;
    }
    
    // Handle file upload
    console.log('Uploading file:', file);
    // File upload logic would go here
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="file">Choose File:</label>
        <input
          type="file"
          id="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <span>{fileName}</span>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}
```

### React Router

React Router is a standard library for routing in React applications. It enables navigation between different components in a React application, allowing for a single-page application (SPA) experience where the UI updates without full page reloads.

#### Core Concepts:

1. **Client-side Routing**: Unlike traditional server-side routing where each URL request fetches a new HTML page, client-side routing intercepts URL changes and renders different components without reloading the page.

2. **Core Components**:
   - `BrowserRouter`: Uses HTML5 history API
   - `Routes`: Container for route definitions
   - `Route`: Defines a route with path and component
   - `Link`: Creates navigation links
   - `Navigate`: Programmatically redirects users

3. **URL Parameters**: Extract dynamic values from URLs

4. **Nested Routes**: Routes can be nested within each other

#### Basic Setup:

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

// Components
import Home from './components/Home';
import About from './components/About';
import Users from './components/Users';
import UserProfile from './components/UserProfile';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/old-page" element={<Navigate to="/new-page" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

#### URL Parameters:

```jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserProfile() {
  // Extract URL parameters
  const { userId } = useParams();
  const navigate = useNavigate();
  
  // State and effects for fetching user data...
  
  const goBack = () => {
    navigate(-1); // Go back one step in history
  };
  
  const goToSettings = () => {
    navigate(`/users/${userId}/settings`); // Programmatic navigation
  };
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {userId}</p>
      <button onClick={goBack}>Go Back</button>
      <button onClick={goToSettings}>Settings</button>
    </div>
  );
}
```

#### Nested Routes:

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Nested routes */}
          <Route path="users" element={<UserLayout />}>
            <Route index element={<UserList />} />
            <Route path=":userId" element={<UserProfile />} />
            <Route path=":userId/settings" element={<UserSettings />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Layout component with outlet for nested routes
function Layout() {
  return (
    <div>
      <header>
        <nav>{/* Navigation links */}</nav>
      </header>
      
      <main>
        <Outlet /> {/* Nested routes render here */}
      </main>
      
      <footer>
        <p>© 2023 My React App</p>
      </footer>
    </div>
  );
}

// User layout with sub-navigation
function UserLayout() {
  return (
    <div>
      <h1>User Management</h1>
      <Outlet /> {/* Nested user routes render here */}
    </div>
  );
}
```

#### Query Parameters:

```jsx
import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get query parameters
  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);
  
  // Update query parameters
  const handleCategoryChange = (newCategory) => {
    setSearchParams({ category: newCategory, page: '1' });
  };
  
  const nextPage = () => {
    setSearchParams({ category, page: (page + 1).toString() });
  };
  
  return (
    <div>
      <h1>Products</h1>
      
      <div>
        <button onClick={() => handleCategoryChange('all')}>All</button>
        <button onClick={() => handleCategoryChange('electronics')}>Electronics</button>
        <button onClick={() => handleCategoryChange('clothing')}>Clothing</button>
      </div>
      
      <p>Showing {category} products, page {page}</p>
      
      {/* Product list here */}
      
      <button onClick={nextPage}>Next Page</button>
    </div>
  );
}
```

#### Protected Routes:

```jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Custom auth hook

function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  
  // Show loading state while checking auth
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Render the protected content
  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

#### How Client-Side Routing Works:

1. **URL Change Detection**:
   - When a user clicks a `<Link>` or uses `navigate()`
   - Browser's URL changes, but page doesn't reload
   - React Router intercepts using History API

2. **Route Matching**:
   - Router checks the new URL against defined routes
   - Finds the matching `<Route>` elements
   - Renders the corresponding components

3. **Component Mounting/Unmounting**:
   - Previous components unmount
   - New components mount
   - React's reconciliation process updates DOM efficiently

4. **Browser History Management**:
   - Back/forward buttons work as expected
   - HTML5 History API maintains history stack
   - React Router handles browser history

5. **State Preservation**:
   - Component state doesn't persist between routes by default
   - Use state management solutions (Context, Redux) for shared state

### Context API

The Context API is a built-in feature in React that provides a way to share data between components without having to explicitly pass props through every level of the component tree. It's especially useful for global data like themes, user authentication, language preferences, etc.

#### Core Components:

1. **React.createContext**: Creates a Context object with optional default value
2. **Context.Provider**: Component that provides the value to its children
3. **Context.Consumer**: Component that consumes the context value (legacy approach)
4. **useContext Hook**: Hook to consume context in functional components

#### Basic Usage:

```jsx
import React, { createContext, useContext, useState } from 'react';

// 1. Create a context with default value
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// 2. Create a provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Value object contains both state and functions
  const value = { theme, toggleTheme };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook for consuming the context
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 4. App using the context
function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
      <Footer />
    </ThemeProvider>
  );
}

// 5. Components consuming the context
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`header-${theme}`}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}

function MainContent() {
  const { theme } = useTheme();
  
  return (
    <main className={`content-${theme}`}>
      <p>This is the main content with {theme} theme.</p>
    </main>
  );
}
```

#### Multiple Contexts:

```jsx
// Create separate contexts
const ThemeContext = createContext('light');
const UserContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Layout />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

function Profile() {
  // Consume multiple contexts
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  
  if (!user) return <div>Please log in</div>;
  
  return (
    <div className={`profile-${theme}`}>
      <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

#### Complex State with useReducer:

```jsx
import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Actions
const LOGIN_START = 'LOGIN_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext();

// Provider component
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Actions
  const login = async (credentials) => {
    try {
      dispatch({ type: LOGIN_START });
      
      // API call would go here
      const response = await fakeAuthApi.login(credentials);
      
      dispatch({ 
        type: LOGIN_SUCCESS, 
        payload: response.user 
      });
    } catch (error) {
      dispatch({ 
        type: LOGIN_FAILURE, 
        payload: error.message 
      });
    }
  };
  
  const logout = () => {
    // API call for logout if needed
    dispatch({ type: LOGOUT });
  };
  
  const value = {
    ...state,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Example usage
function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };
  
  // Form implementation...
}
```

#### Context API vs Redux:

**When to use Context API:**
- Small to medium-sized applications
- Simple global state requirements
- When prop drilling is the primary issue
- When you want to avoid additional dependencies
- For static or rarely changing values (themes, user preferences)

**When to use Redux:**
- Large applications with complex state
- When you need powerful debugging tools
- When state changes frequently and performance is an issue
- When you need middleware for async operations
- When state logic is complex (complex reducers, action creators)
- When you need to share state across many disconnected components

#### Context Performance Considerations:

Context triggers re-renders for all consuming components when the value changes. For frequently changing data, consider:

1. **Splitting contexts**: Use multiple contexts for different parts of your state
2. **Using memoization**: Memoize the context value with useMemo
3. **Structural optimization**: Pass minimal required data to components

```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  // Memoize value to prevent unnecessary renders
  const themeValue = useMemo(() => ({ 
    theme, 
    setTheme 
  }), [theme]);
  
  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Prop Drilling

Prop drilling (also known as "threading") is the process of passing props through multiple layers of components, from a parent component down to deeply nested child components that need the data. This becomes problematic when intermediate components don't actually use these props but must receive and pass them along.

#### Example of Prop Drilling:

```jsx
function App() {
  const [user, setUser] = useState({ name: 'John', preferences: { theme: 'dark' } });
  
  return (
    <div>
      <Header user={user} />
      <Main user={user} />
      <Footer user={user} />
    </div>
  );
}

function Header({ user }) {
  return (
    <header>
      <UserMenu user={user} />
    </header>
  );
}

function UserMenu({ user }) {
  return (
    <div>
      <span>Hello, {user.name}</span>
      <UserAvatar user={user} />
    </div>
  );
}

function UserAvatar({ user }) {
  return <img src={`/avatars/${user.id}.jpg`} alt={`${user.name}'s avatar`} />;
}

function Main({ user }) {
  return (
    <main>
      <Sidebar user={user} />
      <Content user={user} />
    </main>
  );
}

function Sidebar({ user }) {
  // Doesn't use user but must pass it down
  return (
    <aside>
      <Nav />
      <ThemeToggle theme={user.preferences.theme} />
    </aside>
  );
}

function ThemeToggle({ theme }) {
  // Finally uses the theme
  return <button>Current theme: {theme}</button>;
}
```

In this example, `user` is passed through several components that don't need it, just to reach `ThemeToggle` which only needs the theme property.

#### Problems with Prop Drilling:

1. **Component coupling**: Components become dependent on props they don't use
2. **Maintenance challenges**: Changing props requires updating multiple components
3. **Readability issues**: Props chains make it harder to understand data flow
4. **Performance concerns**: Can cause unnecessary re-renders
5. **Difficulty in testing**: Components depend on props they don't directly use

#### Solutions to Avoid Prop Drilling:

1. **Context API**: The most direct solution for global or semi-global state

```jsx
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'John', preferences: { theme: 'dark' } });
  
  return (
    <UserContext.Provider value={user}>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

function Header() {
  return (
    <header>
      <UserMenu />
    </header>
  );
}

function UserMenu() {
  const user = useContext(UserContext);
  return (
    <div>
      <span>Hello, {user.name}</span>
      <UserAvatar />
    </div>
  );
}

function UserAvatar() {
  const user = useContext(UserContext);
  return <img src={`/avatars/${user.id}.jpg`} alt={`${user.name}'s avatar`} />;
}

function ThemeToggle() {
  const user = useContext(UserContext);
  return <button>Current theme: {user.preferences.theme}</button>;
}
```

2. **Component Composition**: Instead of passing props down, pass components down

```jsx
function App() {
  const [user, setUser] = useState({ name: 'John', preferences: { theme: 'dark' } });
  const themeToggle = <ThemeToggle theme={user.preferences.theme} />;
  
  return (
    <div>
      <Header user={user} />
      <Main sidebarContent={themeToggle} />
      <Footer />
    </div>
  );
}

function Main({ sidebarContent }) {
  return (
    <main>
      <Sidebar content={sidebarContent} />
      <Content />
    </main>
  );
}

function Sidebar({ content }) {
  return (
    <aside>
      <Nav />
      {content}
    </aside>
  );
}

function ThemeToggle({ theme }) {
  return <button>Current theme: {theme}</button>;
}
```

3. **Custom Hooks**: Extract shared logic into hooks

```jsx
// Custom hook to manage theme
function useTheme() {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return { theme, toggleTheme };
}

// Components can use the hook directly
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Current theme: {theme}</button>;
}
```

4. **State Management Libraries**: Redux, MobX, Zustand, Recoil, Jotai, etc.

```jsx
// Using Redux
function ThemeToggle() {
  const theme = useSelector(state => state.user.preferences.theme);
  const dispatch = useDispatch();
  
  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  
  return <button onClick={handleToggle}>Current theme: {theme}</button>;
}
```

5. **Module or Service Patterns**:

```jsx
// userService.js
const userState = {
  current: null,
  listeners: new Set(),
  
  setUser(user) {
    this.current = user;
    this.notify();
  },
  
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  
  notify() {
    this.listeners.forEach(listener => listener(this.current));
  }
};

// Hook to access the service
function useUser() {
  const [user, setUser] = useState(userState.current);
  
  useEffect(() => {
    const unsubscribe = userState.subscribe(setUser);
    return unsubscribe;
  }, []);
  
  return user;
}

// Component using the service
function UserProfile() {
  const user = useUser();
  if (!user) return <div>Not logged in</div>;
  return <div>Hello, {user.name}</div>;
}
```

### React.memo

`React.memo` is a higher-order component (HOC) that memoizes the result of a component render. It prevents unnecessary re-renders by performing a shallow comparison of the component's props. If the props haven't changed, React reuses the last rendered result, skipping the rendering process.

#### Basic Usage:

```jsx
import React, { memo, useState } from 'react';

// Regular component
function ExpensiveComponent({ name, age }) {
  console.log('Rendering ExpensiveComponent');
  
  // Imagine some complex rendering logic here
  
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}

// Memoized version
const MemoizedExpensiveComponent = memo(ExpensiveComponent);

// Parent component
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setName(name === 'John' ? 'Jane' : 'John')}>
        Toggle Name
      </button>
      
      {/* This will re-render only when name or age changes */}
      <MemoizedExpensiveComponent name={name} age={30} />
    </div>
  );
}
```

In this example, `MemoizedExpensiveComponent` will only re-render when its props (`name` or `age`) actually change. When the `count` state changes in the parent, the memoized component won't re-render.

#### Custom Comparison Function:

By default, `React.memo` performs a shallow comparison of props. You can provide a custom comparison function for more complex cases:

```jsx
function areEqual(prevProps, nextProps) {
  // Return true if passing nextProps to render would return
  // the same result as passing prevProps to render,
  // otherwise return false
  
  return (
    prevProps.name === nextProps.name &&
    prevProps.age === nextProps.age &&
    prevProps.address.city === nextProps.address.city
  );
}

const MemoizedComponent = memo(MyComponent, areEqual);
```

#### When to Use React.memo:

1. **Pure Functional Components**: Components that render the same output given the same props
2. **Computationally Expensive Components**: Components with complex rendering logic
3. **Components that Render Often**: Especially lists or frequently updated parts of the UI
4. **Leaf Components**: Components at the bottom of the component tree that receive props but don't have children

#### When Not to Use React.memo:

1. **Simple Components**: When the cost of comparison exceeds the cost of re-rendering
2. **Components that Almost Always Re-render Anyway**: If props change frequently
3. **Components with New Function Props on Each Render**: Unless using `useCallback`


# React Detailed Notes (Continued)

## Advanced Topics

### React.memo and Performance Optimization

`React.memo` is a higher-order component (HOC) that memoizes the rendered output of a component to prevent unnecessary re-renders. It works by performing a shallow comparison of the component's props. If the props haven't changed between renders, React will skip rendering the component and reuse the last rendered result.

#### How React.memo Works:

```jsx
import React, { memo, useState } from 'react';

// Regular component definition
function ExpensiveComponent({ name, count }) {
  console.log(`Rendering ExpensiveComponent - name: ${name}, count: ${count}`);
  
  // Simulate expensive computation
  let total = 0;
  for (let i = 0; i < 1000000; i++) {
    total += i;
  }
  
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Count: {count}</p>
    </div>
  );
}

// Memoized version of the component
const MemoizedExpensiveComponent = memo(ExpensiveComponent);

// Parent component that renders the memoized component
function App() {
  const [name, setName] = useState('John');
  const [count, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);
  
  return (
    <div>
      <button onClick={() => setName(name === 'John' ? 'Jane' : 'John')}>
        Toggle Name
      </button>
      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>
      <button onClick={() => setUnrelatedState(unrelatedState + 1)}>
        Update Unrelated State ({unrelatedState})
      </button>
      
      <h3>Regular Component (re-renders on any state change):</h3>
      <ExpensiveComponent name={name} count={count} />
      
      <h3>Memoized Component (only re-renders when its props change):</h3>
      <MemoizedExpensiveComponent name={name} count={count} />
    </div>
  );
}
```

In this example, when clicking the "Update Unrelated State" button:
- The `App` component re-renders because its state changed
- The regular `ExpensiveComponent` will also re-render
- The `MemoizedExpensiveComponent` will not re-render as its props (`name` and `count`) remain the same

#### Custom Comparison Function:

You can provide a custom comparison function as the second argument to `React.memo` for more complex prop comparisons:

```jsx
function arePropsEqual(prevProps, nextProps) {
  // Return true if rendering would produce the same result
  // Return false if rendering might produce different results
  
  return (
    prevProps.name === nextProps.name &&
    prevProps.user.id === nextProps.user.id && // Deep comparison of nested objects
    prevProps.items.length === nextProps.items.length
  );
}

const MemoizedComponent = memo(MyComponent, arePropsEqual);
```

#### When to Use React.memo:

1. **Pure functional components** that render the same result given the same props
2. **Computationally expensive components** with heavy calculations or complex rendering
3. **Components that render frequently** but rarely with different props
4. **Components deep in the tree** that receive props passed down from many levels up
5. **Components rendered in loops** (like list items) where each instance should only update when its data changes

#### Pitfalls and Considerations:

1. **Object and Function Props**: Since `React.memo` does a shallow comparison, passing new object or function references in each render will defeat the optimization. Use `useCallback` and `useMemo` to stabilize these references.

```jsx
// Problematic - new object created on each render
<MemoizedComponent options={{ sortBy: 'name' }} />

// Improved - memoized object reference
const options = useMemo(() => ({ sortBy: 'name' }), []);
<MemoizedComponent options={options} />

// Problematic - new function created on each render
<MemoizedComponent onClick={() => handleClick(id)} />

// Improved - memoized function reference
const handleItemClick = useCallback(() => handleClick(id), [id]);
<MemoizedComponent onClick={handleItemClick} />
```

2. **Memoization Cost**: For very simple components, the overhead of comparison might exceed the cost of just re-rendering. Apply `React.memo` selectively.

3. **Debugging Difficulty**: Memoization can sometimes make component behavior harder to debug, as it introduces conditional rendering based on internal comparisons.

### useMemo vs useCallback

Both `useMemo` and `useCallback` are hooks used for memoization in React, but they serve different purposes:

#### useMemo:

`useMemo` memoizes a **computed value** and only recomputes it when one of its dependencies changes.

```jsx
import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ numbers }) {
  // Memoize the result of an expensive calculation
  const sum = useMemo(() => {
    console.log('Computing sum...');
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]); // Only recompute when numbers array changes
  
  return <div>Sum: {sum}</div>;
}

function App() {
  const [numbers] = useState([1, 2, 3, 4, 5]);
  const [counter, setCounter] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>
        Clicked {counter} times
      </button>
      <ExpensiveCalculation numbers={numbers} />
    </div>
  );
}
```

In this example, the expensive `sum` calculation is only performed when the `numbers` array changes, not when the unrelated `counter` state updates.

#### useCallback:

`useCallback` memoizes a **function definition** to ensure the function reference remains stable across renders.

```jsx
import React, { useState, useCallback } from 'react';

// Child component that uses React.memo
const Button = memo(({ onClick, children }) => {
  console.log(`Rendering ${children} button`);
  return <button onClick={onClick}>{children}</button>;
});

function App() {
  const [count, setCount] = useState(0);
  const [enabled, setEnabled] = useState(false);
  
  // Without useCallback - new function created on every render
  const handleClickBad = () => {
    setCount(count + 1);
  };
  
  // With useCallback - function reference preserved between renders
  const handleClickGood = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // Empty dependency array - function never recreated
  
  // Function recreated only when dependency changes
  const handleToggle = useCallback(() => {
    setEnabled(prev => !prev);
  }, []);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Enabled: {enabled ? 'Yes' : 'No'}</h2>
      
      {/* This button will re-render on every App render */}
      <Button onClick={handleClickBad}>Bad Button</Button>
      
      {/* This button will only render once */}
      <Button onClick={handleClickGood}>Good Button</Button>
      
      {/* This button will only render once */}
      <Button onClick={handleToggle}>Toggle</Button>
    </div>
  );
}
```

In this example, `handleClickGood` maintains the same function reference across renders thanks to `useCallback`, preventing unnecessary re-renders of the memoized `Button` component.

#### Key Differences:

1. **Purpose**:
   - `useMemo`: Memoizes a computed value
   - `useCallback`: Memoizes a function definition

2. **Return Value**:
   - `useMemo`: Returns the result of calling the provided function
   - `useCallback`: Returns the function itself without calling it

3. **Common Use Cases**:
   - `useMemo`:
     - Expensive calculations
     - Creating derived data
     - Creating objects that should be referentially stable
   - `useCallback`:
     - Event handlers passed to optimized child components
     - Functions passed to dependency arrays of other hooks
     - Functions used as props for memoized components

4. **Syntax Comparison**:
   ```jsx
   // useMemo - memoizes the result of the function
   const value = useMemo(() => computeExpensiveValue(a, b), [a, b]);
   
   // useCallback - memoizes the function itself
   const callback = useCallback(() => doSomething(a, b), [a, b]);
   ```

#### When to Use Each:

**Use useMemo when:**
- You have expensive calculations
- You need to create objects or arrays that should maintain reference equality
- You derive complex data from props or state

**Use useCallback when:**
- You pass functions as props to memoized components
- You include functions in dependency arrays of other hooks (useEffect, useMemo, etc.)
- You need functions that refer to state values but maintain stable references

**Example: Optimizing Both Together**

```jsx
function SearchResults({ query, data }) {
  // Memoize the filtered results using useMemo
  const filteredResults = useMemo(() => {
    console.log('Filtering results for', query);
    return data.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);
  
  // Memoize the click handler function with useCallback
  const handleResultClick = useCallback((id) => {
    console.log('Selected result', id);
    // Handle the selection...
  }, []);
  
  return (
    <ul>
      {filteredResults.map(item => (
        <ResultItem 
          key={item.id}
          item={item}
          onClick={handleResultClick}
        />
      ))}
    </ul>
  );
}

// Memoized child component
const ResultItem = memo(({ item, onClick }) => {
  return (
    <li onClick={() => onClick(item.id)}>
      {item.name}
    </li>
  );
});
```

### Higher-Order Components (HOC)

A Higher-Order Component (HOC) is an advanced technique in React for reusing component logic. It's a function that takes a component and returns a new component with additional props or behavior.

HOCs are a pattern that emerged from React's compositional nature. They don't modify the input component but rather compose it by wrapping it in a container component.

#### Basic HOC Structure:

```jsx
// Basic HOC structure
function withFeature(WrappedComponent) {
  // Return a new component
  return function EnhancedComponent(props) {
    // Additional logic here
    
    // Render the wrapped component with additional props
    return <WrappedComponent {...props} extraProp="value" />;
  };
}

// Usage
const EnhancedComponent = withFeature(MyComponent);
```

#### Real-World HOC Example: withAuthentication

```jsx
import React, { useState, useEffect } from 'react';

function withAuthentication(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      // Check user authentication status
      const checkAuthStatus = async () => {
        try {
          // This would be your auth service API call
          const response = await authService.checkStatus();
          setIsAuthenticated(response.isAuthenticated);
          setUser(response.user);
        } catch (error) {
          console.error('Auth check failed:', error);
          setIsAuthenticated(false);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
      
      checkAuthStatus();
    }, []);
    
    const login = async (credentials) => {
      setLoading(true);
      try {
        const response = await authService.login(credentials);
        setIsAuthenticated(true);
        setUser(response.user);
        return { success: true };
      } catch (error) {
        return { success: false, error };
      } finally {
        setLoading(false);
      }
    };
    
    const logout = async () => {
      setLoading(true);
      try {
        await authService.logout();
        setIsAuthenticated(false);
        setUser(null);
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Pass auth-related props to the wrapped component
    return (
      <WrappedComponent
        {...props}
        isAuthenticated={isAuthenticated}
        user={user}
        loading={loading}
        login={login}
        logout={logout}
      />
    );
  };
}

// Usage
function Dashboard({ user, isAuthenticated, logout }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>
      {/* Dashboard content */}
    </div>
  );
}

const AuthenticatedDashboard = withAuthentication(Dashboard);

// In your app
function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AuthenticatedDashboard />} />
      {/* Other routes */}
    </Routes>
  );
}
```

#### HOC for Data Fetching:

```jsx
function withData(WrappedComponent, fetchData) {
  return function WithData(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const loadData = async () => {
        try {
          setLoading(true);
          const result = await fetchData(props);
          setData(result);
          setError(null);
        } catch (err) {
          setError(err);
          setData(null);
        } finally {
          setLoading(false);
        }
      };
      
      loadData();
    }, [props.id]); // Reload when ID changes
    
    return (
      <WrappedComponent
        {...props}
        data={data}
        loading={loading}
        error={error}
      />
    );
  };
}

// Usage
const fetchUserData = ({ id }) => fetch(`/api/users/${id}`).then(r => r.json());

function UserProfile({ data, loading, error, ...props }) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>Email: {data.email}</p>
    </div>
  );
}

const UserProfileWithData = withData(UserProfile, fetchUserData);

// In app
<UserProfileWithData id="123" />
```

#### Composing Multiple HOCs:

```jsx
// Compose multiple HOCs
const enhance = compose(
  withAuthentication,
  withData(fetchUserData),
  withStyles(styles)
);

const EnhancedComponent = enhance(BaseComponent);

// Or manually:
const EnhancedComponent = withStyles(styles)(
  withData(fetchUserData)(
    withAuthentication(BaseComponent)
  )
);
```

#### HOC Best Practices:

1. **Don't Mutate the Original Component**
   ```jsx
   // Bad
   function withFeature(WrappedComponent) {
     WrappedComponent.prototype.componentDidMount = function() {
       // Do something
     };
     return WrappedComponent;
   }
   
   // Good
   function withFeature(WrappedComponent) {
     return class extends React.Component {
       componentDidMount() {
         // Do something
       }
       render() {
         return <WrappedComponent {...this.props} />;
       }
     };
   }
   ```

2. **Pass Unrelated Props Through**
   ```jsx
   function withFeature(WrappedComponent) {
     return function(props) {
       const extraProps = { feature: true };
       // Pass all props plus extra ones
       return <WrappedComponent {...props} {...extraProps} />;
     };
   }
   ```

3. **Wrap the Display Name for Easy Debugging**
   ```jsx
   function withFeature(WrappedComponent) {
     function WithFeature(props) {
       return <WrappedComponent {...props} feature={true} />;
     }
     
     // Set a display name for better debugging
     WithFeature.displayName = `WithFeature(${getDisplayName(WrappedComponent)})`;
     
     return WithFeature;
   }
   
   // Helper function
   function getDisplayName(Component) {
     return Component.displayName || Component.name || 'Component';
   }
   ```

4. **Don't Use HOCs Inside the Render Method**
   ```jsx
   // Bad - creates a new component on every render
   function Component() {
     const EnhancedComponent = withFeature(MyComponent);
     return <EnhancedComponent />;
   }
   
   // Good - define enhanced component outside render
   const EnhancedComponent = withFeature(MyComponent);
   function Component() {
     return <EnhancedComponent />;
   }
   ```

5. **Handle Ref Forwarding**
   ```jsx
   function withFeature(WrappedComponent) {
     const WithFeature = React.forwardRef((props, ref) => {
       return <WrappedComponent {...props} ref={ref} />;
     });
     
     WithFeature.displayName = `WithFeature(${getDisplayName(WrappedComponent)})`;
     return WithFeature;
   }
   ```

#### HOCs vs. Hooks:

With the introduction of Hooks in React 16.8, many use cases for HOCs can now be solved with custom hooks. However, HOCs still have their place:

**When to Use HOCs:**
- When you need to wrap a component with additional JSX structure
- For class components that can't use hooks
- When you want to separate concerns more clearly (presentation vs. logic)
- When you want to modify props before they reach a component

**When to Use Hooks:**
- For sharing stateful logic between components
- For composing multiple behaviors together more cleanly
- When you want to avoid the nesting issues of multiple HOCs
- For most new React code using functional components

**Example of Converting an HOC to a Hook:**

```jsx
// HOC approach
function withMousePosition(WrappedComponent) {
  return function WithMousePosition(props) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
    
    return <WrappedComponent {...props} mousePosition={mousePosition} />;
  };
}

// Usage with HOC
function MouseDisplay({ mousePosition }) {
  return (
    <div>
      Mouse position: {mousePosition.x}, {mousePosition.y}
    </div>
  );
}

const MouseDisplayWithPosition = withMousePosition(MouseDisplay);

// Hook approach
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return mousePosition;
}

// Usage with hook
function MouseDisplay() {
  const mousePosition = useMousePosition();
  
  return (
    <div>
      Mouse position: {mousePosition.x}, {mousePosition.y}
    </div>
  );
}
```

### React Form Handling and Controlled Inputs

React offers two main approaches to handling form inputs: controlled and uncontrolled components.

#### Controlled Components

In controlled components, form data is handled by React state. The input's value is controlled by React, and changes are handled through event handlers.

```jsx
import React, { useState } from 'react';

function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    preference: 'email',
    subscribe: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', formData);
    // Submit to API, etc.
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <p>Contact preference:</p>
        <label>
          <input
            type="radio"
            name="preference"
            value="email"
            checked={formData.preference === 'email'}
            onChange={handleChange}
          />
          Email
        </label>
        <label>
          <input
            type="radio"
            name="preference"
            value="phone"
            checked={formData.preference === 'phone'}
            onChange={handleChange}
          />
          Phone
        </label>
      </div>
      
      <div>
        <label>
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
          />
          Subscribe to newsletter
        </label>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### Benefits of Controlled Components:

1. **Immediate access to input state**: You can validate, format, or transform data immediately as it changes
2. **Precise control over form values**: You can enforce specific formats or constrain values
3. **Synchronized state**: Form state is always in sync with the UI
4. **Predictable state**: Only one source of truth for form data
5. **Form submission handling**: Easy access to all form values when submitting

#### Advanced Form Handling with Controlled Components:

```jsx
function AdvancedForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validate a single field
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'username':
        if (!value) error = 'Username is required';
        else if (value.length < 3) error = 'Username must be at least 3 characters';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email address is invalid';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 8) error = 'Password must be at least 8 characters';
        else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
          error = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        break;
      case 'confirmPassword':
        if (!value) error = 'Please confirm your password';
        else if (value !== formData.password) error = 'Passwords do not match';
        break;
      default:
        break;
    }
    
    return error;
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate field if user has already attempted to submit
    if (isSubmitting) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };
  
  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate each field
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      try {
        // Simulate API call
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Handle success
          console.log('Registration successful:', data);
          // Reset form or redirect
        } else {
          // Handle server validation errors
          setErrors(prev => ({ ...prev, ...data.errors }));
        }
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors(prev => ({ 
          ...prev, 
          general: 'An error occurred. Please try again.' 
        }));
      }
    }
  };
  
  // Field blur handler for immediate validation feedback
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.general && <div className="error">{errors.general}</div>}
      
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.username ? 'input-error' : ''}
        />
        {errors.username && <div className="error">{errors.username}</div>}
      </div>
      
      {/* Similar pattern for other form fields */}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Register'}
      </button>
    </form>
  );
}
```

#### Using Form Libraries:

For complex forms, many React developers use libraries like Formik, React Hook Form, or Final Form. These provide utilities for validation, error handling, and form state management.

**Example with React Hook Form:**

```jsx
import { useForm } from 'react-hook-form';

function HookFormExample() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    watch
  } = useForm();
  
  const password = watch('password');
  
  const onSubmit = async (data) => {
    console.log('Form data:', data);
    // API submission logic here
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          {...register('username', { 
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters'
            }
          })}
        />
        {errors.username && <div className="error">{errors.username.message}</div>}
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Email address is invalid'
            }
          })}
        />
        {errors.email && <div className="error">{errors.email.message}</div>}
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            },
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
              message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            }
          })}
        />
        {errors.password && <div className="error">{errors.password.message}</div>}
      </div>
      
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match'
          })}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword.message}</div>
        )}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Register'}
      </button>
    </form>
  );
}
```

### React Re-rendering Optimization

React's rendering process can sometimes lead to performance bottlenecks when components re-render unnecessarily. Understanding and optimizing this process is crucial for building performant applications.

#### How React Handles Re-renders:

1. **Initial Render**: React builds a virtual DOM representation of your component hierarchy.

2. **State or Props Change**: When state or props change, React:
   - Triggers a re-render of the component
   - Creates a new virtual DOM tree
   - Compares it with the previous one (diffing)
   - Updates only the necessary parts of the actual DOM

3. **Re-render Propagation**: By default,

