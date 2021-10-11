
function mouseshow( mouseact , einput ){
	ineuron = einput.parentNode.cellIndex ;
		for( icol = 0 ; icol < nneurons ; icol ++ ){
			if( ! Nclicked[ icol ] ){
				if( icol == ineuron ){
					switch( mouseact ){
						  case mouseactover :
					      case mouseactclick :
					outs.rows[ 0 ].cells[ icol ].style.background = showcolorselneuron ;
					break;case mouseactout :
					outs.rows[ 0 ].cells[ icol ].style.background = '' ;
					}
				}
			}
		}
		for( irow =0  ; irow < nneurons ; irow ++ ){
			for( icol = 0 ; icol < nneurons ; icol ++ ){
				if( irow == icol ){ // neuron
					if( ! Nclicked[ icol ] ){
						if( icol == ineuron ){
							switch( mouseact ){
							      case mouseactover :
							      case mouseactclick :
							NxN.rows[ irow ].cells[ icol ].style.background = showcolorselneuron ;
							break;case mouseactout :
							NxN.rows[ irow ].cells[ icol ].style.background = '' ;
							}
						}
					}
				}else{ // synapse
					if( irow == ineuron ){
						if( ! Nclicked[ irow ] ){
							switch( mouseact ){
							      case mouseactover :
							      case mouseactclick :
							NxN.rows[ irow ].cells[ icol ].childNodes[ isynin  ].style.background = showcolorselneuron ;
							break;case mouseactout :
							NxN.rows[ irow ].cells[ icol ].childNodes[ isynin  ].style.background = '' ;
							}
						}
					}
					if( icol == ineuron ){
						if( ! Nclicked[ icol ] ){
							switch( mouseact ){
							      case mouseactover :
							      case mouseactclick :
							NxN.rows[ irow ].cells[ icol ].childNodes[ isynout  ].style.background = showcolorselneuron ;
							break;case mouseactout :
							NxN.rows[ irow ].cells[ icol ].childNodes[ isynout  ].style.background = '' ;
							}
						}
					}
				}
			}
		}
		for( irow = 0 ; irow < ngen ; irow ++ ){
			for( icol = 0 ; icol < nneurons ; icol ++ ){
				if( ! Nclicked[ icol ] ){
					if( icol == ineuron ){
						switch( mouseact ){
							  case mouseactover :
						      case mouseactclick :
						gen.rows[ irow ].cells[ icol ].style.background = showcolorselneuron ;
						break;case mouseactout :
						gen.rows[ irow ].cells[ icol ].style.background = '' ;
						}
					}
				}
			}
		}
		if( mouseact == mouseactclick ){
			if( Nclicked[ ineuron ] ){
			Nclicked[ ineuron ] = false ;
			}else{
			Nclicked[ ineuron ] = true ;
			}
		}
}
function mouseshowneuron( mouseact , einput ){
	mouseshow( mouseact , einput ) ;
}
function mouseshowsyn( mouseact , tdsel ){
		switch( mouseact ){
			  case mouseactover :
			  case mouseactclick :
		tdsel.style.background = showcolorselsyn ;
		NxN.rows[ tdsel.parentNode.rowIndex  ].cells[ tdsel.parentNode.rowIndex ].style.background = showcolorselsyn ;
		NxN.rows[ tdsel.cellIndex            ].cells[ tdsel.cellIndex           ].style.background = showcolorselsyn ;
			if( mouseact == mouseactclick ){ synclicked[ tdsel.parentNode.rowIndex ][ tdsel.cellIndex ] = true ; }
		break;case mouseactout :
			if( ! synclicked[ tdsel.parentNode.rowIndex ][ tdsel.cellIndex ] ){
			tdsel.style.background = '' ;
				if( Nclicked[ tdsel.parentNode.rowIndex ] ){
				NxN.rows[ tdsel.parentNode.rowIndex  ].cells[ tdsel.parentNode.rowIndex ].style.background = showcolorselneuron ;
				}else{
				NxN.rows[ tdsel.parentNode.rowIndex  ].cells[ tdsel.parentNode.rowIndex ].style.background = '' ;
				}
				if( Nclicked[ tdsel.cellIndex ] ){
				NxN.rows[ tdsel.cellIndex            ].cells[ tdsel.cellIndex           ].style.background = showcolorselneuron ;
				}else{
				NxN.rows[ tdsel.cellIndex            ].cells[ tdsel.cellIndex           ].style.background = '' ;
				}
			}
		}
}
function neuronshow( eneuronsel ){
	ineuron = eneuronsel.parentNode.cellIndex ;
	outsum = '' ;
		for( isyn = 0 ; isyn < nneurons ; isyn ++ ){
			if( isyn != ineuron ){
			esynin = NxN.rows[ ineuron ].cells[ isyn ].childNodes[ isynin ].childNodes[ 0 ] ;
			esynin.value = eneuronsel.value ;
				if( ! isNaN( esynin.value )){
				outsum += Number( esynin.value ) ;
				}
// syn out
			NxN.rows[ isyn ].cells[ ineuron ].childNodes[ isynout ].childNodes[ 0 ].value = eneuronsel.value ;
			}
		}
		if(( ! outsum )||( outsum == 0 )){ outsum = eneuronsel.value ; }
	outs.rows[ 0 ].cells[ ineuron ].childNodes[ 0 ].value = outsum ;
		for( igen = 0 ; igen < ngen ; igen ++ ){
		gen.rows[ igen ].cells[ ineuron ].childNodes[ 0 ].value = eneuronsel.value ;
		}
}
