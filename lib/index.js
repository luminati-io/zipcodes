
var codesUS = require('./codes'),
    states = require('./states');

var codes = {};
codes.codes = codesUS.codes;
codes.stateMap = codesUS.stateMap;

exports.states = states;
exports.codes = codes.codes;

var lookup = function(zip) {
    if (zip != null && zip != undefined && typeof zip === "string" && isNaN(zip.charAt(0))) {
      return codes.codes[zip.slice(0, 3)];
    }
    return codes.codes[zip];
};

exports.lookup = lookup;

var random = function() {
    var keys = Object.keys(codes.codes)
    return codes.codes[keys[ keys.length * Math.random() << 0]];
};
exports.random = random;

var byName = function(city, state) {
    city = city.toUpperCase();

    var ret = [];
    
    byState(state).forEach(function(item) {
        if (city === item.city.toUpperCase()) {
            ret.push(item);
        }
    });

    return ret;
};

exports.lookupByName = byName;

var byState = function(state) {
    var normalized = states.normalize(state.toUpperCase()),
        ret = [],
        mapping = codes.stateMap[normalized] || codes.stateMap[state];

    if (!mapping) {
        return ret;
    }

    mapping.forEach(function(zip) {
        ret.push(codes.codes[zip]);
    });

    return ret;
};

exports.lookupByState = byState;
