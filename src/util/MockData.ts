import { faker } from '@faker-js/faker';

export type House = {
    id: number;
    rooms: number;
    address: string;
    price: number;
    description: string;
    image: string;
    status: 'sold' | 'rent' | 'new' | 'hot' | 'sale' | 'featured' | 'open house' | 'foreclosure';
};


export type TravelDestination = {
    id: number;
    title: string;
    location: string;
    description: string;
    image: string;
    stars: number;
    reviews: number;
    price: number;
    oldPrice?: number;
    startTime?: Date;
    endTime?: Date;
    discount?: number;
};

export function generateHouseData(amount: number) {
    const data: House[] = [];
    for (let i = 0; i < amount; i++) {
        const house: House = {
            id: i,
            rooms: faker.number.int({ min: 1, max: 10 }),
            address: faker.location.streetAddress(),
            price: faker.number.int({ min: 100, max: 1000000 }),
            description: faker.lorem.paragraph(),
            image: faker.image.urlPicsumPhotos({
                width: 640,
                height: 480,
                         
            }),
            status: faker.helpers.shuffle<House['status']>([
                'sold',
                'rent',
                'new',
                'hot',
                'sale',
                'featured',
                'open house',
                'foreclosure',
            ])[0],
        };
        data.push(house);
    }
    return data;
}


function createMockTravelDestination(id: number) {
    const sample: TravelDestination = {
        id: id,
        title: faker.lorem.words(3),
        location: faker.location.city(),
        description: faker.lorem.paragraph(),
        image: faker.image.urlPicsumPhotos({
            width: 640,
        }),
        price: faker.number.float({
            min: 0,
            max: 300
        }),
        stars: faker.number.float({
            min: 0,
            max: 5
        }),
        reviews: faker.number.float({
            min: 0,
            max: 1000
        }),
        oldPrice: faker.number.float({
            min: 0,
            max: 300
        }),
        startTime: faker.date.future(),
        endTime: faker.date.future(),
        discount: faker.number.float({
            min: 0,
            max: 100
        }),
 
    }
    return sample;

}

export function createMockTravelDestinations(amount: number) {
    return Array.from({ length: amount }, (_, i) => createMockTravelDestination(i));
}