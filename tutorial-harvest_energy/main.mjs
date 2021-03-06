import { getObjectsByPrototype } from '/game/utils';
import { Creep, Source, StructureSpawn} from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from '/game/constants';
import { } from '/arena';

export function loop() {
  const creep = getObjectsByPrototype(Creep).find(i => i.my);
  const source = getObjectsByPrototype(Source)[0];
  const spawn = getObjectsByPrototype(StructureSpawn).find(i => i.my);

  if(creep.store.getFreeCapacity(RESOURCE_ENERGY)) {
    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  } else {
    if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn);
    }
  }
}
