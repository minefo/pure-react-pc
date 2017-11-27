/**
 * Created by chenxuhua on 2017/11/24.
 */
import {React} from "../../commonjs/CommonImport"
import DictionaryPage from '../../components/basic/DictionaryPage'
export default class DictionaryPageContainer extends React.Component {
    render() {
        return (<DictionaryPage routes={this.props.routes} router={this.props.router} children={this.props.children}></DictionaryPage>)
    }
}
