import React from 'react';
import { CharInfo, Coord } from './store/reducers';

type Props = {
  letters: Array<CharInfo>
}
const DIAMETER = 225;
const RADIUS = DIAMETER / 2;
const CENTER = { x: RADIUS, y: RADIUS }
const ADJUSTED_RADIUS = RADIUS - 23;
export const CharConnector: React.FC<Props> = props => {

  return (
    <svg width={DIAMETER} height={DIAMETER} className='char connections'>
      {makeLines(props.letters)}
    </svg>
  )
}



const getAngleFromIdx = (idx: number, len: number): number => ((360 / len) | 0) * idx
const getCoordsFromAngle = (angle: number): Coord => {
  const xInc = ADJUSTED_RADIUS * Math.cos(angle * Math.PI / 180),
    yInc = ADJUSTED_RADIUS * Math.sin(angle * Math.PI / 180);
  return { x: CENTER.x + xInc, y: CENTER.y + yInc };
}

const makeLines = (letters: Array<CharInfo>) => {
  debugger;
  const paired = letters
    .map((c, idx) => ({ ...c, idx })) // save the idx of each one
    .filter(c => c.isSelected) // only care about selecteds
    .sort((a, b) => a.order - b.order) // and let's order them accordingly
    .map(c => c.idx) // so we can make the mappings next
    .map(idx => getAngleFromIdx(idx, letters.length)) // general angles
    .map(getCoordsFromAngle) // finally get some coords for the correct letter
    .reduce((acc: Array<[Coord, Coord]>, cur: Coord, idx: number, arr: Array<Coord>) => {
      // if we're on last el, just return it
      if (idx === arr.length - 1) return acc;
      const pair: [Coord, Coord] = [cur, arr[idx + 1]]
      return [...acc, pair]; // otherwise pair up with next fellow
    }, [])
  if (paired.length < 1) {
    return
  }
  return paired.map((coords, idx) => <line
    key={idx}
    x1={coords[0].x}
    y1={coords[0].y}
    x2={coords[1].x}
    y2={coords[1].y}
    stroke='black'
  ></line>)
}
