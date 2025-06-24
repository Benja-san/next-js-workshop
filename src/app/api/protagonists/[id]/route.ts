import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const characterId = params.id
    const [protagonist] = await db.query(
      "SELECT id, name, image, house FROM protagonists WHERE id = ?",
      [characterId]
    )
    return NextResponse.json(protagonist[0])
  } catch (error) {
    console.error("Erreur MySQL :", error)
    return NextResponse.json(
      { error: "Error, please try again" },
      { status: 500 }
    )
  }
}
