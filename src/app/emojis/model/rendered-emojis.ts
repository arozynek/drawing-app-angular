import {Emoji} from './emoji';

export interface RenderedEmoji {
  id: number;
  character: Emoji['character'];
  group: Emoji['group'];
}

export interface RenderedEmoji extends Array<RenderedEmoji> {
  length: number;
}
