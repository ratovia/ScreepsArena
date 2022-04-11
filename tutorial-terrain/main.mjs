import { getObjectsByPrototype } from '/game/utils';
import { Creep, StructureTower, StructureContainer, Flag } from '/game/prototypes';
import { ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL, RESOURCE_ENERGY } from '/game/constants';
import { } from '/arena';

export function loop() {
  const creeps = getObjectsByPrototype(Creep);
  const myCreeps = creeps.filter(creep => creep.my);
  const enemyCreep = creeps.find(creep => !creep.my);
  const towers = getObjectsByPrototype(StructureTower)
  const flags = getObjectsByPrototype(Flag);

  myCreeps.forEach(creep => {
    const flag = creep.findClosestByPath(flags)
    creep.moveTo(flag);
    // if(creep.body.some(bodyPart => bodyPart.type == ATTACK)) {
    //   if(creep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
    //     creep.moveTo(enemyCreep);
    //   }
    // }
    // if(creep.body.some(bodyPart => bodyPart.type == RANGED_ATTACK)) {
    //   if(creep.rangedAttack(enemyCreep) == ERR_NOT_IN_RANGE) {
    //     creep.moveTo(enemyCreep);
    //   }
    // }
    // if(creep.body.some(bodyPart => bodyPart.type == HEAL)) {
    //   const myDamagedCreeps = myCreeps.filter(i => i.hits < i.hitsMax);
    //   if(myDamagedCreeps.length > 0) {
    //     if(creep.heal(myDamagedCreeps[0]) == ERR_NOT_IN_RANGE) {
    //       creep.moveTo(myDamagedCreeps[0]);
    //     }
    //   }
    // }
  })

  towers.forEach(tower => {
    if(tower.store[RESOURCE_ENERGY] < 10) {
      const myCreep = myCreeps[0]
      if(myCreep.store[RESOURCE_ENERGY] == 0) {
        const container = getObjectsByPrototype(StructureContainer)[0];
        myCreep.withdraw(container, RESOURCE_ENERGY);
      } else {
        myCreep.transfer(tower, RESOURCE_ENERGY);
      }
    } else {
      tower.attack(enemyCreep);
    }
  })
}
