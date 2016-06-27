var ArchiveGroup = (function(){
	var maxSeq = 0;
	var group = {
		"소소한 이야기":[1,9,12,13,19,36,47,53,70,73,75,95,124,179,187,190,193,195],
		"개발 이야기":[5,6,15,20,25,26,28,29,30,33,37,38,39,40,41,42,43,44,45,46,48,49,51,52,107,108,110,156,175,183,191,194,210,219,221,232],
		"Linux":[2,4,14,50,74,155,182,185,212],
		"Java":[3,67,68,69,72,100,154,158,172,173,174,181,188,197,202,213,215,216,222,224,225,226,227,229,231],
		"Spring":[81,102,105,106,109,114,121,123,140,141,142,143,160,161,163,165,199,200,230],
		"Design Patterns":[10,11,32,54,78,116,180,192,217,228],
		"JavaScript":[58,62,64,66,97,117,118,126,148,150,153],
		"jQuery":[27,56,57,86,144,145,147],
		"Machine learning":[103,104,111,112,113,127,131,134,135],
		"Link":[65,79,92,119,120,136,146,149,178,186,196,206,223],
		"Scala":[82,83,85,89,90,94,96,129],
		"MongoDB":[16,17,18],
		"Oracle":[7,8,34,35,55,71,77],
		"Node.js":[21,166],
		"Python 3.X":[22,23,24],
		"Terminology":[98,101,115,122,125,177],
		"angularJS":[31],
		"Go":[59,60,61],
		"Grails":[63],
		"C/C++":[76,80,84,170],
		"SQL":[91,168,169],
		"MariaDB":[132,133,205],
		"Redis":[139,157,159],
		"Netty":[151],
		"Hbase":[152,184,189],
		"Spark":[164,167,176],
		"Mac":[198,201,203,209,211]
	};

	var map = {};

	function init(_maxSeq){
		maxSeq = _maxSeq;
		// make "map"
		var keys = Object.keys(group);
		for( var i = 0 ; i < keys.length; i++ ){
			var name = keys[i];
			var ary = group[name];
			for( var j = 0 ; j < ary.length; j++ ){
				if( ary[j] <= maxSeq ){
					map[ary[j]] = name;
				}
			}
		}
		// make "unclassified" group
		var unclassifiedGroup = [];
		for( var i = 1; i <= maxSeq; i++ ){ // post start index is "1".
			if( map[i] == null ){
				map[i] = "unclassified";
				unclassifiedGroup.push(i);
			}
		}
		group["unclassified"] = unclassifiedGroup;
	};

	return {
		init:init,
		findName:function(seq){
			if( map[seq] == null ) return null;
			return map[seq];
		},
		findNameAll:function(){
			var _ = [];
			var keys = Object.keys(group);
			for(var i = 0 ; i < keys.length; i++){
				_.push(keys[i]);
			}
			return keys;
		},
		findGroup:function(seq){
			if( map[seq] == null ) return null;
			var _ = [];
			var defaultGroup = group[map[seq]];
			for( var i = 0; i < defaultGroup.length; i++ ){
				if( defaultGroup[i] <= maxSeq ){
					_.push(defaultGroup[i]);
				}
			}
			return _;
		},
		findGroupByName:function(name){
			if( group[name] == null ) return null;
			var _ = [];
			var defaultGroup = group[name];
			for( var i = 0; i < defaultGroup.length; i++ ){
				if( defaultGroup[i] <= maxSeq ){
					_.push(defaultGroup[i]);
				}
			}
			return _;
		}
	};
})();
