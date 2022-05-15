import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h1>{props.header}</h1>
      </div>
    )
}

 const Content = (props) => {  //we are putting an object with the following parameters as a props to the given function
   //assigning array of objects to parts through mapping
   const parts = (
     <div>
       {props.parts.map(({name, exercises}) =>
         <p key={name}>
           {name} {exercises}
         </p>
       )}
     </div>
   );
   return (
     <div>
       {parts}
     </div>
   )
 }
 const Total = (props) => {
   //summing up exercises via reduce functrion. parts is a varialbe to wich we assign array of bjects in App component
   const total = props.parts.reduce((accumulator, object) => {
     return accumulator + object.exercises;
   }, 0);
   return (
     <div>
       <h4>Total of {total} exercises</h4>
     </div>
   )
 }


const Course = ({ courses }) => {
    return (
      <>
      {courses.map(course =>
        <div key = {course.id}>{/* mapping by course id */}
            <Header header = {course.name}/>
            <Content name = {course.name} parts = {course.parts} />
            <Total parts = {course.parts} />
        </div>
      )}
      </>
    )

}

export default Course