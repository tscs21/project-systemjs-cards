import Card from "./card.js";
import _ from "underscore";


export default function Deck() {

  Deck.prototype.unShuffled  = function() {
    return _.chain(Card.ranksInImagesOrder)
      .map(function (rank) {
        return Card.suitsInImagesOrder.map(function (suit) {
          return {
            suit: suit,
            rank: rank
          };
        });
      })
      .flatten()
      .map(function (card) {
        return new Card(card);
      })
      .value();
  };

  Deck.prototype.shuffled = function (){
    return _.shuffle(this.unShuffled());
  };
}