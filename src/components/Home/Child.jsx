import React, { memo } from 'react'

function Child(props) {
  console.log(`Hello from Child Component`);
  return (
    <div>
      <p>You Are Reading quote Number {props.count} </p>
      <button onClick={() => { props.updateCount() }}>Get Another quote</button>
    </div>
  )
}
export default memo(Child);