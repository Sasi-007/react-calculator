import React from 'react';
import { Textfit } from 'new-react-textfit';
import './MiniScreen.css';

const MiniScreen = ({ value }) => {
    return (
        <>
            <Textfit className="mini-screen" mode="single" max={35}>
                {value}
            </Textfit>
        </>
    );
};

export default MiniScreen;
