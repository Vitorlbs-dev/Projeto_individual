var express = require("express");
var router = express.Router();
var pontuacoesController = require("../controllers/pontuacoesController");

router.get("/ultimas/:idUsuario", function (req, res) {
    pontuacoesController.buscarUltimasPontuacoes(req, res);
});

router.get("/tempo-real/", function (req, res) {
    pontuacoesController.buscarPontuacoesEmTempoReal(req, res);
});
router.get("/nivel/:idUsuario", function (req, res) {
    pontuacoesController.buscarPontosPorNivel(req, res);
});

router.post("/insert/:idUsuario", function (req, res) {
    pontuacoesController.inserirPontuacoes(req, res);
})

/* router.post("/registrar/:idUsuario", function(req, res) {
    pontuacoesController.registrarPontuacao(req, res);
});*/

module.exports = router;