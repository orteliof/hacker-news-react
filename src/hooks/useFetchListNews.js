import {useCallback, useEffect, useState} from 'react';
import {HackerNewsServices} from '../services';

export const useFetchListNews = () => {

    const apiService = HackerNewsServices.getInstance();
    const [isLoading, setIsLoading] = useState(false);
    const [topStories, setTopStories] = useState([]);

    const fetchList = useCallback(() => {
        setIsLoading(true);
        apiService.getTopStories({pageSize: 10})
            .then((response) => {
                setTopStories(response);
            }).finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        fetchList();
    }, [])

    return {
        isLoading,
        topStories,
    }
}