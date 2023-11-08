import React, {FC, useEffect, useState} from 'react';
import copy from "clipboard-copy";

interface ButtonCopyType {
    searchValue:string
}

const ButtonCopy:FC<ButtonCopyType> = ({searchValue}) => {
const[active,setActive]=useState(false)

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (active) {
            timer = setTimeout(() => {
                setActive(false);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [active]);

    function handleClickCopy(){
    setActive(true)
        copy(searchValue)
    }
    return (

            <button
                onClick={handleClickCopy}

            >
                {active?'Copied':'Copy'}
            </button>
    );
};

export default ButtonCopy;
