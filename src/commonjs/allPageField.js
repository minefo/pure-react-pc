/**
 * Created by chenxuhua on 2017/11/15.
 */
import {dicTypeList} from '../constant/pageData';
var dicType=dicTypeList.map((item)=>item.value);
const allPageField={
    categories_detail:{
        "id":"",
        "categoriesName":"",
        "categoriesCode":"",
    },
    productPage_detail:{
        "id":"",
        'productCode': "",
        'productName':"",
    },
    dictionary_detail: {
        "id":"",
        'dicName': "",
        'dicCode':"",
        "dicValue": "",
        "remark":"",
    },
}
allPageField.categories_page=allPageField.categories_detail;
allPageField.productPage_page=allPageField.productPage_detail;
allPageField.dictionary_page=allPageField.dictionary_detail;


export {
    allPageField
}

