const bodyParser = require('body-parser')
var express = require('express')
const { route } = require('express/lib/application')
const { getAllProducts, getProductByID, insertProduct, updateProduct, deleteProduct } = require('../db/sqldb')

// Créer le Routeur de la section "/products"
router = express.Router()
router.use(bodyParser.urlencoded({extended: false}))

router.use((req, res, next) => {
    if(req.session.user)
        next()
    else
        return res.redirect('/login')
})

// Afficher Liste de Produits
router.get('/', (req, res) => {
    getAllProducts((err, products) => {
        if (err)
            return res.render('liste.ejs', { products: [], error: err })
        res.render('product/liste.ejs', { products: products })
    })
})

// Afficher Formulaire Ajout de Produit
router.get('/new', (req, res) => {
    res.render('product/add.ejs')
})

// Ajouter un Produit
router.post('/', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    insertProduct(name, price, description, (err) => {
        if (err)
            return res.render("500.ejs", { message: err })
        res.redirect('/product')
    })
})

// Afficher Détails Produit
router.get('/:id', (req, res) => {
    const id = req.params.id
    getProductByID(id, (err, products) => {
        if (products.length === 0)
            return res.render('404.ejs', { message: "Product Not Found" })
        res.render('product/detail.ejs', { product: products[0] })
    })
})

// Supprimer un Produit
router.get('/:id/delete', (req, res) => {
    const id = req.params.id
    deleteProduct(id, (err) => {
        res.redirect('/product')
    })
})

// Affichage de Formulaire Edition de Produit
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    getProductByID(id, (err, products) => {
        if (products.length === 0)
            return res.render('404.ejs', { message: "Product Not Found" })
        res.render('product/edit.ejs', { product: products[0] })
    })
})
// Mettre à Jour le Produit
router.post('/:id/edit', (req, res) => {
    const id = req.params.id
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    updateProduct(id, name, price, description, (err) => {
        if (err)
            return res.render("500.ejs", { message: err })
        return res.redirect('/product')
    })
})

module.exports = router