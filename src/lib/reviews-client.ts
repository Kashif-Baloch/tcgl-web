const STATS_ENDPOINT =
    'https://api.reviews.co.uk/timeline/data?type=store_review&store=www.theclaimsguyslegal.com&sort=date_desc&page=1&per_page=0&enable_avatars=true&include_subrating_breakdown=1';
const REVIEWS_ENDPOINT =
    'https://api.reviews.co.uk/timeline/data?type=store_review&store=www.theclaimsguyslegal.com&sort=date_desc&page=1&per_page=10&enable_avatars=true&include_subrating_breakdown=1&branch=&tag=&v=202262315&minRating=5&include_product_reviews=1';

export interface ReviewModel {
    rating: number;
    author: string;
    comments: string;
    location: string;
    verified: boolean;
}

export interface ReviewStatsModel {
    rating: number;
    count: number;
}

export interface ReviewIOModel {
    stats: ReviewStatsModel;
    reviews: ReviewModel[];
}

async function stats(): Promise<ReviewIOModel | undefined> {
    try {
        const response = await fetch(STATS_ENDPOINT, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        // bad response
        if (!response.ok) {
            return Promise.resolve(undefined);
        }
        // no data
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return Promise.resolve(undefined);
        }
        // get json
        const responseJson = await response.json();
        return {
            stats: {
                rating: Number.parseFloat(responseJson.stats.average_rating),
                count: responseJson.stats.review_count,
            },
            reviews: [],
        };
    } catch (e) {
        console.log(e);
        return Promise.resolve(undefined);
    }
}

async function reviews(): Promise<ReviewIOModel | undefined> {
    try {
        const response = await fetch(REVIEWS_ENDPOINT, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        // bad response
        if (!response.ok) {
            return Promise.resolve(undefined);
        }
        // no data
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return Promise.resolve(undefined);
        }
        // get json
        const responseJson = await response.json();
        return {
            stats: {
                rating: Number.parseFloat(responseJson.stats?.average_rating || '0'),
                count: responseJson.stats?.review_count || 0,
            },
            reviews: responseJson.timeline
                .map((value: any) => ({
                    rating: value._source.rating === undefined ? -1 : value._source.rating,
                    author: value._source.author || '',
                    comments: value._source.comments || '',
                    location: value._source.address || '',
                    verified: value._source.reviewer_desc?.includes('Verified'),
                }))
                .filter((value: any) => value.rating > 0),
        };
    } catch (e) {
        console.log(e);
        return Promise.resolve(undefined);
    }
}

export const ReviewClient = { stats, reviews };
