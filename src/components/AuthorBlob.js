import React from "react"

const AuthorBlob = props => {
  return (
    <div className="flex items-center mb-4">
      <img src={props.image} className="w-12 rounded-full" />
      <div className="ml-4 my-4">
        <p className="text-sm font-roboto text-bensonblack">{props.author}</p>
        <p className="text-xs font-roboto text-bensongrey">
          {props.date} &nbsp; | &nbsp; {props.timeToRead}
        </p>
      </div>
    </div>
  )
}

export default AuthorBlob
