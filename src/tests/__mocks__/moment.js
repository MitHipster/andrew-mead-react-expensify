// Grab the original module of moment, not the mocked moment
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
	return moment(timestamp);
};
