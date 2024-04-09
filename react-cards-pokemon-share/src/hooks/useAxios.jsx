import { useState } from 'react';
import axios from 'axios';

const useAxios = (baseURL) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (urlSuffix = '', processResponse) => {
        setLoading(true);
        setError(null);

        try {
            const fullUrl = `${baseURL}${urlSuffix}`;
            const response = await axios.get(fullUrl);
            let data = response.data;
            if (processResponse) {
                data = processResponse(data);
            }
            setLoading(false);
            return data;
        } catch (error) {
            setError(error);
            setLoading(false);
            return null;
        }
    };

    return {
        loading,
        error,
        fetchData
    };
}

export default useAxios;
