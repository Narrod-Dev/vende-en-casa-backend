export class CreateRatingDto {
    reviewer_id: number;
    reviewee_id: number;
    product_id: number;
    score: number;
    comment?: string;
}
