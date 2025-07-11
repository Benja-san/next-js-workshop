import "dotenv/config"
import mysql from "mysql2/promise"

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env

const schema = `
  CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

    USE \`${MYSQL_DB_NAME}\`;

    CREATE TABLE IF NOT EXISTS protagonists (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    house VARCHAR(255)
    );
`

const migrate = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      multipleStatements: true,
    })

    await connection.query(schema)
    await connection.end()

    console.log("✅ Database schema created successfully")
  } catch (err) {
    console.error("❌ Error during migration:", err)
  }
}

migrate()
