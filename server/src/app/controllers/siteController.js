class SiteController {

    // [GET] /
    index(req, res) {
        return res.send('This is home page')
    }
}

module.exports = new SiteController()