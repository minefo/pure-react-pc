/**
 * Created by chenxuhua on 2017/11/24.
 */
import {React} from "../../commonjs/CommonImport"
import SubCategories from '../../components/basic/SubCategories';
export default class SubCategoriesContainer extends React.Component {
    render() {
        return (  <div>{this.props.children ? this.props.children : <SubCategories routes={this.props.routes} router={this.props.router} children={this.props.children}></SubCategories>}</div>)
    }
}
