class Middleware {
    pagination(pageNo) {
        const query = {};
        let response = {};

        let size = parseInt(process.env.SIZE);
        if (pageNo < 0 || pageNo === 0) {
            response = {'error': true, 'message': 'invalid page number, should start with 1'};
            return JSON.stringify(response);
        }
        query.skip = size * (pageNo - 1);
        query.limit = size;

        return query;
    }
}

module.exports = new Middleware();