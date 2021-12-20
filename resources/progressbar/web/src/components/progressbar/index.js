import { useEffect, useState } from "react";
import { ProgressContainer, ProgressLabel, Label, ProgressBarContainer, ProgressBarFill } from "./styles";

const Progressbar = () => {
    
    // const [progressbarActive, setActive] = useState(false) 
    const [progressLabel, setLabel] = useState('Desconhecido') 
    const [percentProgress, setProgress] = useState('0') 
    
    useEffect(() => {
        let timer = undefined;
        const createProgress = (label, duration = 5000) => {
            console.log('test', label, duration)
            let currentTime = 0;
            setLabel(label)
            timer = setInterval(() => {
                currentTime += 10;
                const fillPerTick = (10 * 100) / duration
                const currentFill = fillPerTick * currentTime / 10
                setProgress(`${currentFill}`)
                if(currentTime >= duration){
                    if (timer) {
                        setProgress(`${0}`)
                        clearInterval(timer);
                        if('alt' in window){
                            // eslint-disable-next-line no-undef
                            alt.emit('progressBar:finished')
                        }
                        timer = undefined;
                      }
                }
            }, 10)
        } 
        if('alt' in window){
             // eslint-disable-next-line no-undef
            alt.emit('ready')
            // eslint-disable-next-line no-undef
            alt.on('progressBar:start', createProgress)
        }
    }, [])
    return (
 <ProgressContainer>
        <ProgressLabel>
            <Label>{progressLabel}</Label>
        </ProgressLabel>
        <ProgressBarContainer>
            <ProgressBarFill style={{width: `${percentProgress}%`}}></ProgressBarFill>
        </ProgressBarContainer>
    </ProgressContainer>
    )
}
export default Progressbar