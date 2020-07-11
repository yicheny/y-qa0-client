import React from 'react';
import QaCard from "../../component/QaCard";
import {data} from './ch1_data';
import './ch1.scss';

function Ch1(props) {
    return (<div className='csapp-ch1'>
        <QaCard data={data}/>
    </div>);
}

export default Ch1;
