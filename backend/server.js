
require("dotenv").config()
console.log("API KEY:", process.env.GROK_API_KEY)
const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(cors())
app.use(express.json())

app.post("/generar-plan", async (req, res) => {
  try {
    const { prompt } = req.body

    const response = await axios.post(
      "https://api.x.ai/v1/chat/completions",
      {
        model: "grok-4-latest",
        messages: [
          { role: "system", content: "Eres un nutriólogo experto en planes económicos para México." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    res.json({
    plan: response.data.choices[0].message.content
    })

  } catch (error) {
    console.error(error.response?.data || error.message)
    res.status(500).json({ error: "Error generando plan" })
  }
})

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000")
})