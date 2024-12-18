import React from 'react'

function Container({children, className}) {
  return (
    <div className= {`${className} sm:max-w-screen-2xl mx-auto`}  >{children}</div>
  )
}

export default Container