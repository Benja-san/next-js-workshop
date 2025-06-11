"use client"
import { useState } from "react"
import CharacterRAndM from "../model/CharacterRAndM"
import Image from "next/image"

export default function CharactersList({
  characters = [],
}: {
  characters: CharacterRAndM[]
}) {
  const [charactersState, setCharactersState] =
    useState<CharacterRAndM[]>(characters)

  function handleFilter(status: string) {
    setCharactersState(
      !status
        ? characters
        : characters.filter(
            (character) => character.status.toLowerCase() === status
          )
    )
  }

  return (
    <section>
      <h3>My characters list</h3>
      <nav>
        <button onClick={() => handleFilter("alive")}>Alive</button>
        <button onClick={() => handleFilter("dead")}>Dead</button>
        <button onClick={() => handleFilter("unknown")}>Unknown</button>
        <button onClick={() => handleFilter("")}>All</button>
      </nav>
      {charactersState.length > 0 ? (
        <ul>
          {charactersState.map((character) => (
            <li key={character.id}>
              <p>{character.name}</p>
              <Image
                src={character.image}
                width={500}
                height={500}
                alt={`character from Rick & Morty ${character.name}`}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No characters available</p>
      )}
    </section>
  )
}
