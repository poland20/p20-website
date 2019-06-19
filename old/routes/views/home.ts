import { RequestHandler } from 'express';
import { Speaker } from '../../models/Speaker';
import getAgenda from '../helpers/getAgenda';
import getSpeakersByCategory from '../helpers/getSpeakersByCategory';
import getSponsorsByCategory from '../helpers/getSponsorsByCategory';
import { getContentControl, getCurrentEdition } from '../middleware';

export const home: RequestHandler = async (req, res) => {
  const contentControl = await getContentControl();
  const currentEdition = await getCurrentEdition();

  let speakerCategories = {};
  let agenda = {};
  let speakers = {};

  // get agenda and speakers
  if (currentEdition != null) {
    const [_speakerCategories, _agenda] = await Promise.all([
      getSpeakersByCategory(currentEdition),
      getAgenda(currentEdition),
    ]);
    speakerCategories = _speakerCategories;
    agenda = _agenda;
    // also need flat speaker list for JSON-LD
    const _speakers: Speaker[] = [];
    for (const c of _speakerCategories) {
      _speakers.push(...c.speakers);
    }
    speakers = _speakers;
  }

  let sponsorCategories = {};
  let previousSponsorCategories = {};

  if (currentEdition != null && contentControl.showSponsors) {
    // current sponsor if there is an edition and allowed to show sponsors
    sponsorCategories = await getSponsorsByCategory(
      { edition: currentEdition });
  }
  if (contentControl.showPreviousSponsors) {
    previousSponsorCategories = await getSponsorsByCategory({ showInPrevious: true });
  }

  // let title: string;
  // if (currentEdition != null) {
  //   title = get('brand');
  // } else if (!currentEdition.caption) {
  //   title = currentEdition.name;
  // } else {
  //   title = `${currentEdition.name} — ${currentEdition.caption}`;
  // }
  // res.locals.title = title;

  // // set opengraph
  // const description = contentControl.opengraphDescription;
  // const ogImage = contentControl.opengraphImage || '/static/images/opengraph.png';
  // const twitterImage = contentControl.twitterImage || '/static/images/twitter-card.png';
  // const opengraph: Opengraph = {
  //   title,
  //   description,
  //   image: ogImage,
  //   url: canonicalUrl,
  // };
  // res.locals.opengraph = opengraph;

  // const twitterCard: TwitterCard = {
  //   title,
  //   description,
  //   image: twitterImage,
  //   imageAlt: get('brand') + ' logo',
  //   site: twitterUsername(contentControl.twitterUrl),

  // };
  // res.locals.twitterCard = twitterCard;

  res.json({
    speakerCategories,
    agenda,
    speakers,
    sponsorCategories,
    previousSponsorCategories
  });
};