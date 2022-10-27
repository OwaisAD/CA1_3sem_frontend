import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import { FaTimes, FaPen } from "react-icons/fa"


const LiftingStateUpDemo = () => {
    const initialValue = [
        {
            id: uuidv4(),
            name: "Peter",
        },
        {
            id: uuidv4(),
            name: "Elon",
        },        {
            id: uuidv4(),
            name: "Bill",
        }
    ]

    const [persons, setPersons] = useState(initialValue)
    const [newPerson, setNewPerson] = useState({id: "", name: ""})
    const [editMode, setEditMode] = useState(false)

    // add person method for the input component
    const addPerson = person => {
        if(person.id === "") { 
            person.id = uuidv4()
            persons.push(person)
        } else { // if id already exists we just want to change it
            let personToEdit = persons.find(p => p.id === person.id)
            personToEdit.name = person.name
            setEditMode(false)
        }
        setPersons([...persons])
        setNewPerson({id:"", name: ""})
    }

    // delete person
    const deletePerson = id => {
        setPersons(persons.filter(person => person.id !== id))
    }


    const editPerson = id => {
        setEditMode(true)
        console.log(id)
        // get person and display his name in the input field
        let personToEdit = persons.find(p => p.id === id)
        setNewPerson(personToEdit)
    }

  return (
    <div style={{backgroundColor: "purple"}}>
        <h2>State Lift Demo</h2>
        <p>Total persons: {persons.length}</p>
        <div style={{display: "flex"}}>
        <AllPersonsComponent persons={persons} deletePerson={deletePerson} editPerson={editPerson}/>
        <InputPersonComponent addPerson={addPerson} nextPerson={newPerson} editMode={editMode}/>
        </div>        
    </div>
  )
}

const InputPersonComponent = (props) => {

    const [person, setPerson] = useState(props.nextPerson)

    const savePerson = (event) => {
        if(person.name === "") {
            return
        }
        props.addPerson(person)
        event.preventDefault()
    }

    useEffect(() => setPerson({...props.nextPerson}), [props.nextPerson])

    const onChange = (event) => {
        const value = event.target.value
        person.name = value
        setPerson({...person})
    }

    return (
        <div style={{width: "300px", backgroundColor: "green"}}>
            <h2>New Person</h2>
            <form>
                <input type="text" placeholder='Person name' value={person.name} onChange={onChange} required/>
                <input type="submit" value="Save" onClick={savePerson}/>
            </form>
            {props.editMode && <p>Currently in edit mode</p>}
        </div>
    )
}

const AllPersonsComponent = ({persons,deletePerson, editPerson}) => {
    return (
        <div style={{width: "300px", backgroundColor: "brown"}}>
            <h2>All Persons</h2>
            <ul>
                {persons.map(person => {
                    return <li key={person.id}>{person.name} (id: {person.id.slice(2,7)}) (<FaPen style={{color:"orange", cursor: "pointer"}} onClick={() => editPerson(person.id)}/> / <FaTimes style={{color:"red", cursor: "pointer"}} onClick={() => deletePerson(person.id)}/>)</li>
                })}
                {!persons.length && <p>Nothing to see here :)</p>}
            </ul>
        </div>
    )

    AllPersonsComponent.propType = {
        persons: PropTypes.array
    }
}


export default LiftingStateUpDemo
