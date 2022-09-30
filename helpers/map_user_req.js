module.exports = function (user, userData) {
    if (userData.firstname)
        user.firstname = userData.firstname;
    if (userData.middlename)
        user.middlename = userData.middlename;
    if (userData.lastname)
        user.lastname = userData.lastname;
    if (userData.username)
        user.username = userData.username;
    if (userData.email)
        user.email = userData.email;
    if (userData.password)
        user.password = userData.password;
    return user;
}
