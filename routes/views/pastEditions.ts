import {RequestHandler} from 'express';
import {list, View, Lean, Schema} from 'keystone';
import resolveView from '../helpers/resolveView';
import {Edition, EditionDocument} from '../../models/Edition';
import {Speaker, SpeakerDocument} from '../../models/Speaker';
import {TeamMember, TeamMemberDocument} from '../../models/TeamMember';
import {Document} from 'mongoose';
interface PastEdition extends Lean<Edition> {
  speakers?: Speaker[];
  teamMembers?: TeamMember[];
}

interface SpeakerMap {
  [key: string]: SpeakerDocument[];
}

interface TeamMemberMap {
  [key: string]: TeamMemberDocument[];
}

interface HasEdition extends Document {
  edition: Schema.Relationship[];
}

export const pastEditions: RequestHandler = async (req, res, next) => {
  res.locals.route = 'past-editions';
  // TODO: some eror handling on DB requests
  const view = new View(req , res);
  const currentEditon = res.locals.edition as EditionDocument; // always available as a local
  const editions = (await list<Edition>('Edition').model
    .find({current: false}).lean().exec()) as Array<Lean<PastEdition>>;

  const teamMembersDocs = await list<TeamMember>('TeamMember').model.find()
    .where('edition').ne(currentEditon)
    .exec();

  const speakersDocs = await list<Speaker>('Speaker').model.find()
    .where('edition').ne(currentEditon)
    .exec();

  const speakerMap: SpeakerMap = group(speakersDocs, editions);
  const teamMemberMap: TeamMemberMap = group(teamMembersDocs, editions);
  editions.forEach( (e) => {
    e.speakers = speakerMap[e._id];
    e.teamMembers = teamMemberMap[e._id];
  });
  res.locals.editions = editions;
  view.render(resolveView('pastEditions'));
};

function group<T extends HasEdition>(children: T[], parents: Array<Lean<Edition>>) {
  const map: {[key: string]: T[]} = {};
  for (const parent of parents) {
    map[parent._id] = [];
  }
  for (const child of children) {
    const editions = child.edition;
    for (const edition of editions) {
      if (!(edition.toString() in map)) {
        map[edition.toString()] = [];
      }
      map[edition.toString()].push(child);
    }
  }

  return map;
}
