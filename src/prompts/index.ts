import {
  academicSearchResponsePrompt,
  academicSearchRetrieverPrompt,
} from './academicSearch';
import {
  chatWithDBQueryGenerationPrompt,
  chatWithDBAnswerPrompt,
} from './chatWithDB';
import { webSearchResponsePrompt, webSearchRetrieverPrompt } from './webSearch';
import {
  wolframAlphaSearchResponsePrompt,
  wolframAlphaSearchRetrieverPrompt,
} from './wolframAlpha';
// import { writingAssistantPrompt } from './writingAssistant';
import { chatWithModelPrompt } from './chatWithModel';

import {
  youtubeSearchResponsePrompt,
  youtubeSearchRetrieverPrompt,
} from './youtubeSearch';

export default {
  webSearchResponsePrompt,
  webSearchRetrieverPrompt,
  academicSearchResponsePrompt,
  academicSearchRetrieverPrompt,
  chatWithDBAnswerPrompt,
  chatWithDBQueryGenerationPrompt,
  wolframAlphaSearchResponsePrompt,
  wolframAlphaSearchRetrieverPrompt,
  // writingAssistantPrompt,
  chatWithModelPrompt,
  youtubeSearchResponsePrompt,
  youtubeSearchRetrieverPrompt,
};
// import {
//   academicSearchResponsePrompt,
//   academicSearchRetrieverPrompt,
// } from './academicSearch';

// import { webSearchResponsePrompt, webSearchRetrieverPrompt } from './webSearch';
// import {
//   wolframAlphaSearchResponsePrompt,
//   wolframAlphaSearchRetrieverPrompt,
// } from './wolframAlpha';
// import { writingAssistantPrompt } from './writingAssistant';
// import {
//   youtubeSearchResponsePrompt,
//   youtubeSearchRetrieverPrompt,
// } from './youtubeSearch';
// // Add new prompts for the new focus modes
// import { chatWithModelResponsePrompt, chatWithModelRetrieverPrompt } from './chatWithModel';
// import { chatWithWebResponsePrompt, chatWithWebRetrieverPrompt } from './chatWithWeb';
// import { chatWithDBResponsePrompt, chatWithDBRetrieverPrompt } from './chatWithDB';


// export default {
//   webSearchResponsePrompt,
//   webSearchRetrieverPrompt,
//   academicSearchResponsePrompt,
//   academicSearchRetrieverPrompt,
//   redditSearchResponsePrompt,
//   redditSearchRetrieverPrompt,
//   wolframAlphaSearchResponsePrompt,
//   wolframAlphaSearchRetrieverPrompt,
//   writingAssistantPrompt,
//   youtubeSearchResponsePrompt,
//   youtubeSearchRetrieverPrompt,
//   // New Prompts for new focus modes
//   chatWithModelResponsePrompt,
//   chatWithModelRetrieverPrompt,
//   chatWithWebResponsePrompt,
//   chatWithWebRetrieverPrompt,
//   chatWithDBResponsePrompt,
//   chatWithDBRetrieverPrompt,
// };
