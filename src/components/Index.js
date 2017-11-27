/**
 * Created by chenxuhua on 2017/9/27.
 */
import React from 'react';
export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    mounted(){
       console.log("index-mounted");
    }
    updated(){
        console.log("index-updated");
    }
    render() {
        return (
            <div>
                这里是脚部5
            </div>
        )
    }
}
