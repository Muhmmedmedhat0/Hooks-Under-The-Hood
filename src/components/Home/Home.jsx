import { useState, useEffect, useRef, useCallback } from "react";
import axios from 'axios';
import Child from './Child';

function Home({ name, job }) {
  const [count, setCount] = useState(1);
  const [welcome, setWelocome] = useState(`Hi`);
  const [posts, setPosts] = useState({});
  const [quote, setQuot] = useState(`Or type In your quote`)
  /* 1- useEffect
    -Similar to componentDidMount and componentDidUpdate:
    - it runs after the render 
    - we can use it to fetch data
    - works after the components render and alos on every update
    - to control it's behavior on every update it taks a second param as dependencies => dont get update every time unless the dependencies is changed 
  */
  useEffect(() => {
    // console.log(`hello from useEffect`);
    inputRef.current.focus();
    // Update the document title
    document.title = `You clicked ${count} times`;
    // featch data from fake JSONPlaceholder
    axios.get(`https://jsonplaceholder.typicode.com/posts/${count}`)
      .then(response => setPosts(response.data))
      .catch(error => console.log(error));
  }, [count]);
  /* 2- useContext
   */
  /* 3- useRef
    - we can use it to acsses to our Dom as w used to do in
    vanilla js by document,.querySelctor();
    - dosent reRender every time we make change on the state
   */

  /* 4- useLayoutEffect
    - it is the same as useEffect but 
    - it runs between the render and the visulization of the dom 
    or
      between the render and the screen is updating
    - if we are grapping date the React will wait for useLayoutEffect
    - we can use it to load Spinner while the html appeirance
   */
  /* 5- useMemo
    -it stands for memoization if the input exerytime return as the output we can store it cashing 
      and return from cashing instated using the function however if the 2 values are deferante we will not cashing it
    -we can use this in components and function 
    => basicly it is a HOC takes another components as param and dependencies as a second parm
    => it will make a shalow comparison in the primative dataTypes betwwen the prevProps and the nextProps
    ======> use memo is cahhing the returned value from the function  <=========
  */
  /* 6- useCallback
      => basicly it is a HOC takes another components as param 
        and dependencies as a second parm
    ======> useCallback is cahhing function itSelf  <=========
  */
  const inputRef = useRef();
  return (
    <div>
      <p>{welcome} i'm {name} and iam a {job}</p>
      <p key={posts.id}>&ldquo; {posts.title} .&rdquo;</p>

      <button type="primary" onClick={() => setCount(count + 1)}>
        Get Life quotes
      </button>
      <button onClick={() => setWelocome(`Welcome`)} >
        Welcome me
      </button>
      <br /><br />
      <p>{quote}</p>
      <input type="text" ref={inputRef} onChange={(e) => { setQuot(e.target.value) }} />
      <Child count={count} updateCount={useCallback(() => { setCount(count + 1) }, [count])} />
    </div>
  );
}
export default Home;