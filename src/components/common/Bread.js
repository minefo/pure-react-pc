import React from 'react';
import { Link } from 'react-router';
import {Breadcrumb} from 'antd'
function Bread({routes,params}) {
    function itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last||route.path=="" ? <span>{route.breadcrumbName}</span> : <Link to={"/"+(paths.pop()||"index")}>{route.breadcrumbName}</Link>;
    }
    return (
        <Breadcrumb  routes={routes} params={params} itemRender={itemRender}/>
    );
}

export default Bread;
