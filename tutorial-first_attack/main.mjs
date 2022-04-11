import { getObjectsByPrototype } from '/game/utils';
import { Creep } from '/game/prototypes';
import { ERR_NOT_IN_RANGE } from '/game/constants';
import { } from '/arena';

export function loop() {
    const creeps = getObjectsByPrototype(Creep);

    const myCreep = creeps.find(creep => creep.my);
    const enemyCreep = creeps.find(creep => !creep.my);


    if(myCreep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
        myCreep.moveTo(enemyCreep);
    }
}
