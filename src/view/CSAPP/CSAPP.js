import React,{useState} from 'react';
import {Dropdown} from "y-ui0";
import QaCard from "../../component/QaCard";
import Ch1_data from '../../data/csapp/ch1_data';

const options = [
    {
        text:'第一章测试题',
        value:Ch1_data
    }
]

function CSAPP(props) {
    const [data,setData] = useState(Ch1_data);

    return (<div className='fill flex-center'>
        <div className="box">
            <div style={{margin:'12px 0'}}>
                请选择对应题库：<Dropdown options={options}
                                        defaultValue={data}
                                        onChange={(e,o,v)=>setData(v)}/>
            </div>
            <QaCard data={data}/>
        </div>
    </div>);
}

export default CSAPP;
