"use client"

import { useState } from "react"

export default function EditForm({ retrievedCharacter }) {
  const [character, setCharacter] = useState(retrievedCharacter)

  const handleSubmit = async () => {
    const isCharacterEdited = await fetch(
      "http://localhost:3000/api/protagonists",
      {
        method: "PUT",
        body: JSON.stringify(character),
      }
    )
    console.log(isCharacterEdited.json())
  }

  const handleChange = (e) => {
    const value = e.target.value
    const key = e.target.name
    setCharacter((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          value={character.name}
          name="name"
          id="name"
          type="text"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          value={character.image}
          name="image"
          id="image"
          type="text"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="house">House</label>
        <input
          value={character.house}
          name="house"
          id="house"
          type="text"
          onChange={handleChange}
        />
      </div>
      <button type="submit"> Modifier </button>
    </form>
  )
}
