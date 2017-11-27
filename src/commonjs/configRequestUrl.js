/**
 * Created by chenxuhua on 2017/9/27.
 */
//所有请求路径参数配置入口
const configRequestUrl={
    login : {
        login_userLogin: "/userLogin",
        login_getVerifyCode:"/getVerifyCode",
    },
    commodity: {
        categories_add:"/categories/add",
        categories_delete:"/categories/delete",
        categories_update:"/categories/update",
        categories_detail:"/categories/detail",
        categories_page:"/categories/page",
        productPage_add:"/productPage/add",
        productPage_delete:"/productPage/del",
        productPage_update:"/productPage/update",
        productPage_detail:"/productPage/detail",
        productPage_page:"/productPage/page",
    },
    dictionary: {
        dictionary_add:"/dictionary/add",
        dictionary_delete:"/dictionary/del",
        dictionary_update:"/dictionary/update",
        dictionary_detail:"/dictionary/detail",
        dictionary_page:"/dictionary/page",
    }
}


export default configRequestUrl;
