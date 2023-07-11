import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
    const favListings = await getFavoriteListings();
    const currentUser = await getCurrentUser();


    if(favListings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="You have no favorite listings"
                    subtitle="Favorited listings will appear here"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient
                listings={favListings} 
                currentUser={currentUser}   
            /> 
        </ClientOnly>
    )
}

export default FavoritesPage;