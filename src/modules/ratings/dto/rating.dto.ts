export class RatingDto{
    id: number;
    reviewer_id: number;
    reviewee_id: number;
    product_id: number;
    score: number;
    comment: string;
    created_at: Date;
}
