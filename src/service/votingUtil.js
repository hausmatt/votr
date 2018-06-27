export default class VotingUtil {
    static averageRating(ratingsArray) {
        if (!ratingsArray || ratingsArray.length === 0) {
            return undefined;
        }
        let sum = 0;
        ratingsArray.forEach(rating => {
            sum += rating;
        });
        let avg = sum / ratingsArray.length;
        let result = Math.round(avg * 10) / 10;
        console.log(result);
        return result;
    }
}
