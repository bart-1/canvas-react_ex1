import React, {MouseEventHandler, useEffect, useState} from 'react';
import useCanvas from '../hooks/useCanvas';
import { saveAs } from 'file-saver';

interface Props {
    colorName: string;
    strokeSize: number;
    toSave: boolean;
    setToSave: (toSave:boolean) => void;
}
 
const Canvas = ({
    colorName,
    strokeSize,
    toSave,
    setToSave,
}: Props) => {
    const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
    const [drawOn, setDrawOn] = useState(false);
    const [drawStartCoord, setDrawStartCoord] = useState({ x: 0, y: 0 });


    useEffect(() => {
        if (toSave && canvasRef.current) {
            // const img = canvasRef.current?.toDataURL("image/png");
            // document.write('<img src="'+img+'"/>');
            canvasRef.current.toBlob(function (blob) {
                saveAs(blob, "pretty image.png");
            });
            setToSave(false);
        }
       
    }, [toSave]);

    const handleMouseMove: MouseEventHandler = e => {
        if (!canvasRef.current)
        return;
        
        setMouseCoord({
            x: e.clientX - canvasRef.current.offsetLeft,
            y: e.clientY - canvasRef.current.offsetTop,
        });
    };
    
    
    const handleMouseDown: MouseEventHandler = e => {
        
        if (e.type === 'mousedown') {
            setDrawOn(true);
            setDrawStartCoord(mouseCoord);
        }
        
        if (e.type === 'mouseup')
        setDrawOn(false);
    };
    
    const draw = (ctx: CanvasRenderingContext2D): void => {
        ctx.strokeStyle = colorName;
        ctx.lineWidth = strokeSize;
        ctx.lineCap = "round";
        ctx.beginPath();
        if (drawOn) {
            ctx.moveTo(drawStartCoord.x, drawStartCoord.y);
            ctx.lineTo(mouseCoord.x, mouseCoord.y);
            setDrawStartCoord(mouseCoord);
            ctx.stroke();
        }
    };
    const canvasRef = useCanvas(draw);
    

    
    return (
      <> <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseDown}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
        height="600"
        width="600"
      >
        </canvas>
          
        </>
    );
}

export default Canvas;