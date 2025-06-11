import CharacterRAndM from "../model/CharacterRAndM"
import CharactersList from "../ui/CharactersList"

export default async function CharactersPage() {
  const pageTitle = "Characters"

  const apiResponse = await fetch(
    "https://rickandmortyapi.com/api/character?page=1"
  )
  const apiResult = await apiResponse.json()
  const characters: CharacterRAndM[] = apiResult.results.map(
    (character: CharacterRAndM) => ({
      id: character.id,
      name: character.name,
      image: character.image,
      status: character.status,
      species: character.species,
    })
  )

  return (
    <section>
      <h1>{pageTitle}</h1>
      <h2>All my favorite Rick and Morty Characters</h2>
      <CharactersList characters={characters} />
    </section>
  )
}
