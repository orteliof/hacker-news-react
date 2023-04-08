import {useCallback, useEffect, useState} from "react";
import {HackerNewsServices} from "../services";

export const useItemDetails = (itemId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [storyDetail, setStoryDetail] = useState({});

    const apiService = HackerNewsServices.getInstance();
    const fetchItemDetail = useCallback(() => {
        setIsLoading(true);
        apiService.getStoryWithComments({itemId})
            .then((response) => {
                setStoryDetail(response);
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (itemId) {
            fetchItemDetail();
        }
    }, [itemId]);

    return {
        isLoading,
        storyDetail,
    }
}