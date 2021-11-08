import React, {
    FormEventHandler,
    FunctionComponent,
    MouseEventHandler,
    SyntheticEvent,
    useState
} from 'react';
import Canvas from './Canvas';

const colors = [
'black', 'red', 'yellow', 'white', 'green', 'orange', 'blue', 'gray', 'orangered'
];

const Draw: FunctionComponent = () => {

    const [colorForTool, setColorForTool] = useState('');
    const [strokeValue, setStrokeValue] = useState(1);
    const [toSave, setToSave] = useState(false);

  
    //handlers
    

    const handleClick: MouseEventHandler = (e: SyntheticEvent<object>) => {
        setColorForTool((e.target as HTMLButtonElement).name);
    };

    const handleRangeInput: FormEventHandler = (e) => {
        setStrokeValue((e.target as HTMLFormElement).valueAsNumber)
    };

    const handleSaveClick = () => {
        setToSave(true);
    };

    const palette = colors.map(color => (
        <button
            key={color}
            name={color}
            style={{
                backgroundColor: color,
                width: '40px',
                height: '40px',
            }}
            onClick={handleClick}
        >

        </button >));

    return (
        <>
            <div className="palette">
      
                {palette}
            </div>
            <div>
                <input
                    type="range"
                    name="stroke"
                    onChange={handleRangeInput}
                    value={strokeValue}
                    min="1"
                    max="20"
                />
            </div>
            <Canvas
                colorName={colorForTool}
                strokeSize={strokeValue}
                toSave={toSave}
                setToSave={(bool) => setToSave(bool)}
              
            />
            <button
                name="save"
                onClick={handleSaveClick}
            >
                Zapisz
            </button>
        </>
    );
};

export default Draw;

