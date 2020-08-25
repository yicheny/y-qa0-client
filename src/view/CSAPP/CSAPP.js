import React,{useState,useMemo} from 'react';
import _ from 'lodash';
import QaCard from "../../component/QaCard";
import Ch1_data from '../../data/csapp/ch1_data';
import FormInput from "../../component/FormInput";

const ops_question_store = [
    {
        text:'第一章测试题',
        value:Ch1_data
    }
]

function CSAPP(props) {
    const [data,setData] = useState(Ch1_data);

    /*const ops_question = useMemo(()=>{
        if(_.isNil(data)) return null;
        return data.map((x,i)=>({
            text:`${i+1}-${x.question}`,
            value:i
        }))
    },[data])*/

    return (<div className='fill flex-center'>
        <div className="box">
            <div style={{margin:'12px 0'}}>
                <FormInput label='请选择对应题库'
                           options={ops_question_store}
                           defaultValue={data}
                           onChange={(e,o,v)=>setData(v)}/>
                {/*<FormInput label='切换当前题目'
                          options={ops_question}
                          onChange={(e,o,v)=>console.log(v)}/>*/}
            </div>
            <QaCard data={data}/>
        </div>
    </div>);
}

export default CSAPP;
