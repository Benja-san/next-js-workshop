import { db } from "@/lib/db"
import { NextResponse } from "next/server"

interface InsertResult {
  insertId: number
  affectedRows?: number
  warningStatus?: number
}

interface UpdateResult {
  affectedRows: number
  warningStatus?: number
}

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, image, house FROM protagonists ORDER BY id DESC"
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error("Erreur MySQL :", error)
    return NextResponse.json(
      { error: "Error, please try again" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { name, image, house } = await req.json()

    const [result] = (await db.query(
      "INSERT INTO protagonists (name, image, house) VALUES (?, ?, ?)",
      [name.trim(), image.trim(), house.trim()]
    )) as [InsertResult, unknown]

    return NextResponse.json({
      message: "Protagonist has been added to db",
      insertedId: result.insertId,
    })
  } catch (error) {
    console.error("Erreur MySQL (POST) :", error)
    return NextResponse.json(
      { error: "Error, please try again" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url)
    const idParam = url.searchParams.get("id")
    const characterId = idParam !== null ? parseInt(idParam, 10) : NaN

    if (isNaN(characterId)) {
      return NextResponse.json(
        { error: "Impossible de supprimer ce personnage" },
        { status: 400 }
      )
    }

    await db.query("DELETE FROM protagonists WHERE id = ?", [characterId])
    return NextResponse.json({ message: "Avada Kedavra !" })
  } catch (error) {
    console.error("Erreur MySQL (DELETE) :", error)
    return NextResponse.json(
      { error: "Error, please try again" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const updatedCharacter = await req.json()
    const { id, name, image, house } = updatedCharacter
    if (typeof id !== "number" || isNaN(id)) {
      return NextResponse.json(
        { error: "Informations invalides" },
        { status: 400 }
      )
    }

    const [result] = (await db.query(
      "UPDATE protagonists SET name = ?, image = ?, house = ? WHERE id = ?",
      [name.trim(), image.trim(), house.trim(), id]
    )) as [UpdateResult, unknown]

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Personnage non trouvée" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Personnage Modifié !" })
  } catch (error) {
    console.error("Erreur MySQL (PATCH) :", error)
    return NextResponse.json(
      { error: "Une erreur est survenue, veuillez réessayer" },
      { status: 500 }
    )
  }
}
