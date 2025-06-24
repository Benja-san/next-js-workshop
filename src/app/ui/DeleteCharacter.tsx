"use client"

export default function DeleteCharacter({
  protagonistId,
}: {
  protagonistId: number
}) {
  async function handleDelete(protagonistId: number) {
    const characterDeleted = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/protagonists?id=${protagonistId}`,
      {
        method: "DELETE",
      }
    )
    console.log(characterDeleted)
  }

  return (
    <button onClick={() => handleDelete(protagonistId)} type="button">
      Supprimer personnage
    </button>
  )
}
