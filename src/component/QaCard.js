import React, {useState, useLayoutEffect} from "react";
import clsx from "clsx";
import {Button,message} from 'y-ui0';
import {Markdown} from "y-markdown";
import {useExactHeight} from "../utils/hook";
import './QaCard.scss';

export default function Card(props) {
    const {data} = props;
    // console.log('总分',data.reduce((acc,x)=>acc+x.score,0));
    const [currentScore, setCurrentScore] = useState(0);
    const [currentDataIndex, setCurrentDataIndex] = useState(0);
    const [scored, setScored] = useState(false);
    const [status, setStatus] = useState('question');

    const [exactContainerRef,containerRef,updateHeight] = useExactHeight();

    useLayoutEffect(()=>{
        return updateHeight(status==='answer');
    },[status,updateHeight])

    const {question, answer, score} = data[currentDataIndex];

    const isQuestion = status === 'question';
    return <div className="card">
        <div className="card-show">
            <div className="card-header">
                <div className="header-left">
                    当前得分：<span className="score">{currentScore}</span>
                </div>
                <div className="header-right">
                    <Button primary onClick={reset}>重新挑战！</Button>
                </div>
            </div>

            <div className={clsx("card-content", status)} ref={exactContainerRef}>
                <div ref={containerRef}>
                    {
                        isQuestion ? `关卡${currentDataIndex+1}：` : `答案${currentDataIndex+1}：`
                    }
                    {
                        isQuestion ? question : <Markdown>{answer}</Markdown>
                    }
                </div>
            </div>
        </div>

        <div className="card-operation">
            {
                currentDataIndex !== data.length - 1 ?
                    <Button onClick={nextQuestion}>下一关</Button> :
                    <Button primary onClick={readTestResult}>查看挑战结果</Button>
            }
            <Button onClick={readAnswer}>查看答案</Button>
            <Button danger onClick={getScore}>确认得分</Button>
            <Button cancel onClick={cancelScore}>取消得分</Button>
        </div>
    </div>

    function readAnswer() {
        setStatus('answer');
    }

    function getScore() {
        if (scored) return message.show({info: '已获取此分数!', icon: 'info'}, 1600);
        setScored(true);
        setCurrentScore(x => x + score)
    }

    function cancelScore() {
        if (!scored) return message.show({info: '尚未获取此分数！', icon: 'warn'}, 1600)
        setScored(false);
        setCurrentScore(x => x - score)
    }

    function nextQuestion() {
        if(status!=='answer') return message.show({info:'必须查看答案，才能挑战下一关！',icon:'warn'},1600)
        setStatus('question');
        setScored(false);
        setCurrentDataIndex(x => x + 1);
    }

    function readTestResult() {

    }

    function reset() {
        setStatus('question');
        setScored(false);
        setCurrentScore(0);
        setCurrentDataIndex(0);
    }
}
