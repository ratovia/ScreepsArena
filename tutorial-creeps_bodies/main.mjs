import { getObjectsByPrototype } from '/game/utils';
import { Creep } from '/game/prototypes';
import { ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL } from '/game/constants';
import { } from '/arena';

export function loop() {
  const creeps = getObjectsByPrototype(Creep);
  const myCreeps = creeps.filter(creep => creep.my);
  const enemyCreep = creeps.find(creep => !creep.my);

  myCreeps.forEach(creep => {
    if(creep.body.some(bodyPart => bodyPart.type == ATTACK)) {
      if(creep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
        creep.moveTo(enemyCreep);
      }
    }
    if(creep.body.some(bodyPart => bodyPart.type == RANGED_ATTACK)) {
      if(creep.rangedAttack(enemyCreep) == ERR_NOT_IN_RANGE) {
        creep.moveTo(enemyCreep);
      }
    }
    if(creep.body.some(bodyPart => bodyPart.type == HEAL)) {
      const myDamagedCreeps = myCreeps.filter(i => i.hits < i.hitsMax);
      if(myDamagedCreeps.length > 0) {
        if(creep.heal(myDamagedCreeps[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(myDamagedCreeps[0]);
        }
      }
    }
  })
}
