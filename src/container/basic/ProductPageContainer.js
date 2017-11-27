/**
 * Created by chenxuhua on 2017/11/24.
 */
import {React} from "../../commonjs/CommonImport"
import ProductPage from '../../components/basic/ProductPage'
export default class ProductPageContainer extends React.Component {
    render() {
        return (<ProductPage routes={this.props.routes} router={this.props.router} children={this.props.children}></ProductPage>)
    }
}
