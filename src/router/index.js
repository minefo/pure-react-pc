/**
 * Created by chenxuhua on 2017/9/6.
 */

import {
    PageContaner,
    LoginContainer,
    IndexContainer,
    CategoriesContainer,
    SubCategoriesContainer,
    ProductPageContainer,
    DictionaryPageContainer
} from "./InitContainer"


const routes = [
    {
        path: '/',
        component: LoginContainer,
    },
    {
        path: '/login',
        component: LoginContainer,
    },
    {
        path: '/',
        component: PageContaner,
        breadcrumbName:"首页",
        childRoutes: [
            {
                path: '/index',
                component: IndexContainer,
            }
        ]
    },
    {
        path: '/',
        component: PageContaner,
        breadcrumbName:"首页",
        childRoutes: [
            {
                path: '/categories',
                breadcrumbName:"商品分类",
                component: CategoriesContainer,
                childRoutes:[
                    {
                        path: '/subCategories/:parentCategoriesCode',
                        breadcrumbName:"二级分类",
                        component: SubCategoriesContainer,
                        childRoutes:[
                            {
                                path: '/productPage/:categoriesCode',
                                breadcrumbName:"产品",
                                component: ProductPageContainer,
                            }
                        ]
                    }
                ]
            },
            {
                path: '/dictionaryPage',
                breadcrumbName:"字典",
                component: DictionaryPageContainer,
            },
        ]
    }
]

export default routes



