import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing,
    'createAt'
> & {
    createdAt: string;
};

export type SafeReservation = Omit<
    Reservation,
    'createAt' | 'startDate' | 'endDate' | 'listing'
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
}


export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};