// Hebb’s rule indicates “neurons that fire together, wire together”
class  Algfollowerscan{
  constructor() {
this.neuron2synin = [
  [   ,   , 2 , 3 ,   ]
, [ 1 , 2 ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
];
this.neuron2synout  = [
  [   ,   ,   ,   ,   ]
, [ 1 ,   ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
];
this.synout2synin  = [
  [   ,   , 2 , 3 ,   ]
, [ 1 , 3 ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
];
this.synin2synout  = [
  [   ,   ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
, [   ,   ,   ,   ,   ]
];
this.tval , this.tvalin , this.tvalout ;
  }

tranneuron(){
// in
	this.tval = this.neuron2synin[ Number( eneuronin.value ) ][ Number( esynin.value ) ] ;
	esynin.value = typeof this.tval === 'undefined' ? '' : this.tval ;
// out
	this.tval = this.neuron2synout[ Number( eneuronout.value ) ][ Number( esynout.value ) ] ;
	esynout.value = typeof this.tval === 'undefined' ? '' : this.tval ;
}
transyn(){
	this.tvalin = this.synout2synin[ Number( esynout.value ) ][ Number( esynin.value ) ] ;
	this.tvalout = this.synin2synout[ Number( esynin.value ) ][ Number( esynout.value ) ] ;
	esynin.value = typeof this.tvalin === 'undefined' ? '' : this.tvalin ;
	esynout.value = typeof this.tvalout === 'undefined' ? '' : this.tvalout ;
}
};
var algfollowerscan = new Algfollowerscan();
