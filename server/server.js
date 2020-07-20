import { utils } from './utils'

const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express()
app.options('*', cors())

app.post('/waitlist/join/:player', function(req, res) {
  return utils.wait(req.params.player)
})

app.post('/waitlist/check/:player', function(req, res) {
  return utils.checkWaitlist(req.params.player)
})

app.post('/game/play/:code/:player/:x/:y', function(req, res) {
  return utils.play(req.params.x, req.params.y, req.params.player, req.params.code)
})

app.delete('/game/delete/:code', function(req, res) {
  utils.deleteGame(req.params.code)
})

app.get('/', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  console.log("hmmm")
  return res.send('Hello world')
})

app.listen(2000, function() {
  console.log("running")
})
