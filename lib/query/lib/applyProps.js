const restrictOptions = [
    'disableOplog',
    'pollingIntervalMs',
    'pollingThrottleMs'
];

export default function applyProps(node) {
    let filters = _.extend({}, node.props.$filters);
    let options =_ .extend({}, node.props.$options);
    let fields = options.fields || {}
    options = _.omit(options, ...restrictOptions);



    options.fields = options.fields || {};

    node.applyFields(filters, options);

    // remove nested fields if top level is available
    _.each(_.keys(options.fields), function(key) {
      if (key.indexOf('.') > -1) {
        let keyArray = key.split('.')
        let topLevelProp = keyArray[0]
        if(options.fields[topLevelProp]) {
          delete options.fields[key]
        }
      }
    });

    return {filters, options};
}
