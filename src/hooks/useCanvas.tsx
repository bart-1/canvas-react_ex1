import React, { FC, PropsWithRef, ReactChild, ReactPropTypes, useEffect, useRef } from 'react';



// const useCanvas = ({draw}:Props) => {
const useCanvas = (draw:CallableFunction) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const context = canvas.getContext('2d');
        draw(context);
        
    }, [draw]);
     
    return canvasRef;
    
}

export default useCanvas;