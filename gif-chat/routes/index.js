const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
    console.log("TEST START")
})

module.exports = router;