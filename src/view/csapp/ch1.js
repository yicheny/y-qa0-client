import React from 'react';
import QaCard from "../../component/QaCard";
import {data} from './ch1_data';

function Ch1(props) {
    return (<div className='fill flex-center'>
        <QaCard data={data}/>
    </div>);
}

export default Ch1;
