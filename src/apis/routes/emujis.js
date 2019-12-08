const express = require('express')
const router = express.Router()

const { emuji } = require('../../models')

// Handle incoming GET requests /emujis
router.get('/', async (req, res) => {
  const data = await emuji.findAll();
  return res.status(200).json({
    message: 'Handling GET requests to /emujs',
    data: data
  })
})

router.get('/:emujiId', async (req, res, next) => {
  const id = req.params.emujiId
  const data = await emuji.findOne({
    where: { emoji: id }
  })
})

router.post('/', (req, res, next) => {
  const emuji = {
    id: req.body.id
  }
  res.status(201).json({
    message: 'Handling POST requests to /emujs',
    createdEmuji: emuji
  })
})

module.exports = router