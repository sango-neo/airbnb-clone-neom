import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationClient from "./ReservationClient";


const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="You aren't logged in"
                    subtitle="Log in to see your reservations"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    }); //we want to load all the reservations made for the current user's listings 

    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="You don't have any reservations"
                    subtitle="When someone makes a reservation for your listed properties, it will appear here"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ReservationsPage;