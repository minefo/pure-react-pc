/**
 * Created by chenxuhua on 2017/11/24.
 */
import {React} from "../commonjs/CommonImport"
import Index from '../components/Index'
export default class IndexContainer extends React.Component {
    render() {
            return (<Index routes={this.props.routes} router={this.props.router} children={this.props.children}></Index>)
    }
}
