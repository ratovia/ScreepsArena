import { getObjectsByPrototype } from '/game/utils';
import { Creep, Flag, StructureSpawn } from '/game/prototypes';
import { MOVE } from '/game/constants';

let creep1, creep2

export function loop() {
  const mySpawn = getObjectsByPrototype(StructureSpawn)[0];
  const flags = getObjectsByPrototype(Flag);
  let creepsLength = getObjectsByPrototype(Creep).length;
  while (creepsLength < 2) {
    mySpawn.spawnCreep([MOVE])
    console.log(`Spawned new creep: ${creep}`);
    creepsLength += 1
  }

  const creeps = getObjectsByPrototype(Creep);
  creeps[0].moveTo(flags[0])
  creeps[1].moveTo(flags[1]);
}
