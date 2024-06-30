import { IProjectCard } from '../IProjectCard';
import { Tag } from '../../../common/cards/Tag';
import { Card } from '../Card';
import { all } from '../Options';
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

export class Stanley extends Card implements IProjectCard {

  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.STANLEY,
      tags: [Tag.EARTH, Tag.MICROBE],
      cost: 10,
      resourceType: CardResource.MICROBE,
      // protectedResources: true,

      victoryPoints: { resourcesHere: {}, per: 3 },

      behavior: {
        addResources: 1,
      },

      metadata: {
        cardNumber: '999',
        renderData: CardRenderer.builder((b) => {
          b.effect('Whenever a greenery or city tile is placed, add one microbe here.', (eb) => {
            eb.greenery({ withO2: false, any: true }).or().city({ size: Size.SMALL, all }).startEffect.resource(CardResource.MICROBE);
          }).br;
          b.resource(CardResource.MICROBE).br;
          b.vpText('1 VP per 3 microbes here.');
        }),
        description: { text: 'Add 1 microbe to this card.', align: 'left' },
      },
    });
  }


  public onTilePlaced(cardOwner: IPlayer, activePlayer: IPlayer, space: Space) {
    if (Board.isGreenerySpace(space) || Board.isCitySpace(space)) {
      cardOwner.game.defer(
        new AddResourcesToCard(cardOwner, CardResource.RESOURCE_CUBE, { filter: (c) => c.name === this.name }),
        cardOwner.id !== activePlayer.id ? Priority.OPPONENT_TRIGGER : undefined,
      );
    }
  }
}
