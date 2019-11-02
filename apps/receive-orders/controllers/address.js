import axios from 'axios';
import config from "../../../config/config";

const normalize = async (ctx) => {
    const { searchtext } = ctx.request.query;

    const apiConfig = config.geocode.here;

    const response = await axios.get(apiConfig.url, {
        params: {
            app_id: apiConfig.appId,
            app_code: apiConfig.appCode,
            searchtext
        }
    });

    if (response.status === 200) {
        const view = response.data && response.data.Response && response.data.Response.View
            && response.data.Response.View;

        const [result] = view.map((item) => {
            return item.Result && item.Result.map((it) => {
                return it.Location && it.Location.Address && {
                    street: it.Location.Address.Street,
                    houseNumber: it.Location.Address.HouseNumber,
                    coord: `${it.Location.DisplayPosition.Latitude},${it.Location.DisplayPosition.Longitude}`
                };
            });
        });

        ctx.body = result;
    } else {
        ctx.body = { status: '404', description: 'invalidQuery' };
    }
};

module.exports = {
    normalize
};
