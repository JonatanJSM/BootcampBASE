import { useCallback, useState } from "react"

export const useToggle = (initialstate = false): [value:boolean, toggle:()=>void] =>{
    const [value, setValue] = useState(initialstate);

    const toggle = useCallback(
        () => {
            setValue((state) => !state)
        },[]);

    return [value, toggle];
}