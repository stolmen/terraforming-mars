import { IProjectCard } from '../IProjectCard';
import { Tag } from '../../../common/cards/Tag';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { IPlayer } from '../../IPlayer';
import { Space } from '../../boards/Space';
import { CardResource } from '../../../common/CardResource';
import { CardName } from '../../../common/cards/CardName';
import { Priority } from '../../deferredActions/Priority';
import { AddResourcesToCard } from '../../deferredActions/AddResourcesToCard';
import { Board } from '../../boards/Board';
import { CardRenderer } from '../render/CardRenderer';
import { Size } from '../../../common/cards/render/Size';
import { all } from '../Options';
export class AlienPets extends Card implements IProjectCard {

  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.ALIEN_PETS,
      tags: [Tag.SPACE, Tag.ANIMAL],
      cost: 100,
      resourceType: CardResource.ANIMAL,
      protectedResources: true,

      victoryPoints: { resourcesHere: {}, each: 2 },

      behavior: {
        addResources: 1,
      },

      metadata: {
        cardNumber: '999',
        renderData: CardRenderer.builder((b) => {
          b.effect('When any ocean OR city tile is placed, add an animal to this card.', (eb) => {
            eb.city({ size: Size.SMALL, all }).or().oceans(1, { size: Size.TINY, all }).startEffect.resource(CardResource.ANIMAL);
          }).br;
          b.resource(CardResource.ANIMAL).br;
          b.text('Animals may not be removed from this card', Size.SMALL, true).br;
          b.vpText('2 VP per animal here.');
        }),
        description: { text: 'Add 1 animal to this card.', align: 'left' },
      },
    });
  }


  public onTilePlaced(cardOwner: IPlayer, activePlayer: IPlayer, space: Space) {
    if (Board.isCitySpace(space) || Board.isOceanSpace(space)) {
      cardOwner.game.defer(
        new AddResourcesToCard(cardOwner, CardResource.ANIMAL, { filter: (c) => c.name === this.name }),
        cardOwner.id !== activePlayer.id ? Priority.OPPONENT_TRIGGER : undefined,
      );
    }
  }
}
