import { Fragment } from 'react';
import Achievements from './Achievements';
import Methodologies from './Methodologies';
import PreviousTeams from './PreviousTeams';
import Hero from './Hero';

export default function Index() {
  return (
    <Fragment>
      <Hero />
      <PreviousTeams />
      <Achievements />
      <Methodologies />
    </Fragment>
  );
}
