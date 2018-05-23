"use strict";

var Game = function () {
};

Game.prototype ={
  init: function(){
  },
  saveScore: function(nickname, score){
    if(typeof nickname !== 'string' || typeof score !== 'number'){
        throw new Error('error parameter type')
    }

    var scores = LocalContractStorage.get("scores") || {}
    if(scores[nickname]) {
        throw new Error('the nickname is occupied, please choose another one')        
    }
    
    scores[nickname] = score
    this._updateTopTen(nickname, score)
    LocalContractStorage.set("scores", scores)
    return true
  },
  getScore: function(nickname){
    var scores = LocalContractStorage.get("scores") || {}
    return scores[nickname]
  },
  getTopTen: function(){
      return LocalContractStorage.get("topTen") || []
  },
  _updateTopTen: function(nickname, score) {
    var topTen = this.getTopTen()
    topTen.push({
        nickname: nickname,
        score: score
    })
    topTen.sort(function(a, b){
        return a.scrore - b.score
    })
    if(topTen.length > 10){
        topTen = topTen.slice(0, 9)
    }
    LocalContractStorage.set("topTen", topTen)
  }
};

module.exports = Game;
