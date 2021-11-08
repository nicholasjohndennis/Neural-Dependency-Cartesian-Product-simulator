// algs for emulating the parallel operation of neural systems.

// 1) scan
// The NxN neurons and synapses are scanned top left to bottom right
// pointing these variables
var
// if currently scanning a
//              neuron      synapse
  eneuronin  // the neuron  the neuron connected to input synapse  
, eneuronout // the neuron  the neuron connected to output synapse
// the output of 
, eoutin     // the neuron  the neuron connected to input synapse
, eoutout    // the neuron  the neuron connected to output synapse
, esyn       // null        the synapse
, esynin     // null        the synaptic input
, esynout    // null        the synaptic output
;
// to the currently scanned NxN html elements
// then calling the transform alg for the neuron or synapse.

function nxnscan( alg ){
		for( irow = 0 ; irow < nneurons ; irow ++ ){
		eneuronin = NxN.rows[ irow ].cells[ irow ].childNodes[ 0 ] ;
		eoutin = outs.rows[ 0 ].cells[ irow ].childNodes[ 0 ] ;
			for( icol = 0 ; icol < nneurons ; icol ++ ){
			eneuronout = NxN.rows[ icol ].cells[ icol ].childNodes[ 0 ] ;
			eoutout = outs.rows[ 0 ].cells[ icol ].childNodes[ 0 ] ;
				if( irow == icol ){
				esyn = '' ;
				esynin  = '' ;
				esynout = '' ;
				}else{
				esyn = NxN.rows[ irow ].cells[ icol ] ;
				esynin  = esyn.childNodes[ isynin ].childNodes[ 0 ] ;
				esynout = esyn.childNodes[ isynout ].childNodes[ 0 ] ;
				}
			alg.xform() ;
			}
		}
}

// 2) trace nyi, but concept is used in navigational functions
function nxntrace( alg ){}

// 3) other. tbd

// helpers
// for converting to/from undefined, null, zero
function z2n( val ){
	var nval = Number( val ) ;
return nval ? nval : ''
}
function u2n( val ){
return typeof val === 'undefined' ? '' : val ;
}
function u2z( val ){
return typeof val === 'undefined' ? 0 : val ;
}
