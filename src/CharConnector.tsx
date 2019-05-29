import React from 'react';
import { CharInfo, Coord } from './store/reducers';

type Props = {
  letters: Array<CharInfo>
}
const SIZE = 250; // length and width
const MARGIN = 10; // on all sides
const RADIUS_OF_TEXT_CIRCLE = 25;
const RADIUS = (SIZE - 2 * MARGIN) / 2;
const CENTER = { x: RADIUS + MARGIN, y: RADIUS + MARGIN }
// we want the RADIUS to be the absolute end of stuff
// so we'll sub one side to move our limited radius in a bit
const RADIUS_OF_TEXT_CENTERS = RADIUS - RADIUS_OF_TEXT_CIRCLE;

export const CharConnector: React.FC<Props> = props => {
  return (
    <svg width={SIZE} height={SIZE} className='char connections'>
      {makeChars(props.letters)}
      {makeLines(props.letters)}
    </svg>
  )
}


const makeChars = (letters: Array<CharInfo>) => {
  const len = letters.length;
  return letters.flatMap((w, idx) => {
    const angle = getAngleFromIdx(idx, len);
    const coords = getCoordsFromAngle(angle);
    return [
      <circle cx={coords.x} cy={coords.y} r={RADIUS_OF_TEXT_CIRCLE}></circle>,
      <text
        x={coords.x} y={coords.y}
        text-anchor='middle' dominant-baseline='central'
      >
        {w.char}
      </text>,
    ]
  })
}


const getAngleFromIdx = (idx: number, len: number): number => ((360 / len) | 0) * idx

const getCoordsFromAngle = (angle: number): Coord => {
  const xInc = RADIUS_OF_TEXT_CENTERS * Math.cos(angle * Math.PI / 180),
    yInc = RADIUS_OF_TEXT_CENTERS * Math.sin(angle * Math.PI / 180);
  return { x: CENTER.x + xInc, y: CENTER.y + yInc };
}

const makeLines = (letters: Array<CharInfo>) => {
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
