import DeleteCharacter from "../ui/DeleteCharacter"

export default async function HarryPotter() {
  const apiResult = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/protagonists`
  )
  const harryPotterCharacters = await apiResult.json()

  return (
    <section>
      <h1>Harry potter library</h1>
      <ul>
        {harryPotterCharacters.map((protagonist) => (
          <li key={protagonist.id}>
            <h2>{protagonist.name}</h2>
            <img src={protagonist.image} alt={protagonist.name} />
            <p>{protagonist.house}</p>
            <DeleteCharacter protagonistId={protagonist.id} />
          </li>
        ))}
      </ul>
    </section>
  )
}
