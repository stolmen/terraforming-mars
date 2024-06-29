import { IProjectCard } from '../IProjectCard';
import { Tag } from '../../../common/cards/Tag';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';

export class Overgrowth extends Card implements IProjectCard {
  constructor() {

    super({
      type: CardType.AUTOMATED,
      name: CardName.OVERGROWTH,
      tags: [Tag.PLANT],
      cost: 10,
      victoryPoints: -3,

      behavior: {
        production: { plants: 4 },
      },

      metadata: {
        description: 'Increase your plant production 4 steps.',
        cardNumber: '999',  // hmm this doesn't seem to matter...
        renderData: CardRenderer.builder((b) => b.production((pb) => pb.plants(4))),
      },
    });
  }
}
