import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing,
    'createAt'
> & {
    createdAt: string;
};

export type SafeReservation = Omit<
    Reservation,
    'listing'
> & {
    // createdAt: string;
    // startDate: string;
    // endDate: string;
    listing: Listing;
}


export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};