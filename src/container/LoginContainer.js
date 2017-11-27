/**
 * Created by chenxuhua on 2017/11/24.
 */
import {React} from "../commonjs/CommonImport"
import Login from '../components/Login'
export default class LoginContainer extends React.Component {
    render() {
        return (<Login routes={this.props.routes} router={this.props.router} children={this.props.children}></Login>)
    }
}
