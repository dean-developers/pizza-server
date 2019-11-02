
function userSerialize({ id, login, type, status }) {
    return { id, login, type, status };
}

module.exports = {
    userSerialize
};
