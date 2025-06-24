import EditForm from "@/app/ui/EditForm"

interface PageParams {
  params: {
    id: string
  }
}

export default async function EditCharacter({ params }: PageParams) {
  const characterId = params.id
  const characterResult = await fetch(
    `http://localhost:3000/api/protagonists/${characterId}`
  )
  const retrievedCharacter = await characterResult.json()

  return (
    <section>
      <h1>
        Editer {retrievedCharacter.name} {characterId}
      </h1>
      <EditForm retrievedCharacter={retrievedCharacter} />
    </section>
  )
}
