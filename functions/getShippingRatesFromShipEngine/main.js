const calculateShippingRates = require('./services/calculateShippingRates');
const config = require('./services/getConfig');

const getShippingRatesFromShipEngine = async (data, context) => {
    const { shipment, shipmentId } = data;
    if (!!shipment && !!shipmentId) {
        throw new functions.https.HttpsError(
            'failed_precondition',
            'You must specify either `shipment` or `shipmentId` but not both.',
        );
    }

    const { carriersIds, ratesFieldName } = config;
    const result = await calculateShippingRates({
        shipmentData: data,
        carriers: carriersIds,
        ratesKey: ratesFieldName,
    });
    return result;
};

module.exports = getShippingRatesFromShipEngine;
