'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import { Listing, Reservation } from "@prisma/client";

interface ReservationClientProps {
    reservations: (Reservation & {
        listing: Listing
    })[];
    currentUser?: SafeUser | null;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [delettingId, setDeletingId] = useState(''); 

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh();
            })
            .catch(() => {
                toast.error('Something went wrong');    
            })
            .finally(() => {
                setDeletingId('');  
            });

    }, [router])

    return (  
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
            />
            <div
                className="
                    mt-10
                    grid
                    gap-8
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                "
            >
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={delettingId === reservation.id}
                        actionLabel="Cancel guest resrvation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default ReservationClient;