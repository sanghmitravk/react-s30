import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListTypes } from './ListTypes';
import '../styles/ListStyle.scss';

const List = () => {
    const [data, setData] = useState<ListTypes.IList[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://randomuser.me/api');
            const { data: { results } } = response;
            setData(results);
            localStorage.setItem('results', JSON.stringify(results));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (!!localStorage.getItem('results')) {
            const data = localStorage.getItem('results');
            data && setData(JSON.parse(data));
        } else {
            fetchData();
        }
    }, []);

    const handleClick = () => {
        fetchData();
    }

    return (
        <div className='List'>
            {data ? (
                <div>
                    {

                        data.map((item: ListTypes.IList, index) => {
                            const { name: { title, first, last }, email } = item || {};
                            return <div key={index}>
                                <div>{title} {first} {last}</div>
                                <div>{email}</div>
                            </div>
                        })}
                    <button onClick={handleClick}>Refresh</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default List;