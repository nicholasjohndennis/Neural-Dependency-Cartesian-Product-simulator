var nneurons ;
var ngen ;
var igen ;
var irow , icol ;
var ichild , jchild , childnode ;
var isynin = 0 ;
var isynout = 1 ;

var ineuron , jneuron ;
var isyn ;

var showsize    = 50 ;

var showcolorout    = '#ff99cc' ;

var showcolorsynin  = '#ccffcc' ;
var showcolorneuron = '#ccffff' ;
var showcolorsynout = '#ffcccc' ;

var showcolorin     = '#66ff66' ;

var mouseactover = 1 , mouseactout = 2  , mouseactclick = 3 ;

var egen ;

var Nclicked ;
var synclicked ;
var showcolorselneuron = 'rgb(0%, 0%, 100%)' ;
var showcolorselsyn    = 'rgb(128, 64, 0)' ;
var alg ;

function lay_gen(){
document.getElementById( 'nneurons' ).disabled = true ;
document.getElementById( 'ngen' ).disabled = true ;
document.getElementById( 'generate' ).disabled = true ;
nneurons = Number( document.getElementById( 'nneurons' ).value ) ;
ngen = Number( document.getElementById( 'ngen' ).value ) ;
Nclicked = new Array( nneurons ).fill( false ) ;
synclicked = Array.from( Array( nneurons ), () => new Array( nneurons ).fill( false )) ;

alg = algfollower ;

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
<input type="button" class="button" \
value="Apply" onclick="genapply('+igen+')" \
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

function genapply( igen ){
		for( ineuron = 0 ; ineuron < nneurons ; ineuron ++ ){
		egen = gen.rows[ igen ].cells[ ineuron ].childNodes[ 0 ] ;
		NxN.rows[ ineuron ].cells[ ineuron ].childNodes[ 0 ].value = egen.value ;
		}
	alg.apply() ;
}

function nxn_reset(){
		for( ineuron = 0 ; ineuron < nneurons ; ineuron ++ ){
		outs.rows[ 0 ].cells[ ineuron ].childNodes[ 0 ].value = '' ;
			for( jneuron = 0 ; jneuron < nneurons ; jneuron ++ ){
				if( ineuron == jneuron ){
				NxN.rows[ ineuron ].cells[ jneuron ].childNodes[ 0 ].value = '' ;
				}else{
				NxN.rows[ ineuron ].cells[ jneuron ].childNodes[ isynin ].childNodes[ 0 ].value = '' ;
				NxN.rows[ ineuron ].cells[ jneuron ].childNodes[ isynout ].childNodes[ 0 ].value = '' ;
				}
			}
		}
}
function lay_reset(){
		for( igen = 0 ; igen < ngen ; igen ++ ){
			for( ineuron = 0 ; ineuron < nneurons ; ineuron ++ ){
			gen.rows[ igen ].cells[ ineuron ].childNodes[ 0 ].value = '' ;
			}
		}
	nxn_reset() ;
}