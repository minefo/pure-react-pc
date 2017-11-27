/**
 * Created by chenxuhua on 2017/11/24.
 */
import {React} from "../../commonjs/CommonImport"
import PageCommon from '../../components/common/PageCommon'
export default class PageContaner extends React.Component {
    render() {
            return (<PageCommon routes={this.props.routes} router={this.props.router} children={this.props.children}></PageCommon>)
    }
}
