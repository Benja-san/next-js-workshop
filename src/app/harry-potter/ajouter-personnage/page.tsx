"use client"

export default function AddCharacter() {
  async function onSubmit(formData: FormData) {
    const newCharacter = {
      name: formData.get("name"),
      image: formData.get("image"),
      house: formData.get("house"),
    }
    const newCharacterId = await fetch(
      "http://localhost:3000/api/protagonists",
      {
        method: "POST",
        body: JSON.stringify(newCharacter),
      }
    )
    console.log(newCharacterId)
  }

  return (
    <form action={onSubmit}>
      <h1>Ajouter personnage</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input type="text" id="image" name="image" />
      </div>
      <div>
        <label htmlFor="house">House</label>
        <input type="text" id="house" name="house" />
      </div>
      <button type="submit">ajouter</button>
    </form>
  )
}
