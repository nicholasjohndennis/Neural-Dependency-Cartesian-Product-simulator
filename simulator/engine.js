
var nlay = 1 ;
var ilay ;

var nneurons = 6 ;
var ngen = 7 , igen ;
var irow , icol ;
var ichild , jchild , childnode ;
var isynin = 0 ;
var isynout = 1 ;

var ineuron ;
var isyn ;

var showsize    = 50 ;

var showcolorout    = '#ff99cc' ;

var showcolorsynin  = '#ccffcc' ;
var showcolorneuron = '#ccffff' ;
var showcolorsynout = '#ffcccc' ;

var showcolorin     = '#66ff66' ;

var mouseactover = 1 , mouseactout = 2  , mouseactclick = 3 ;

function lay_create( ilay ){
var row , cell ;
// outs
	row = outs.insertRow( -1 ) ;
		for( ineuron = 0 ; ineuron < nneurons ; ineuron ++ ){
		cell = row.insertCell( -1 ) ;
		cell.innerHTML = '<input type="text"style = " \
 background-color: '+showcolorout+' \
;width:'+showsize+'px; height:'+showsize/2+'px \
;border: 0;border-radius: 0 0 '+showsize/2+'px '+showsize/2+'px \
">' ;
			for( ichild = cell.childNodes.length - 1 ; ichild >= 0  ; ichild -- ){
				if( cell.childNodes[ ichild ].nodeType != 1 ){
				cell.removeChild( cell.childNodes[ ichild ] ) ;
				}
			}
		}
// NxN
		for( irow = 0 ; irow < nneurons ; irow ++ ){
		row = NxN.insertRow( -1 ) ;
			for( icol = 0 ; icol < nneurons ; icol ++ ){
			cell = row.insertCell( -1 ) ;
				if( irow == icol ){ // neuron
				cell.innerHTML = ' \
<input type="text" style = " \
background-color: '+showcolorneuron+' \
;width:'+showsize+'px; height:'+showsize+'px \
;border: 0;border-radius: '+showsize+'px \
" \
onmouseover ="mouseshowneuron( '+mouseactover  +' , this )" \
onmouseout  ="mouseshowneuron( '+mouseactout   +' , this )" \
onclick     ="mouseshowneuron( '+mouseactclick   +' , this )" \
 >' ;
					for( ichild = cell.childNodes.length - 1 ; ichild >= 0  ; ichild -- ){
						if( cell.childNodes[ ichild ].nodeType != 1 ){
						cell.removeChild( cell.childNodes[ ichild ] ) ;
						}
					}
				cell.childNodes[ 0 ].addEventListener("keyup", function(event) {
					if (event.key === "Enter") {
					 neuronshow( this ) ;
					}
				});
				}else{ // syn
				cell.innerHTML = '<div> \
<input type="text" style = " \
 background-color: '+showcolorsynin+' \
;width:'+showsize+'px; height:'+showsize/2+'px \
;border: 0;border-radius: '+showsize/2+'px '+showsize/2+'px 0 0 \
"></div><div> \
<input type="text" style = " \
 background-color: '+showcolorsynout+' \
;width:'+showsize+'px; height:'+showsize/2+'px \
;border: 0;border-radius: 0 0 '+showsize/2+'px '+showsize/2+'px \
"></div>' ;
 cell.onmouseover = function( mouseact , td ){ mouseshowsyn( mouseactover , this  ) } ;
 cell.onmouseout  = function( mouseact , td ){ mouseshowsyn( mouseactout  , this  ) } ;
 cell.onclick     = function( mouseact , td ){ mouseshowsyn( mouseactclick  , this  ) } ;

					for( ichild = cell.childNodes.length - 1 ; ichild >= 0  ; ichild -- ){
					childnode = cell.childNodes[ ichild ] ;
						for( jchild = childnode.childNodes.length - 1 ; jchild >= 0  ; jchild -- ){
							if( childnode.childNodes[ jchild ].nodeType != 1 ){
							childnode.removeChild( childnode.childNodes[ jchild ] ) ;
							}
						}
					}
				}
			}
		}
// gen
		for( igen = 0 ; igen < ngen ; igen ++ ){
		row = gen.insertRow( -1 ) ;
			for( ineuron = 0 ; ineuron < nneurons ; ineuron ++ ){
			cell = row.insertCell( -1 ) ;
			cell.innerHTML = '<input type="text" style = " \
 background-color: '+showcolorin+' \
;width:'+showsize+'px; height:'+showsize/2+'px \
;border: 0;border-radius: '+showsize/2+'px '+showsize/2+'px 0 0 \
">' ;
				for( ichild = cell.childNodes.length - 1 ; ichild >= 0  ; ichild -- ){
					if( cell.childNodes[ ichild ].nodeType != 1 ){
					cell.removeChild( cell.childNodes[ ichild ] ) ;
					}
				}
			}
		cell = row.insertCell( -1 ) ;
		cell.innerHTML = ' \
<input type="button" \
value="Commit" onclick="gencommit('+igen+')" \
> \
		' ;
		}
// names
	row = names.insertRow( -1 ) ;
		for( ineuron = 0 ; ineuron < nneurons ; ineuron ++ ){
		cell = row.insertCell( -1 ) ;
		cell.innerHTML = '<input type="text" style = " \
 width:'+showsize+'px; height:'+showsize/2+'px \
">' ;
		}
}
function lays_create(){
		for( ilay = 0 ; ilay < nlay ; ilay ++ ) lay_create( ilay ) ;
}

var eneuron , eneuronin , eneuronout , eout , egen ;
var esyn , esynin , esynout ;
var outsum ;

var Nclicked = new Array( nneurons ).fill( false ) ;
//var synclicked = new Array( nneurons ).fill( new Array( nneurons ) ) ;
var synclicked = Array.from( Array( nneurons ), () => new Array( nneurons ).fill( false )) ;
// synclicked[ 0 ][ 0 ] = 0 ;
// synclicked[ 5 ][ 5 ] = 5 ;
var showcolorselneuron = 'rgb(0%, 0%, 100%)' ;
var showcolorselsyn    = 'rgb(128, 64, 0)' ;

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
function gencommit( irow ){
		for( ineuron = 0 ; ineuron < nneurons ; ineuron ++ ){
		egen = gen.rows[ irow ].cells[ ineuron ].childNodes[ 0 ] ;
		NxN.rows[ ineuron ].cells[ ineuron ].childNodes[ 0 ].value = egen.value ;
		}
	nxnscan( algsscan[ ialg ] ) ;
}

function reset(){
}
