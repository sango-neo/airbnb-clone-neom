import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";

interface IParams {
    reservationId: string;
}

export async function DELETE(
    request: Request,
    { params } : { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if(!reservationId || typeof reservationId !== "string") {
         throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {userId: currentUser.id},
                {listing: {userId: currentUser.id}}
            ]
        }
    }); 
    //only want the user who made the reservation or the user who owns the listing to be able to delete the reservation

    return NextResponse.json(reservation);
}