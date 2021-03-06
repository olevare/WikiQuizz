"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var PartieComponent = (function () {
    //constructeur qui initialise les variables de communication avec le serveur
    function PartieComponent(http) {
        //variable qui enregistre le type de questionnaire voulue par l'utilisateur
        this.marcheTest = false;
        this.pecheTest = false;
        //variable qui enregistre le nombre de question du questionnaire
        this.nombreTest = 0;
        /*variable qui va contenir une chaine de caractère contenant les
        information du questionnaire voulu au serveur*/
        this.cat = "";
        /*variable qui enregistre le numéro de la question courante et qui permet
        de chargé la question suivante*/
        this.numero = -1;
        //permet de savoir si l'on a fini le questionnaire ou non
        this.fin = false;
        this.i = 0;
        this.http = http;
        this.reponse = [];
    }
    /*fonction qui crée la chaine de caractère à envoyer au serveur sur le
    type de questionnaire voulu par l'utilisateur*/
    PartieComponent.prototype.resultat = function (nombre) {
        this.nombreTest = nombre;
        console.log(nombre);
        console.log(this.marcheTest);
        console.log(this.pecheTest);
        if (this.marcheTest) {
            this.cat = "marche";
            if (this.pecheTest) {
                this.cat += ";";
                this.cat += "peche";
            }
        }
        else {
            if (this.pecheTest) {
                this.cat = "peche";
            }
        }
        console.log(this.cat);
        //appel la fonction qui va envoyer la chaine au serveur
        this.clickedQuestionnaire();
    };
    //fonction qui va envoyer au serveur le questionnaire que l'on souhaite
    PartieComponent.prototype.clickedQuestionnaire = function () {
        var _this = this;
        console.log('exportation de données');
        this.http.get('http://192.168.1.76:4000/requestQuestions?nb=' + this.nombreTest + '&cat=' + this.cat)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return _this.resultatQuestionnaire(res); }, function (err) { return console.error(err); }, function () { return console.log('done'); });
    };
    //fonction qui recois du serveur le questionnaire attendu et l'enregistre dans une variable
    PartieComponent.prototype.resultatQuestionnaire = function (res) {
        console.log(res);
        this.reponse = res;
        this.numero = 0;
    };
    /*fonction qui envoie le questionnaire fini au serveur pour le calcul du resultat et qui
    renvoie le resultat*/
    PartieComponent.prototype.calcule = function () {
        var _this = this;
        console.log('exportation de données');
        this.http.post('http://192.168.1.76:4000/calculerScore', this.reponse, this.getPutHeaders())
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return _this.resultatQuestionnaire(res); }, function (err) { return console.error(err); }, function () { return console.log('done'); });
    };
    PartieComponent.prototype.getPutHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return new http_1.RequestOptions({ headers: headers, withCredentials: false });
    };
    //fonction qui charge la question suivante du questionnaireà partir de l'objet JSON
    PartieComponent.prototype.clickedSuivant = function () {
        this.numero++;
        if (this.nombreTest <= this.numero) {
            this.fin = true;
            this.numero = 0;
            for (this.numero; this.numero < this.nombreTest; this.numero++) {
                for (this.i; this.i < this.reponse[this.numero].syntagmes.length; this.i++) {
                    if (this.reponse[this.numero].syntagmes[this.i].reponse == null)
                        this.reponse[this.numero].syntagmes[this.i].reponse = "";
                }
                this.i = 0;
            }
            this.calcule();
        }
    };
    return PartieComponent;
}());
PartieComponent = __decorate([
    core_1.Component({
        selector: 'partie',
        templateUrl: './partie.html',
    }),
    __metadata("design:paramtypes", [http_1.Http])
], PartieComponent);
exports.PartieComponent = PartieComponent;
//# sourceMappingURL=partie.component.js.map