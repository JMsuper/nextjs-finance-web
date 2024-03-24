import { useEffect, useState } from "react";

export default function useFetch(url: string){
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(data => {
            console.log(data);
            setData(data);
        })
        .catch(error => console.log(error));
    }, [url]);

    return data;
}