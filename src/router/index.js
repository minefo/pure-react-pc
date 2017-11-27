/**
 * Created by chenxuhua on 2017/9/6.
 */

const routes = [
    {
        path: '/',
        getComponent(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../container/LoginContainer").default)
            },"LoginContainer")
        },
    },
    {
        path: '/login',
        getComponent(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../container/LoginContainer").default)
            },"LoginContainer")
        },
    },
    {
        path: '/',
        getComponent(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../container/common/PageContaner").default)
            },"basic")
        },
        breadcrumbName:"首页",
        childRoutes: [
            {
                path: '/index',
                getComponent(location, callback) {
                    require.ensure([], function (require) {
                        callback(null, require("../container/IndexContainer").default)
                    },'IndexContainer')
                },
            }
        ]
    },
    {
        path: '/',
        getComponent(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../container/common/PageContaner").default)
            },"basic")
        },
        breadcrumbName:"首页",
        childRoutes: [
            {
                path: '/categories',
                breadcrumbName:"商品分类",
                getComponent(location, callback) {
                    require.ensure([], function (require) {
                        callback(null, require("../container/basic/CategoriesContainer").default)
                    })
                },
                childRoutes:[
                    {
                        path: '/subCategories/:parentCategoriesCode',
                        breadcrumbName:"二级分类",
                        getComponent(location, callback) {
                            require.ensure([], function (require) {
                                callback(null, require("../container/basic/SubCategoriesContainer").default)
                            })
                        },
                        childRoutes:[
                            {
                                path: '/productPage/:categoriesCode',
                                breadcrumbName:"产品",
                                getComponent(location, callback) {
                                    require.ensure([], function (require) {
                                        callback(null, require("../container/basic/ProductPageContainer").default)
                                    })
                                },
                            }
                        ]
                    }
                ]
            },
            {
                path: '/dictionaryPage',
                breadcrumbName:"字典",
                getComponent(location, callback) {
                    require.ensure([], function (require) {
                        callback(null, require("../container/basic/DictionaryPageContainer").default)
                    })
                },
            },
        ]
    }
]

export default routes



