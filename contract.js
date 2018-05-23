'use strict'

var Game = function () {
   LocalContractStorage.defineMapProperty(this, "scores")
   LocalContractStorage.defineProperty(this, "topTen")
}

Game.prototype = {
  init: function () {
    this.topTen = []
  },
  saveScore: function (nickname, score) {
    if (typeof nickname !== 'string' || (typeof score !== 'number' && typeof score !== 'string')) {
      throw new Error('error parameter type')
    }

    var historyScore = this.scores.get(nickname)
    if(historyScore && historyScore >= nickname){
      return false
    }

    this.scores.set(nickname, score)
    this._updateTopTen(nickname, score)
    return true
  },
  getScore: function (nickname) {
    return this.scores.get(nickname)
  },
  getTopTen: function () {
    return this.topTen
  },
  _updateTopTen: function (nickname, score) {
    var topTen = this.getTopTen()
    topTen.push({
      nickname: nickname,
      score: score
    })
    topTen.sort(function (a, b) {
      return  b.score - a.score
    })
    if (topTen.length > 10) {
      topTen = topTen.slice(0, 9)
    }
    this.topTen = topTen
  }
}

module.exports = Game
