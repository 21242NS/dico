import Model from './Model.js'
import dictionnaire from './television.js'
import express from 'express'

let annonce = "Testez vous"
let id= 0
let motte = ""


let app = express()
app.use(express.urlencoded())

app.get("/dico", async function (req, res) {
    const dico = await dictionnaire.loadMany()
    
    res.render('momo.ejs', { d: dico})
  })
  app.get("/", async function (req, res) {
    const dico = await dictionnaire.loadMany()
    id = parseInt(Math.random()*(dico.length))
    motte = dico[id].mot
    console.log(id)
    console.log(dico.length)
    res.render('dico.ejs', { d: dico, annonce, motte })
  })
app.post('/dico/ajout', async function(req, res){
    const dico = new dictionnaire()
    dico.mot = req.body.mot
    dico.traduction = req.body.traduction
    dico.nombre = 0
    dico.reussi = 0
    dico.pourcentage = 0
    await dico.save()
    res.redirect('/dico')    
})
app.post('/test', async function(req, res){
    const dico = await dictionnaire.load({mot : req.body.mot})
    console.log(dico.traduction)
    //console.log(req.body.traduction)
    if(req.body.trad==dico.traduction){
        annonce = "vous avez réussi"
        dico.nombre += 1
        dico.reussi += 1
        dico.pourcentage = (dico.reussi/dico.nombre)*100
    }
    if(req.body.trad !=dico.traduction){
        annonce = "Mauvaise réponse, la bonne réponse était" + " "+ dico.traduction
        dico.nombre += 1
        dico.pourcentage = (dico.reussi/dico.nombre)*100
    }
    await dico.save() 
    res.redirect('/') 
})
app.get('/dico/delete', async function(req, res){
    await dictionnaire.delete({id : req.query.effacer})
    res.redirect('/dico')

})


app.use(express.static('public'))
app.listen(3000, function(){
})


