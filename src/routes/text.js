const express = require('express')
const Text = require('./../db/models/text')

const router = express.Router()

router.post('/texts', async (request, response) => {
  let newText = request.body
  try {
    let myText = new Text({
      title: newText.title,
      text: newText.text,
      size: newText.text.split(' ').length
    })
    let savedText = await myText.save()
    return response.send(savedText)
  } catch (error) {
    return response.status(400).send({ error: `An error occurred: ${error}` })
  }
})

router.get('/texts', async (request, response) => {
  let listOfTexts = await Text.find()
  return response.send({ text: listOfTexts })
})

router.get('/texts/:id', async (request, response) => {
  let id = request.params.id
  try {
    let foundText = await Text.findById(id)
    return response.send(foundText)
  } catch (error) {
    return response.status(404).send({ error: `There are no Text with the given id: ${id}` })
  }
})

router.put('/texts/:id', async (request, response) => {
  let id = request.params.id
  let newTextInfo = request.body
  try {
    let foundText = await Text.findById(id)
    foundText.title = newTextInfo.title
    foundText.text = newTextInfo.text
    foundText.size = newTextInfo.text.split(' ').length

    let updatedText = await foundText.save()
    return response.send(updatedText)

  } catch (error) {
    return response.status(404).send({ error: `An error occurred: ${error}` })
  }
})

router.delete('/texts/:id', async (request, response) => {
  let id = request.params.id
  try {
    let deleted = await Text.findByIdAndDelete(id)
    return response.send({ message: `The Text with title: ${deleted.title} and id: ${deleted.id} was successfully deleted!` })
  } catch (error) {
    return response.status(404).send({ error: `There are no Text with the given id: ${id}` })
  }
})

router.get('/texts-random', async (request, response) => {
  try {
    let allTexts = await Text.find()
    let randomText = allTexts[Math.floor(Math.random() * allTexts.length)];
    return response.send(randomText)
  } catch (error) {
    return response.send({ error: `An error occurred: ${error}` })
  }
})

module.exports = router