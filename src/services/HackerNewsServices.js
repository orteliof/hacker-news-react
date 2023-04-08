import axios from 'axios';

export class HackerNewsServices {

    constructor() {
        const baseURL = 'https://hacker-news.firebaseio.com/v0';
        this._axiosInstance = axios.create({baseURL});
    }

    /**
     * @returns {HackerNewsServices}
     */
    static getInstance() {
        if (!HackerNewsServices._instance)
            HackerNewsServices._instance = new HackerNewsServices();
        return HackerNewsServices._instance;
    }

    async getTopStories({pageSize = 10}) {
        const {data: topStoriesIds} = await this._axiosInstance.get('/topstories.json?print=pretty');
        debugger;
        const topStories = [];
        for (const id of topStoriesIds) {
            if (pageSize-- <= 0)
                break;
            const story = await this.getItemDetail(id);
            topStories.push(story);
        }

        return topStories;
    }

    async getItemDetail(itemId) {
        const {data: item} = await this._axiosInstance.get(`/item/${itemId}.json?print=pretty`);
        return item;
    }

    async getStoryWithComments({itemId, pageSize = 10}) {
        const story = await this.getItemDetail(itemId);
        if (!story.kids)
            return story;

        const comments = [];
        for (const kidId of story.kids) {
            if (pageSize-- <= 0)
                break;
            const comment = await this.getItemDetail(kidId);
            comments.push(comment);
        }

        return {
            ...story,
            comments,
        }
    }

}