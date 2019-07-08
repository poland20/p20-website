import React from 'react';
import styled from '@emotion/styled';
import { DefaultPageProps, api } from './_app';
import Speakers from '../components/organisms/Speakers';
import Sponsors from '../components/organisms/Sponsors';
import { colors } from '../components/variables';
import Banner from '../components/organisms/Banner';
import Agenda from '../components/organisms/Agenda';
import TicketAlert from '../components/organisms/TicketAlert';
import Sponsor from '../types/Sponsor';

export const Background = styled('section')({
  '& > *:nth-of-type(odd)': {
    backgroundColor: `${colors.gray}`
  },
  '& > *:nth-of-type(even)': {
    backgroundColor: `${colors.white}`
  }
});

interface Props {
  previousSponsors: Sponsor[];
}

export default class extends React.Component<DefaultPageProps & Props> {
  static async getInitialProps() {
    const previousSponsors = await api('previousSponsors');
    return { previousSponsors };
  }

  render() {
    const { contentControl, currentEdition, previousSponsors } = this.props;
    return (
      <React.Fragment>
        {contentControl.ticketControl.onSale &&
          <TicketAlert ticketControl={contentControl.ticketControl}/>
        }
        <Banner currentEdition={currentEdition}/>
        <Background>
          {contentControl.showAgenda && currentEdition.agendaDays.length > 0 &&
            <Agenda
              agendaDays={currentEdition.agendaDays}
              year={currentEdition.previousAgendaYear && currentEdition.previousAgendaYear}
            />
          }
          {contentControl.showSpeakers && currentEdition.speakers.length > 0 &&
            <Speakers
              speakerCategories={currentEdition.speakerCategories}
              speakers={currentEdition.speakers}
              year={currentEdition.previousAgendaYear && currentEdition.previousAgendaYear}
            />
          }
          {contentControl.showSponsors && currentEdition.sponsors.length > 0 &&
            <Sponsors
              id="partners"
              sponsorCategories={currentEdition.sponsorCategories}
              sponsors={currentEdition.sponsors}
              title="Partners"
              year={currentEdition.previousSponsorsYear && currentEdition.previousSponsorsYear}
            />
          }
          {contentControl.showPreviousSponsors &&
            <Sponsors
              title="Previous Partners"
              sponsors={previousSponsors}
            />
          }
        </Background>
      </React.Fragment>
    );
  }
}
