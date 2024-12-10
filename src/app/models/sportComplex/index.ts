export interface SportComplex {
    id: number;
    accountId: number;
    provincesId: string;
    districtId: string;
    wardsId: string;
    url_sport_complex: string[];
    name: string;
    name_slug: string;
    description: string;
    latitude: string;
    longitude: string;
    geom: any | null;
    location: string;
    evaluation_sport: string;
    phone: string[];
    opening_time: string;
    closing_time: string;
    avatar_image: string;
    banner_images: string[];
    status_sport_complex: string;
    created_at: string;
    updated_at: string;
}

export interface SportComplexResponse {
    totalRecords: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
    data: SportComplex[];
}