import React, {useState} from 'react';
import clsx from 'clsx';
import {data} from './ch1_data';
import './ch1.scss';

function Card(props) {
    const {data} = props;
    const [currentScore, setCurrentScore] = useState(0);
    const [currentDataIndex, setCurrentDataIndex] = useState(0);
    const [scored, setScored] = useState(false);
    const [status, setStatus] = useState('question');

    const {question, answer, score} = data[currentDataIndex];

    return <div className="card">
        <div className="card-header">
            当前得分：
            <span className="score">
                {currentScore}
            </span>
        </div>

        <div className={clsx("card-content",status)}>
            {
                status === 'question' ? question : answer
            }
        </div>

        <div className="card-footer">
            <Button primary onClick={readAnswer}>查看答案</Button>
            <Button danger onClick={getScore}>确认得分</Button>
            {
                currentDataIndex !== data.length - 1 ?
                    <Button primary onClick={nextQuestion}>下一题</Button> :
                    <Button primary>查看挑战结果</Button>}
        </div>
    </div>

    function readAnswer() {
        setStatus('answer');
    }

    function getScore() {
        if (scored) return console.log('已获取此分数');
        setScored(true);
        setCurrentScore(x => x + score)
    }

    function nextQuestion() {
        setStatus('question');
        setScored(false);
        setCurrentDataIndex(x => x + 1);
    }
}

function Button(props) {
    const {children, primary, danger, ...rest} = props;

    return <span className={clsx('button', {primary, danger})} {...rest}>
        {children}
    </span>
}

function Ch1(props) {
    return (<div className='csapp-ch1'>
        <Card data={data}/>
    </div>);
}

export default Ch1;
