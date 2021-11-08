class  Algfollower{
  constructor() {
this.neuron2synin =
[
	  [   ,   , 3 , 3 ,   ]
	, [ 1 ,   , 3 , 3 ,   ]
//	, [   ,   ,   ,   ,   ]
//	, [   ,   ,   ,   ,   ]
//	, [   ,   ,   ,   ,   ]
] ;
this.synout2synin =
[
	  [   ,   , 2 , 3 ,   ]
	, [   , 2 , 2 , 3 ,   ]
//	, [   ,   ,   ,   ,   ]
//	, [   ,   ,   ,   ,   ]
//	, [   ,   ,   ,   ,   ]
] ;
this.synin2neuronout  =
[
  [   ,   , 1 ,   ,   ]
, [ 1 , 1 , 1 , 1 ,   ]
// , [   ,   ,   ,   ,   ]
// , [   ,   ,   ,   ,   ]
// , [   ,   ,   ,   ,   ]
] ;
this.outsynin2out  =
[
	[
	  [   ,   , 1 ,   ,   ]
	, [ 1 ,   , 1 ,   ,   ]
	, [   ,   ,   ,   ,   ]
	, [   ,   ,   ,   ,   ]
	, [   ,   ,   ,   ,   ]
	] , [
	  [   ,   , 1 ,   ,   ]
	, [ 1 ,   , 1 , 1 ,   ]
	, [   ,   ,   ,   ,   ]
	, [   ,   ,   ,   ,   ]
	, [   ,   ,   ,   ,   ]
	]
] ;
this.neuron2synout = [  , 1 ,   ,   ,  ] ;
this.iphase ;
 }
xform(){
	switch( this.iphase ){
	case 0 :
		if( esyn ){
		esynin.value     = u2n( this.neuron2synin   [ Number( eneuronin.value  ) ][ Number( esynin.value ) ] ) ;
		esynin.value     = u2n( this.synout2synin   [ Number( esynout.value    ) ][ Number( esynin.value ) ] ) ;

		esynout.value    = u2n( this.neuron2synout  [ Number( eneuronout.value ) ] ) ;

		}else{
		}
	break;case 1 :
		if( esyn ){
		eneuronout.value = u2n( this.synin2neuronout[ Number( eneuronout.value ) ][ Number( esynin.value ) ] ) ;

		eoutout.value    = u2n( this.outsynin2out [ Number( eneuronout.value  ) ][ Number( eoutout.value    ) ][ Number( esynin.value ) ] ) ;
		eoutin.value     = u2n( this.outsynin2out[ Number( eneuronin.value   ) ][ Number( eoutin.value     ) ][ Number( esynin.value ) ] ) ;
		}else{
		}
	}
}
apply(){
		for( this.iphase = 0 ; this.iphase < 2 ; this.iphase ++ ){
		nxnscan( this ) ;
		}
}
};
var algfollower = new Algfollower();
