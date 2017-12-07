/**
 * Created by chenxuhua on 2017/9/6.
 */
import React from 'react';
//kenley 组件加载区start
import PageCommon from '../components/common/PageCommon';
import Login from '../components/Login';
import Index from '../components/Index';

import Categories from '../components/basic/Categories';
import SubCategories from '../components/basic/SubCategories';
import ProductPage from '../components/basic/ProductPage';
import DictionaryPage from '../components/basic/DictionaryPage';
//kenley 组件加载区end


const containerGenerator = function( ContentComponent ){
    class Container extends React.Component {
        render() {
            if(ContentComponent===Categories || ContentComponent===SubCategories ){
                return (<div>{this.props.children ? this.props.children : <ContentComponent routes={this.props.routes} router={this.props.router} children={this.props.children}></ContentComponent>}</div>)
            }
            else{
                return (<ContentComponent routes={this.props.routes} router={this.props.router} children={this.props.children}></ContentComponent>)
            }
        }
    }
    return Container
}



export  const PageContaner=containerGenerator(PageCommon);
export  const LoginContainer=containerGenerator(Login);
export  const IndexContainer=containerGenerator(Index);
export  const CategoriesContainer=containerGenerator(Categories);
export  const SubCategoriesContainer=containerGenerator(SubCategories);
export  const ProductPageContainer=containerGenerator(ProductPage);
export  const DictionaryPageContainer=containerGenerator(DictionaryPage);









