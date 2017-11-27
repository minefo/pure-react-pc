/**
 * Created by chenxuhua on 2017/11/24.
 */
import {React} from "../../commonjs/CommonImport"
import Categories from '../../components/basic/Categories';
export default class CategoriesContainer extends React.Component {
    render() {
        return (  <div>{this.props.children ? this.props.children : <Categories routes={this.props.routes} router={this.props.router} children={this.props.children}></Categories>}</div>)
    }
}
