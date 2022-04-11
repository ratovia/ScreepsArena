import { getObjectsByPrototype, findClosestByPath, createConstructionSite } from '/game/utils';
import { Creep, StructureContainer, ConstructionSite,StructureTower } from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from '/game/constants';
import { } from '/arena';

export function loop() {
  const creep = getObjectsByPrototype(Creep).find(i => i.my);
	if(!creep.store[RESOURCE_ENERGY]) {
		const container = findClosestByPath(creep, getObjectsByPrototype(StructureContainer));
		if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(container);
		}
	} else {
		const constructionSite = getObjectsByPrototype(ConstructionSite).find(i => i.my);
		if(!constructionSite) {
			createConstructionSite(50,50, StructureTower);
		} else {
			if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
				creep.moveTo(constructionSite);
			}
		}
	}
}
