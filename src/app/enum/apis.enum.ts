export enum APIS_ENUM {
    //LOGIN SERVICE
    POST_LOGIN = '/api/login',
    POST_NEW_USER = '/api/newUser',
    GET_USER_BY_TOKEN = '/api/getUserByToken',
    

    //USER
    GET_USER_BY_ID = '/api/getUser/?',
    GET_ALL_USERS = '/api/getUsers',
    POST_EDIT_USER = '/api/updateUser/?',
    POST_DELETE_USER = '/api/deleteUser/?',

    //CAREER
    POST_NEW_CAREER = '/api/newCarrera',
    GET_ALL_CAREERS = '/api/getCarreras',
    GET_CAREER_BY_ID = '/api/getCarrera/?',
    POST_EDIT_CAREER = '/api/updateCarrera/?',
    POST_DELETE_CAREER = '/api/deletecarrera/?',

    //FAQ
    GET_ALL_FAQ = '/api/getFaqs',
}