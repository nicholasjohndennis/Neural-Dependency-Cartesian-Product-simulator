
function nxntrace( alg ){ alg.trace() ; }

var iphase , nphase =2 , iphaseneuron = 0 , iphasesyn = 1 ;
function nxnscan( alg ){
		for( icol = 0 ; icol < nneurons ; icol ++ ) outs.rows[ 0 ].cells[ icol ].childNodes[ 0 ].value = '' ;
		for( iphase = 0 ; iphase < nphase ; iphase ++ ){
			for( irow = 0 ; irow < nneurons ; irow ++ ){
			eneuronin = NxN.rows[ irow ].cells[ irow ].childNodes[ 0 ] ;
				for( icol = 0 ; icol < nneurons ; icol ++ ){
					if( irow != icol ){
					eneuronout = NxN.rows[ icol ].cells[ icol ].childNodes[ 0 ] ;
					esyn = NxN.rows[ irow ].cells[ icol ] ;
					esynin  = esyn.childNodes[ isynin ].childNodes[ 0 ] ;
					esynout = esyn.childNodes[ isynout ].childNodes[ 0 ] ;
						switch( iphase ){
						case iphaseneuron :
						alg.tranneuron() ;
						break;case iphasesyn :
						alg.transyn() ;
						break;default:
						}
					}
				}
			}
		}
}

var algsscan = [ algfollowerscan ] ;
var ialg = 0 ;
function genapply( igen ){
		for( ineuron = 0 ; ineuron < nneurons ; ineuron ++ ){
		egen = gen.rows[ igen ].cells[ ineuron ].childNodes[ 0 ] ;
		NxN.rows[ ineuron ].cells[ ineuron ].childNodes[ 0 ].value = egen.value ;
		}
	nxnscan( algsscan[ ialg ] ) ;
}

function reset(){
}
