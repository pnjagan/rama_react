//var seqMap ={} ;

export default function getNextSeq(seqType) {

    if( typeof getNextSeq.seqMap == 'undefined' ) {
        getNextSeq.seqMap = {};
    }

    if(!seqType) {
        seqType = 'DEFAULT';
    }    

    let nextVal = null;    

    if(!getNextSeq.seqMap[seqType]) {
        nextVal = 0;
    } else {
        nextVal = getNextSeq.seqMap[seqType];
    }
    nextVal = nextVal + 1;

    getNextSeq.seqMap[seqType] = nextVal;
    return nextVal;    
}