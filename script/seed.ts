import "dotenv/config"
import mysql from "mysql2/promise"

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env

const harryPotterCharacters = [
  {
    name: "Harry Potter",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Harry_Potter_character_poster.jpg/250px-Harry_Potter_character_poster.jpg",
    house: "Gryffindor",
  },
  {
    name: "Hermione Granger",
    image:
      "https://static.wikia.nocookie.net/characters/images/a/a5/Latest_%2810%29.jpg",
    house: "Gryffindor",
  },
  {
    name: "Ron Weasley",
    image:
      "https://upload.wikimedia.org/wikipedia/en/5/5e/Ron_Weasley_poster.jpg",
    house: "Gryffindor",
  },
  {
    name: "Severus Snipes",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Ootp076.jpg",
    house: "Slytherin",
  },
  {
    name: "Cedric Digory",
    image:
      "https://static.wikia.nocookie.net/harrypotter/images/2/2e/PromoHP4_Cedric3.jpg/revision/latest?cb=20090918145013&path-prefix=fr",
    house: "Hufflepuff",
  },
]

const seed = async () => {
  try {
    const db = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      database: MYSQL_DB_NAME,
    })

    await db.query("DELETE FROM protagonists")

    for (const { name, image, house } of harryPotterCharacters) {
      await db.query(
        "INSERT INTO protagonists (name, image, house) VALUES (?, ?, ?)",
        [name, image, house]
      )
    }

    await db.end()
    console.log("🌱 Database seeded successfully")
  } catch (err) {
    console.error("❌ Error during seeding:", err)
  }
}

seed()
