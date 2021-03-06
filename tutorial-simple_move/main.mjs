import { getObjectsByPrototype } from '/game/utils';
import { Creep, Flag } from '/game/prototypes';
import { } from '/game/constants';
import { } from '/arena';

export function loop() {
    const creeps = getObjectsByPrototype(Creep);
    const flags = getObjectsByPrototype(Flag);

    creeps[0].moveTo(flags[0]);
}
