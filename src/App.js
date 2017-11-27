/**
 * Created by chenxuhua on 2017/9/6.
 */
import Entry from './Entry';
Entry();
if (module.hot) {
    module.hot.accept('./Entry', () => {
        const EntryNew = require('./Entry').default;
        EntryNew();
    })
}
