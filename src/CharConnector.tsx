import React from 'react';
import { CharInfo, Coord } from './store/reducers';

type toggleCharFn = (char: CharInfo, idx: number) => void;

type Props = {
  letters: Array<CharInfo>,
  toggleState: toggleCharFn,
  mouseDown: toggleCharFn,
}
const SIZE = 250; // length and width
const MARGIN = 10; // on all sides
const RADIUS_OF_TEXT_CIRCLE = 25;
const RADIUS = (SIZE - 2 * MARGIN) / 2;
const CENTER = { x: RADIUS + MARGIN, y: RADIUS + MARGIN }
// we want the RADIUS to be the absolute end of stuff
// so we'll sub one side to move our limited radius in a bit
const RADIUS_OF_TEXT_CENTERS = RADIUS - RADIUS_OF_TEXT_CIRCLE;
const INNER_RADIUS_OF_TEXT_CENTERS = RADIUS_OF_TEXT_CENTERS - RADIUS_OF_TEXT_CIRCLE;

export const CharConnector: React.FC<Props> = props => {
  return (
    <svg width={SIZE} height={SIZE} className='char connections'>
      {makeChars(props.letters, props.toggleState, props.mouseDown)}
      {makeLines(props.letters)}
    </svg>
  )
}


const makeChars = (letters: Array<CharInfo>, toggleState: toggleCharFn, mouseDown: toggleCharFn) => {
  const len = letters.length;
  return letters.flatMap((w, idx) => {
    // some handlers for events
    const toggle = () => toggleState(w, idx);
    const down = () => mouseDown(w, idx);
    // now the math
    const angle = getAngleFromIdx(idx, len);
    const coords = getCoordsFromAngle(angle, RADIUS_OF_TEXT_CENTERS);
    const className = 'char ' + (w.isSelected ? 'selected' : '');
    return <g onMouseEnter={toggle} onMouseDown={down} className={className}>
      <circle cx={coords.x} cy={coords.y} r={RADIUS_OF_TEXT_CIRCLE}></circle>,
      <text
        x={coords.x} y={coords.y}
        text-anchor='middle' dominant-baseline='central'
      >
        {w.char}
      </text>,
    </g>
  })
}


const getAngleFromIdx = (idx: number, len: number): number => ((360 / len) | 0) * idx

const getCoordsFromAngle = (angle: number, radius: number): Coord => {
  const xInc = radius * Math.cos(angle * Math.PI / 180),
    yInc = radius * Math.sin(angle * Math.PI / 180);
  return { x: CENTER.x + xInc, y: CENTER.y + yInc };
}

const makeLines = (letters: Array<CharInfo>) => {
  const paired = letters
    .map((c, idx) => ({ ...c, idx })) // save the idx of each one
    .filter(c => c.isSelected) // only care about selecteds
    .sort((a, b) => a.order - b.order) // and let's order them accordingly
    .map(c => c.idx) // so we can make the mappings next
    .map(idx => getAngleFromIdx(idx, letters.length)) // general angles
    // finally get some coords for the correct letter
    .map(theta => getCoordsFromAngle(theta, INNER_RADIUS_OF_TEXT_CENTERS))
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
