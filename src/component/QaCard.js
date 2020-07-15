import React, {useState, useLayoutEffect, useEffect} from "react";
import clsx from "clsx";
import {Button, message} from 'y-ui0';
import {Markdown} from "y-markdown";
import {useExactHeight} from "../utils/hook";
import './QaCard.scss';

//数据
const DURATION_TIME = 1600;

//UI组件
export default function Card(props) {
    const {data} = props;
    // console.log('总分',data.reduce((acc,x)=>acc+x.score,0));
    const [currentDataIndex, setCurrentDataIndex] = useState(0);
    const [scored, setScored] = useState(false);
    const [status, setStatus] = useState('question');
    const [historyData,setHistoryData] = useState(getInitHistoryData(data))

    const [exactContainerRef, containerRef, updateHeight] = useExactHeight();

    useLayoutEffect(() => {
        return updateHeight(status === 'answer');
    }, [status, updateHeight])

    useEffect(()=>{
        setHistoryData(x=>{
            x[currentDataIndex].score =  scored ? data[currentDataIndex].score : 0;
            return [...x];
        })
    },[scored,currentDataIndex,data])

    const {question, answer,score} = data[currentDataIndex];

    const isQuestion = status === 'question';
    return <div className="card">
        <div className="card-show">
            <div className="card-header">
                <div className="header-left">
                    当前得分：<span className="score">{historyData.reduce((acc,x)=>acc+x.score,0)}</span>
                </div>
                <div className="header-right">
                    <Button primary onClick={reset}>重新挑战！</Button>
                </div>
            </div>

            <div className={clsx("card-content", status)} ref={exactContainerRef}>
                <div ref={containerRef}>
                    {
                        isQuestion ? `题目${currentDataIndex + 1}：` : `答案${currentDataIndex + 1}：`
                    }
                    {
                        isQuestion ? `${question}（+${score}）` : <Markdown>{answer}</Markdown>
                    }
                </div>
            </div>
        </div>

        <div className="card-operation">
            {
                currentDataIndex !== data.length - 1 ?
                    <Button onClick={nextQuestion}>下一题</Button> :
                    <Button primary onClick={readTestResult}>查看挑战结果</Button>
            }
            <Button onClick={()=>setStatus('answer')}>查看答案</Button>
            <Button danger onClick={getScore}>确认得分</Button>
            <Button cancel onClick={cancelScore}>取消得分</Button>
            <Button primary disabled={currentDataIndex===0} onClick={prevQuestion}>上一题</Button>
            <Button onClick={()=>setStatus('question')}>查看题目</Button>
        </div>
    </div>

    function getScore() {
        if (scored) return message.show({info: '已获取此分数!', icon: 'info'}, DURATION_TIME);
        setScored(true);
    }

    function cancelScore() {
        if (!scored) return message.show({info: '尚未获取此分数！', icon: 'warn'}, DURATION_TIME)
        setScored(false);
    }

    function nextQuestion() {
        setStatus('question');
        setScored(false);
        setCurrentDataIndex(x => x + 1);
    }

    function prevQuestion() {
        setScored(false);
        setStatus("question");
        setHistoryData(x=>{
            x[currentDataIndex].score = 0;
            return [...x];
        })
        setCurrentDataIndex(x=>x-1)
    }

    function readTestResult() {
        // console.log(historyData);
        const info = `共答对${historyData.filter(x=>x.score!==0).length}题`;
        message.show({info,icon:'info'},DURATION_TIME)
    }

    function reset() {
        setStatus('question');
        setScored(false);
        setCurrentDataIndex(0);
        setHistoryData(getInitHistoryData(data))
    }
}

//函数
function getInitHistoryData(data) {
    return data.map(x => ({question: x.question, score: 0}));
}
